import type { MerchType } from "@/types";

export async function GetMerch(): Promise<MerchType> {
  const res = await fetch(`${process.env.BACKEND_URL ?? ""}/merch/random/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${process.env.BACKEND_TOKEN ?? ""}`,
    },
    next: { revalidate: 3600 },
  } as RequestInit);

  if (!res.ok) {
    throw new Error("Failed to fetch merch");
  }

  return await res.json();
}
