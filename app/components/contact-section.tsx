import { useState } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import {
  TextField,
  Input,
  Label,
  TextArea,
  Button as AriaButton,
} from "react-aria-components";
import { useI18n } from "~/i18n";
import { OptimizedImage } from "~/components/optimized-image";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useI18n();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:info@eag.group?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="contact"
      data-theme="dark"
      className="relative overflow-hidden bg-[var(--section-bg)]"
    >
      {/* Background image */}
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <TextField
                value={name}
                onChange={setName}
                className="flex flex-col"
              >
                <Label className="sr-only">{t("home.contact.name")}</Label>
                <Input
                  placeholder={t("home.contact.name")}
                  className="border-b border-eag-gray-600 bg-transparent py-3 text-a3 text-eag-white outline-none transition-colors placeholder:text-eag-gray-500 focus:border-eag-teal"
                />
              </TextField>

              <TextField
                value={email}
                onChange={setEmail}
                type="email"
                className="flex flex-col"
              >
                <Label className="sr-only">{t("home.contact.email")}</Label>
                <Input
                  placeholder={t("home.contact.email")}
                  className="border-b border-eag-gray-600 bg-transparent py-3 text-a3 text-eag-white outline-none transition-colors placeholder:text-eag-gray-500 focus:border-eag-teal"
                />
              </TextField>

              <TextField
                value={message}
                onChange={setMessage}
                className="flex flex-col"
              >
                <Label className="sr-only">{t("home.contact.message")}</Label>
                <TextArea
                  placeholder={t("home.contact.message")}
                  rows={3}
                  className="resize-none border-b border-eag-gray-600 bg-transparent py-3 text-a3 text-eag-white outline-none transition-colors placeholder:text-eag-gray-500 focus:border-eag-teal"
                />
              </TextField>

              <div className="mt-2">
                <AriaButton
                  type="submit"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-eag-teal px-10 py-3.5 text-a3 font-medium text-eag-white shadow-[0_8px_32px_rgba(0,0,0,0.2)] outline-none transition-all hover:bg-eag-teal-dark hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] focus-visible:ring-2 focus-visible:ring-eag-teal focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] pressed:bg-eag-teal-dark/80"
                >
                  <PaperPlaneTilt size={18} weight="bold" />
                  {t("home.contact.send")}
                </AriaButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
