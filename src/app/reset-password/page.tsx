import { Metadata } from "next";
import { canonicalPath } from "../shared-metadata";
import {ResetPassword} from "../../../components/auth/ResetPassword";

export const metadata: Metadata = {
  ...canonicalPath("/reset-password/"),
  title: "Reset Your #MyFavoriteSport Password",
  description: "Reset your #MyFavoriteSport account password to regain access to your contest profile, artwork submissions, and voting tools.",
};


export default function page() {
  return (
    <ResetPassword />
  );
}
