import Link from "@/components/Link";
import { i18nLanguages } from "@/data";

export default function BrowseInOtherLanguages({
  active_language,
  suffix_url,
}: {
  active_language: string;
  suffix_url: string;
}) {
  return (
    <div>
      {i18nLanguages
        .filter((lang) => lang.short_code !== active_language)
        .map((lang) => (
          <Link href={`/${lang.short_code}${suffix_url}`} key={lang.short_code}>
            <span
              className={`fi fi-${lang.flag_code} m-2 rounded text-3xl shadow-lg`}
            ></span>
          </Link>
        ))}
    </div>
  );
}
