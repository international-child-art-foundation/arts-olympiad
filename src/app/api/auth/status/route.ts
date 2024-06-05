"use server";

import { NextRequest, NextResponse } from "next/server";
import { isGatewayResponse } from "@/utils/typeChecks";

//Unsure of whether this endpoint will be used
export async function GET(request: NextRequest) {
  try {
    const cookies = request.cookies;

    const idToken = cookies.get("idToken")?.value;
    const accessToken = cookies.get("accessToken")?.value;
    const refreshToken = cookies.get("refreshToken")?.value;

    if (!idToken || !accessToken || !refreshToken) {
      return new NextResponse(JSON.stringify({ isAuthenticated: false, message: "No valid tokens found" }), { status: 401 });
    }

    const apiId = process.env.API_ID;
    const region = process.env.AWS_REGION;
    const stage = process.env.STAGE;
    const url = `https://${apiId}.execute-api.${region}.amazonaws.com/${stage}/api/status`;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(url, requestOptions);
    const gatewayResponse = await response.json();
    const statusCode = response.status;

    if (gatewayResponse && isGatewayResponse(gatewayResponse)) {
      if (statusCode >= 200 && statusCode < 300) {
        return new NextResponse(JSON.stringify({ isAuthenticated: true, user: gatewayResponse.body }), { status: statusCode });
      } else {
        return new NextResponse(JSON.stringify(gatewayResponse), { status: statusCode });
      }
    } else {
      return new NextResponse(JSON.stringify({ isAuthenticated: false, message: "Unexpected Gateway response", error: gatewayResponse.error }), { status: 500 });
    }
  } catch (error) {
    console.log("Next server has encountered an error");
    const errorResponse = error;
    return new NextResponse(JSON.stringify(errorResponse), {status: 400});
  }
}
