interface QuoteType {
  quote_data: {
    id: number;
    quote: string;
    author?: string;
    tags: {
      id: number;
      tag: string;
    }[];
    error: boolean;
  };
  language: {
    language: string;
    code: string;
    short_code: string;
  };
  quote: string;
}

export type { QuoteType };
