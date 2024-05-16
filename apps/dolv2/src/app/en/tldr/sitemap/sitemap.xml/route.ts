import { SiteMetadata, GetTldrCount } from "@/data";
import { TLDR_CHUNK_SIZE } from "@/app/[language]/tldr/default";

export const revalidate = 604800;

export async function GET() {
  const tldrCount = await GetTldrCount({
    language: "en",
  });

  const tldrPages = Math.ceil(tldrCount / TLDR_CHUNK_SIZE);

  const startXml = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const endXml = `</sitemapindex>`;

  const midXml = Array.from({ length: tldrPages }, (_, i) => i)
    .map((id) => {
      return `<sitemap><loc>${SiteMetadata.site_url}/en/tldr/sitemap/${id}.xml</loc></sitemap>`;
    })
    .join("");

  const xml = `${startXml}${midXml}${endXml}`;

  const response = new Response(xml, {
    status: 200,
    statusText: "ok",
  });

  response.headers.append("content-type", "text/xml");

  return response;
}
