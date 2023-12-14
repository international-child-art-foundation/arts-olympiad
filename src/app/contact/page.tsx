import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import {Contact} from "../../../components/contact/Contact";

export const metadata: Metadata = {
  title: "Contact Us | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Contact Us | My Favorite Sport",
  }
};

export default function page() {
  return (
    <Contact />
  );
}