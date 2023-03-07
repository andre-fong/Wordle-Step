/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/short",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
