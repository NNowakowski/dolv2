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

// Static page generation
export const dynamicParams = true;
export async function generateStaticParams(): Promise<
  {
    language: string;
    page: string;
  }[]
> {
  const tldrCount = await GetTldrCount({
    language: "en",
  });

  const pageCount = Math.ceil(tldrCount / TLDR_CHUNK_SIZE);

  const pathsList = [];

  for (let i = 1; i < pageCount; i++) {
    pathsList.push({
      language: "en",
      page: (i + 1).toString(),
    });
    break;
  }

  return pathsList;
}
// End of static generation

// Page generation
export default async function TldrPagePage({
  params,
}: {
  params: { language: string; page: string };
}): Promise<JSX.Element> {
  const language = params.language;
  const page = parseInt(params.page);

  const tldrListData = GetTldrList({
    language: language,
    page: page,
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
      activePage={page}
      baseUrl={`/${language}/tldr`}
      language={language}
    />
  );
}
// End of page generation
