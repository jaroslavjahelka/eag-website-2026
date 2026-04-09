import type { Route } from "./+types/api.contact";
import { Resend } from "resend";

function loadApiKey(): string {
  return process.env.RESEND_API_KEY ?? "";
}

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    _resend = new Resend(loadApiKey());
  }
  return _resend;
}

const CONTACT_TO = "info@eag.group";

/* ── Rate limiter (in-memory, per-IP) ─────────────── */

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// Clean up stale entries every 10 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 10 * 60 * 1000).unref?.();

/* ── Validation ───────────────────────────────────── */

interface ContactFields {
  name: string;
  email: string;
  message: string;
  website?: string; // honeypot — must be empty
}

function validateFields(fields: ContactFields) {
  const errors: Partial<Record<keyof ContactFields, string>> = {};

  if (!fields.name || fields.name.trim().length < 2) {
    errors.name = "name_required";
  }

  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "email_invalid";
  }

  if (!fields.message || fields.message.trim().length < 10) {
    errors.message = "message_too_short";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export async function action({ request }: Route.ActionArgs) {
  /* ── Rate limit check ── */
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  /* ── Parse fields ── */
  let fields: ContactFields;

  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    fields = await request.json();
  } else {
    const formData = await request.formData();
    fields = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };
  }

  /* ── Honeypot check — bots fill hidden fields ── */
  if (fields.website) {
    // Silently accept so bots don't know they were caught
    return Response.json({ ok: true });
  }

  const errors = validateFields(fields);
  if (errors) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  try {
    const { error } = await getResend().emails.send({
      from: "Kontaktní formulář <onboarding@resend.dev>",
      to: CONTACT_TO,
      replyTo: fields.email,
      subject: `Nová zpráva od ${fields.name}`,
      html: `
        <h2>Nová zpráva z kontaktního formuláře</h2>
        <p><strong>Jméno:</strong> ${escapeHtml(fields.name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(fields.email)}</p>
        <hr />
        <p>${escapeHtml(fields.message).replace(/\n/g, "<br />")}</p>
        <hr />
        <p style="color: #888; font-size: 12px;">
          Odesláno ${new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" })}
        </p>
      `,
    });

    if (error) {
      console.error("[Contact form] Resend error:", error);
      return Response.json(
        { ok: false, error: "email_failed" },
        { status: 500 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[Contact form] Unexpected error:", err);
    return Response.json(
      { ok: false, error: "email_failed" },
      { status: 500 },
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
