/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Product images may be a local file in /public or a full URL pasted into the Sheet.
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  async redirects() {
    return [
      // The packaging guide dropped its MOQ framing and changed slug; keep the
      // old URL alive so anything already indexed or linked doesn't 404.
      {
        source: '/guides/bulk-packaging-and-moq',
        destination: '/guides/bulk-packaging-options',
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
