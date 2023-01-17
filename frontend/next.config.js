/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // TODO: NOT GOOD, but waiting for this to be solved https://github.com/rainbow-me/rainbowkit/issues/836
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  transpilePackages: ["unbreakable-vows-ui"],
  async rewrites() {
    return {
      afterFiles: [{ source: "/:path*", destination: "/" }],
    };
  },
};

module.exports = nextConfig;
