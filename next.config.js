/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Enables "npm build" to export a static site into the /out dir
  trailingSlash: true,
  images: {
    unoptimized: true,
  }, // Disable image optimization since the Image Optimization API is not available for exported apps
  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value: "default-src 'self'; script-src 'self' 'https://apis.example.com'; object-src 'none'"
  //         },
  //         {
  //           key: "Referrer-Policy",
  //           value: "origin-when-cross-origin"
  //         }
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
