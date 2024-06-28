export function buildLgImageUrl(id: string, ext: string) {
  return process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_URL + "/" + id + "/initial" + "." + ext;
}
export function buildMdImageUrl(id: string) {
  return process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_URL + "/" + id + "/medium" + ".webp";
}
export function buildSmImageUrl(id: string) {
  return process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_URL + "/" + id + "/initial" + ".webp";
}