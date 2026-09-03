import type { NextConfig } from "next";

const onPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: onPages ? "/Retro" : "",
  assetPrefix: onPages ? "/Retro/" : "",
};

export default nextConfig;
