/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  async headers() {
    return process.env.DESIGN_VARIANT === "alternative" || process.env.REVIEW_MODE === "true"
      ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] }]
      : [];
  },
  images: {
    qualities: [60, 70, 75],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
