import type { QuoteType } from "@/types";

export async function GetQuotesCount({
  language,
}: {
  language: string;
}): Promise<number> {
  const res = await fetch(
    `${process.env.BACKEND_URL ?? ""}/quotes/${language}/count/`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${process.env.BACKEND_TOKEN ?? ""}`,
      },
      next: { revalidate: 604800 },
    } as RequestInit,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch quotes count");
  }

  const data = await res.json();
  return data.count;
}

export async function GetQuotesList({
  language,
  page,
}: {
  language: string;
  page: number;
}): Promise<QuoteType[]> {
  const res = await fetch(
    `${process.env.BACKEND_URL ?? ""}/quotes/${language}/list/${page}/`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${process.env.BACKEND_TOKEN ?? ""}`,
      },
      next: { revalidate: 604800 },
    } as RequestInit,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch quotes list");
  }

  return (await res.json()) as QuoteType[];
}

export async function GetQuoteData({
  language,
  id,
}: {
  language: string;
  id: string;
}): Promise<QuoteType> {
  const res = await fetch(
    `${process.env.BACKEND_URL ?? ""}/quotes/${language}/data/${id}/`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${process.env.BACKEND_TOKEN ?? ""}`,
      },
      next: { revalidate: 2592000 },
    } as RequestInit,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch quote data");
  }

  return (await res.json()) as QuoteType;
}
