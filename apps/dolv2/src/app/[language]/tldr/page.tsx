import type { Metadata } from "next";
import SEO from "@/components/SEO";
import TldrHome from "@/components/tldr/TldrHome";
import { GetTldrList, GetTldrCount } from "@/data";
import { GetDictionary } from "@/utils";
import { TLDR_CHUNK_SIZE } from "@/app/[language]/tldr/default";

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: { language: string };
}): Promise<Metadata> {
  const language = params.language;

  const dictionary = await GetDictionary(language);

  return SEO({
    title: dictionary.tldr.title,
    description: dictionary.tldr.description,
    keywords: ["tldr", "summary", "explanation"],
    language: language,
  });
}
// End of metadata generation

// Static languages generation
export const dynamicParams = true;
export function generateStaticParams(): { language: string }[] {
  return [
    {
      language: "en",
    },
  ];
}
// End of static generation

// Page generation
export default async function TldrHomePage({
  params,
}: {
  params: { language: string };
}): Promise<JSX.Element> {
  const language = params.language;

  const tldrListData = GetTldrList({
    language: language,
    page: 1,
  });

  const tldrCountData = GetTldrCount({
    language: language,
  });

  const [tldrList, tldrCount] = await Promise.all([
    tldrListData,
    tldrCountData,
  ]);

  return (
    <TldrHome
      tldrList={tldrList}
      totalPage={Math.ceil(tldrCount / TLDR_CHUNK_SIZE)}
      activePage={1}
      baseUrl={`/${language}/tldr`}
      language={language}
    />
  );
}
// End of page generation
