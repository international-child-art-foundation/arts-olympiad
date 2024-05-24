"use server";

import { NextRequest, NextResponse } from "next/server";
import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import awsExports from "../../../../aws-exports";

interface ErrorResponse {
  error: string;
}

export async function POST(request: NextRequest) {
  const { email, password, given_name, family_name, birthdate } = await request.json();

  const client = new CognitoIdentityProviderClient({
    region: awsExports.aws_project_region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new SignUpCommand({
    ClientId: awsExports.aws_user_pools_web_client_id,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: "email", Value: email }, // redundancy intended
      { Name: "given_name", Value: given_name },
      { Name: "family_name", Value: family_name },
      { Name: "birthdate", Value: birthdate },
    ],
  });

  try {
    const response = await client.send(command);
    return NextResponse.json({ message: "Sign-up successful", response });
  } catch (error) {
    const errorResponse: ErrorResponse = { error: (error as Error).message };
    return NextResponse.json(errorResponse, { status: 400 });
  }
}
