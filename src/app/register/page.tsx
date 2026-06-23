import { Metadata } from "next";
import { canonicalPath } from "../shared-metadata";
import {Register} from "../../../components/auth/Register";

export const metadata: Metadata = {
  ...canonicalPath("/register/"),
  title: "Register for #MyFavoriteSport",
  description: "Create your free #MyFavoriteSport account to enter the global art contest, submit your favorite sport artwork, and rally votes.",
};


export default function page() {
  return (
    <Register />
  );
}