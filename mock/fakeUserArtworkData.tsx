import { userArtworkSchema } from "./userArtworkSchema";

export const fakeUserArtworkData: userArtworkSchema = {
  id: "UUID-or-int-unsure",
  title: "Test title",
  sport: ["Shot put", "High jump"],
  location: "United Kingdom",
  is_ai_gen: true,
  model: "Midjourney V2",
  prompt: "A ski resort",
  is_approved: true,
  votes: 3,
  url: "https://icaf.org/resource/image/whatwedo/ArtsOlympiad.webp",
};