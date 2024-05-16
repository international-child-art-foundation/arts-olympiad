"use client";

import { Amplify } from "aws-amplify";
import config from "../amplifyconfiguration.json";

Amplify.configure(config, { ssr: true });
console.log(Amplify.getConfig());

export default function ConfigureAmplifyClientSide() {
  return null;
}