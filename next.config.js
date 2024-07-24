/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enables "npm build" to export a static site into the /out dir
  trailingSlash: true,
  images: {
    unoptimized: true,
  }, // Disable image optimization since the Image Optimization API is not available for exported apps

  // Rewrites are handled in Amplify in production. For the API to work locally, rewrites must be 
  // uncommented below, and the relevant variables need to exist in .env.local in the root directory.
  // async rewrites() {
  //   return [
  //     {
  //       source: "/next-proxy/:path*",
  //       destination: `${process.env.API_URL}/:path*`
  //     },
  //     {
  //       source: "/s3",
  //       destination: `${process.env.S3_PRESIGNED_URL}/:path*`
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
