"use server";

import { NextRequest, NextResponse } from "next/server";
import { CognitoIdentityProviderClient, GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import awsExports from "../../../../aws-exports";

export async function GET(request: NextRequest) {
  const cookies = request.cookies;

  const idToken = cookies.get("idToken")?.value;
  const accessToken = cookies.get("accessToken")?.value;
  const refreshToken = cookies.get("refreshToken")?.value;

  if (!idToken || !accessToken || !refreshToken) {
    return NextResponse.json({ isAuthenticated: false, message: "No valid tokens found" });
  }

  const client = new CognitoIdentityProviderClient({
    region: awsExports.aws_project_region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  try {
    const command = new GetUserCommand({ AccessToken: accessToken });
    const response = await client.send(command);
    return NextResponse.json({ isAuthenticated: true, user: response });
  } catch (error) {
    // console.error("Error checking sign-in status:", error);
    if (error instanceof Error) {
      return NextResponse.json({ isAuthenticated: false, message: error.message });
    } else if (typeof error === "string") {
      return NextResponse.json({ isAuthenticated: false, message: error });
    } else {
      return NextResponse.json({ isAuthenticated: false, message: "An unknown error occurred" });
    }
  }
}
