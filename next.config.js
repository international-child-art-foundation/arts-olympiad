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

  // TODO
  // This function makes next.js view our APIGateway instance as a member of its same origin.
  // Security is much simpler when we can use SameSite=Lax cookies, which this rewrite rule enables.
  // The original plan was to proxy the APIGateway URL to myfavoritesport.org/api.
  // Unsure if this method is secure or will be altered in prod, but good enough for
  // local development for now.
  async rewrites() {
    return [
      {
        source: "/next-proxy/:path*",
        destination: `${process.env.API_URL}/:path*`
      },
      {
        // Rewrite for S3 bucket to not fail CORS
        source: "/s3",
        destination: `${process.env.S3_PRESIGNED_URL}/:path*`
      },
      // {
      //   source: "/volunteer/:path*",
      //   destination: `${process.env.S3_PRESIGNED_URL}/volunteer/:path*`
      // },
      // {
      //   source: "/gallery/:path*",
      //   destination: `${process.env.S3_PRESIGNED_URL}/gallery/:path*`
      // }
    ];
  },
};

module.exports = nextConfig;
