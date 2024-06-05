"use server";

import { NextRequest, NextResponse } from "next/server";
import { UserLoginInterface } from "@/interfaces/user_auth";
import { LoginResponse } from "@/interfaces/api_shapes";
import { isGatewayResponse } from "@/utils/typeChecks";

export async function POST(request: NextRequest) {
  try {
    const userLogin = await request.json() as UserLoginInterface;

    const apiId = process.env.API_ID;
    const region = process.env.AWS_REGION;
    const stage = process.env.STAGE;
    const url = `https://${apiId}.execute-api.${region}.amazonaws.com/${stage}/api/login`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
    };

    const response = await fetch(url, requestOptions);
    const gatewayResponse = await response.json();
    const loginResponse = await gatewayResponse.body as LoginResponse;
    const statusCode = response.status;

    if (gatewayResponse && isGatewayResponse(gatewayResponse) && loginResponse) {
      if (statusCode >= 200 && statusCode < 300) {
        const responseHeaders = new Headers();
        responseHeaders.append("Set-Cookie", `idToken=${loginResponse.idToken}; HttpOnly; Secure; Path=/; SameSite=Strict`);
        responseHeaders.append("Set-Cookie", `accessToken=${loginResponse.accessToken}; HttpOnly; Secure; Path=/; SameSite=Strict`);
        responseHeaders.append("Set-Cookie", `refreshToken=${loginResponse.refreshToken}; HttpOnly; Secure; Path=/; SameSite=Strict`);
        return new NextResponse(JSON.stringify({ success: true, message: "Login successful" }), { headers: responseHeaders });
      } else {
        return new NextResponse(JSON.stringify(gatewayResponse), { status: statusCode });
      }
    } else {
      return new NextResponse(JSON.stringify({ success: false, data: { message: "Unexpected Gateway response", error: gatewayResponse.error } }), { status: 500 });
    }
  } catch (error) {
    console.log("Next server has encountered an error");
    const errorResponse = error;
    return new NextResponse(JSON.stringify(errorResponse), {status: 400});
  }
}
