import { Envelope, MapPin } from "@phosphor-icons/react";
import { useI18n } from "~/i18n";
import { EagLogo } from "~/components/eag-logo";

export function AppFooter() {
  const { t } = useI18n();

  return (
    <footer className="bg-eag-black">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-eag-teal/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Logo & contact */}
          <div className="flex flex-col gap-5">
            <EagLogo className="h-6 w-auto self-start text-eag-white" />

            <div className="flex flex-col gap-3 text-a4 text-eag-gray-400">
              <a
                href="mailto:info@eag.group"
                className="inline-flex items-center gap-2 text-eag-gray-400 no-underline transition-colors hover:text-eag-teal"
              >
                <Envelope size={16} weight="regular" />
                info@eag.group
              </a>
              <p className="inline-flex items-start gap-2">
                <MapPin
                  size={16}
                  weight="regular"
                  className="mt-0.5 shrink-0"
                />
                {t("footer.address")}
              </p>
            </div>
          </div>

          {/* Legal */}
          <div className="max-w-md text-a5 leading-relaxed text-eag-gray-600">
            {t("footer.legal")}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-eag-gray-800/60 pt-6 text-a5 text-eag-gray-600">
          &copy; {new Date().getFullYear()} {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
