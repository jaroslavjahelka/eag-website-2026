import { useState, useCallback } from "react";
import { Check, X } from "@phosphor-icons/react";
import {
  TextField,
  Input,
  Label,
  TextArea,
  Button as AriaButton,
} from "react-aria-components";
import { useI18n } from "~/i18n";
import { OptimizedImage } from "~/components/optimized-image";

type FormStatus = "idle" | "submitting" | "success" | "error" | "server-error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateFields(fields: {
  name: string;
  email: string;
  message: string;
}): FieldErrors | null {
  const errors: FieldErrors = {};
  if (!fields.name || fields.name.trim().length < 2) errors.name = "name";
  if (!fields.email) errors.email = "email-empty";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "email-format";
  if (!fields.message || fields.message.trim().length < 10)
    errors.message = "message";
  return Object.keys(errors).length > 0 ? errors : null;
}

export function ContactSection() {
  const { t } = useI18n();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isSubmitting = status === "submitting";

  const handleSubmit = useCallback(async () => {
    const fields = { name, email, message };
    const errors = validateFields(fields);
    if (errors) {
      setFieldErrors(errors);
      setStatus("error");
      return;
    }

    setFieldErrors(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setFieldErrors(null);
      } else {
        const result = await res.json().catch(() => null);
        if (result?.errors) {
          setFieldErrors(result.errors);
          setStatus("error");
        } else {
          setStatus("server-error");
        }
      }
    } catch {
      setStatus("server-error");
    }
  }, [name, email, message]);

  const handleReset = useCallback(() => {
    setStatus("idle");
    setFieldErrors(null);
  }, []);

  const clearFieldError = useCallback(
    (field: keyof FieldErrors) =>
      setFieldErrors((prev) =>
        prev ? { ...prev, [field]: undefined } : prev,
      ),
    [],
  );

  return (
    <section
      id="contact"
      data-theme="dark"
      className="relative overflow-hidden bg-[var(--section-bg)]"
    >
      <OptimizedImage
        src="/assets/office-dark.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/50" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — heading */}
          <div>
            <h2 className="max-w-xl text-b1 leading-tight lg:text-c6">
              <span className="text-[var(--section-text-muted)]">
                {t("home.contact.title1")}
              </span>{" "}
              <span className="font-bold text-[var(--section-text)]">
                {t("home.contact.title2")}
              </span>
            </h2>
          </div>

          {/* Right — form card */}
          <div className="rounded-2xl border border-white/5 bg-[#121212]/90 px-6 py-10 shadow-[-32px_32px_64px_rgba(0,0,0,0.4)] backdrop-blur-md lg:px-12 lg:py-12">
            {status === "success" ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center gap-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-eag-teal text-eag-teal">
                  <Check size={28} weight="bold" />
                </span>
                <div className="flex flex-col gap-2">
                  <p className="text-b3 text-eag-white">
                    {t("home.contact.success.title")}
                  </p>
                  <p className="text-a3 text-eag-gray-400">
                    {t("home.contact.success.body")}
                  </p>
                </div>
                <AriaButton
                  onPress={handleReset}
                  aria-label="Close"
                  className="mt-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-eag-teal text-eag-white outline-none transition-colors hover:bg-eag-teal-dark focus-visible:ring-2 focus-visible:ring-eag-teal focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
                >
                  <X size={18} weight="bold" />
                </AriaButton>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {/* Name */}
                <div className="group/name relative" data-filled={name ? "" : undefined}>
                  <TextField
                    name="name"
                    isRequired
                    value={name}
                    onChange={(v) => { setName(v); clearFieldError("name"); }}
                    isInvalid={!!fieldErrors?.name}
                    className="relative"
                  >
                    <Label className="pointer-events-none absolute left-0 top-3 origin-left text-a3 text-eag-gray-500 transition-all duration-200 group-focus-within/name:top-0 group-focus-within/name:-translate-y-full group-focus-within/name:text-[11px] group-focus-within/name:text-eag-teal group-data-[filled]/name:top-0 group-data-[filled]/name:-translate-y-full group-data-[filled]/name:text-[11px] group-data-[filled]/name:text-eag-gray-400">
                      {t("home.contact.name")}
                    </Label>
                    <Input className="w-full border-b border-eag-gray-600 bg-transparent py-3 text-a3 text-eag-white outline-none transition-colors focus:border-eag-teal data-[invalid]:border-red-400" />
                  </TextField>
                  {fieldErrors?.name && (
                    <p className="mt-1.5 text-a5 text-red-400">{t("home.contact.error.name")}</p>
                  )}
                </div>

                {/* Email */}
                <div className="group/email relative" data-filled={email ? "" : undefined}>
                  <TextField
                    name="email"
                    type="email"
                    isRequired
                    value={email}
                    onChange={(v) => { setEmail(v); clearFieldError("email"); }}
                    isInvalid={!!fieldErrors?.email}
                    className="relative"
                  >
                    <Label className="pointer-events-none absolute left-0 top-3 origin-left text-a3 text-eag-gray-500 transition-all duration-200 group-focus-within/email:top-0 group-focus-within/email:-translate-y-full group-focus-within/email:text-[11px] group-focus-within/email:text-eag-teal group-data-[filled]/email:top-0 group-data-[filled]/email:-translate-y-full group-data-[filled]/email:text-[11px] group-data-[filled]/email:text-eag-gray-400">
                      {t("home.contact.email")}
                    </Label>
                    <Input className="w-full border-b border-eag-gray-600 bg-transparent py-3 text-a3 text-eag-white outline-none transition-colors focus:border-eag-teal data-[invalid]:border-red-400" />
                  </TextField>
                  {fieldErrors?.email && (
                    <p className="mt-1.5 text-a5 text-red-400">
                      {t(fieldErrors.email === "email-empty" ? "home.contact.error.email.empty" : "home.contact.error.email.format")}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="group/msg relative" data-filled={message ? "" : undefined}>
                  <TextField
                    name="message"
                    isRequired
                    value={message}
                    onChange={(v) => { setMessage(v); clearFieldError("message"); }}
                    isInvalid={!!fieldErrors?.message}
                    className="relative"
                  >
                    <Label className="pointer-events-none absolute left-0 top-3 origin-left text-a3 text-eag-gray-500 transition-all duration-200 group-focus-within/msg:top-0 group-focus-within/msg:-translate-y-full group-focus-within/msg:text-[11px] group-focus-within/msg:text-eag-teal group-data-[filled]/msg:top-0 group-data-[filled]/msg:-translate-y-full group-data-[filled]/msg:text-[11px] group-data-[filled]/msg:text-eag-gray-400">
                      {t("home.contact.message")}
                    </Label>
                    <TextArea
                      rows={1}
                      className="w-full resize-none border-b border-eag-gray-600 bg-transparent py-3 text-a3 text-eag-white outline-none transition-colors focus:border-eag-teal data-[invalid]:border-red-400"
                    />
                  </TextField>
                  {fieldErrors?.message && (
                    <p className="mt-1.5 text-a5 text-red-400">{t("home.contact.error.message")}</p>
                  )}
                </div>

                {/* Server error */}
                {status === "server-error" && (
                  <p role="alert" className="text-a5 text-red-400">
                    {t("home.contact.error.server")}
                  </p>
                )}

                {/* Submit */}
                <div>
                  <AriaButton
                    onPress={handleSubmit}
                    isDisabled={isSubmitting}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-eag-teal px-10 py-3.5 text-a3 font-medium text-eag-white shadow-[0_8px_32px_rgba(0,0,0,0.2)] outline-none transition-all hover:bg-eag-teal-dark hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] focus-visible:ring-2 focus-visible:ring-eag-teal focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] pressed:bg-eag-teal-dark/80 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        {t("home.contact.sending")}
                      </>
                    ) : (
                      t("home.contact.send")
                    )}
                  </AriaButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
