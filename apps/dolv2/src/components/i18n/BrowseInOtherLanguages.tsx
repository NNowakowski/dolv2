import Link from "@/components/Link";
import { i18nLanguages } from "@/data";
import { GetDictionary } from "@/utils";

export default async function BrowseInOtherLanguages({
  active_language,
  suffix_url,
}: {
  active_language: string;
  suffix_url: string;
}) {
  const dictionary = await GetDictionary(active_language);

  return (
    <div className="py-5">
      <h2 className="text-2xl font-bold mb-2">
        {dictionary.browse_in_other_languages}
      </h2>

      <div>
        {i18nLanguages
          .filter((lang) => lang.short_code !== active_language)
          .map((lang) => (
            <Link
              href={`/${lang.short_code}${suffix_url}`}
              key={lang.short_code}
            >
              <span
                className={`fi fi-${lang.flag_code} m-2 rounded text-3xl shadow-lg`}
              ></span>
            </Link>
          ))}
      </div>
    </div>
  );
}
