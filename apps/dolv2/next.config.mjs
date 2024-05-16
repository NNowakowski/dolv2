/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },

  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/tldr",
        destination: "/en/tldr",
        permanent: true,
      },
      {
        source: "/:language/tldr/page/1",
        destination: "/:language/tldr",
        permanent: true,
      },
      {
        source: "/github-emoji",
        destination: "/en/github-emoji",
        permanent: true,
      },
      {
        source: "/quotes",
        destination: "/en/quotes",
        permanent: true,
      },
      {
        source: "/:language/quote",
        destination: "/:language/quotes",
        permanent: true,
      },
      {
        source: "/:language/quote/:id",
        destination: "/:language/quotes/:id",
        permanent: true,
      },
      {
        source: "/:language/quotes/page/1",
        destination: "/:language/quotes",
        permanent: true,
      },
      {
        source: "/:language/quote/page/:page",
        destination: "/:language/quotes/page/:page",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
