/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enables "npm build" to export a static site into the /out dir
  trailingSlash: true,
  images: {
    unoptimized: true,
  }, // Disable image optimization since the Image Optimization API is not available for exported apps
};

module.exports = nextConfig;
