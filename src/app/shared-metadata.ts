export const siteUrl = "https://www.myfavoritesport.org";

export function canonicalPath(path: string) {
  return {
    alternates: {
      canonical: path,
    },
  };
}

export const sharedOpenGraph = {
  description: "Schoolchildren everywhere can participate in a global art contest on the theme, My Favorite Sport, and rally the votes to win the gold!",
  images: [`${siteUrl}/banner-image.png`]
};