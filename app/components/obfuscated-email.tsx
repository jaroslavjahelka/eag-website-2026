import { useState, useEffect } from "react";

/**
 * Renders an email link that is assembled client-side only.
 * Bots scraping raw HTML won't see a valid mailto: or email string.
 *
 * SSR output: a noop <a> with no href and no visible email text.
 * Client hydration: assembles the real email from parts.
 */

interface ObfuscatedEmailProps {
  /** e.g. "info" */
  user: string;
  /** e.g. "eag.group" */
  domain: string;
  /** Optional className for the <a> tag */
  className?: string;
  /** Optional custom label — if omitted the email address is shown */
  label?: string;
  /** Optional children to render inside the link */
  children?: React.ReactNode;
}

export function ObfuscatedEmail({ user, domain, className, label, children }: ObfuscatedEmailProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Assemble only on the client — bots reading SSR HTML see nothing
    setEmail(`${user}@${domain}`);
  }, [user, domain]);

  const displayContent = children ?? label ?? email ?? `${user}@${domain}`;

  if (!email) {
    // SSR / pre-hydration: render placeholder that looks the same visually
    return (
      <span className={className} aria-label="Email">
        {children ?? label ?? <>{user}&#8203;@&#8203;{domain}</>}
      </span>
    );
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {displayContent}
    </a>
  );
}
