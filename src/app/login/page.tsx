import { Metadata } from "next";
import { canonicalPath } from "../shared-metadata";
import { Login } from "../../../components/auth/Login";

export const metadata: Metadata = {
  ...canonicalPath("/login/"),
  title: "Login | #MyFavoriteSport",
  description: "Log in to your #MyFavoriteSport account to submit artwork, manage your contest entry, and participate in voting.",
};


export default function page() {
  return (
    <Login />
  );
}