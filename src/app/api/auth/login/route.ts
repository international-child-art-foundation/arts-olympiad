"use server";

import { NextRequest, NextResponse } from "next/server";
import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import awsExports from "../../../../aws-exports";

interface ErrorResponse {
  error: string;
}

// This endpoint calls the Cognito API via aws-sdk for user login.
// The endpoint returns httpOnly cookies along with a success/fail response. 
// TOOD: Consider adding cookie expiration date
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const client = new CognitoIdentityProviderClient({
    region: awsExports.aws_project_region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: awsExports.aws_user_pools_web_client_id,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });

  try {
    const response = await client.send(command);
    const { AuthenticationResult } = response;

    if (!AuthenticationResult) {
      throw new Error("Authentication failed");
    }

    const { IdToken, AccessToken, RefreshToken } = AuthenticationResult;

    const responseHeaders = new Headers();
    responseHeaders.append("Set-Cookie", `idToken=${IdToken}; HttpOnly; Secure; Path=/; SameSite=Strict`);
    responseHeaders.append("Set-Cookie", `accessToken=${AccessToken}; HttpOnly; Secure; Path=/; SameSite=Strict`);
    responseHeaders.append("Set-Cookie", `refreshToken=${RefreshToken}; HttpOnly; Secure; Path=/; SameSite=Strict`);

    return new NextResponse(JSON.stringify({ message: "Login successful" }), { headers: responseHeaders });
  } catch (error) {
    const errorResponse: ErrorResponse = { error: (error as Error).message };
    return NextResponse.json(errorResponse, { status: 400 });
  }
}
