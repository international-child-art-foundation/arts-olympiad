"use server";

import { NextRequest, NextResponse } from "next/server";
import { VerificationCodeInterface } from "@/interfaces/user_auth";
import { isGatewayResponse } from "@/utils/typeChecks";

export async function POST(request: NextRequest) {
  try  {
    const userVerify = await request.json() as VerificationCodeInterface;
    const apiId = process.env.API_ID;
    const region = process.env.AWS_REGION;
    const stage = process.env.STAGE;
    const url = `https://${apiId}.execute-api.${region}.amazonaws.com/${stage}/api/verify`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userVerify),
    };
    const response = await fetch(url, requestOptions);
    const gatewayResponse = await response.json();
    const statusCode = response.status;

    if (gatewayResponse && isGatewayResponse(gatewayResponse) && gatewayResponse) {
      if (statusCode >= 200 && statusCode < 300) {
        return new NextResponse(JSON.stringify({ success: true, message: gatewayResponse.message}));
      } else {
        return new NextResponse(JSON.stringify({success: false, message: "Gateway has encountered an error."}), {status: statusCode});
      }
    } else {
      return new NextResponse(JSON.stringify({ success: false, message: "Unexpected Gateway response"}), {status: 500});
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({error: "Next server has encountered an error"}), {status: 400});
  }
}
