/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/bizrv",
        destination: "https://askarraybizrv.vercel.app/",
      },
      {
        source: "/bizrv/:path*",
        destination: "https://askarraybizrv.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;