"use server";

import { NextRequest, NextResponse } from "next/server";
import { UserRegisterInterfaceAfterFormatting } from "@/interfaces/user_auth";
import { isGatewayResponse } from "@/utils/typeChecks";
import { validate as uuidValidate } from "uuid";

export async function POST(request: NextRequest) {
  try  {
    const userRegister = await request.json() as UserRegisterInterfaceAfterFormatting;
    const apiId = process.env.API_ID;
    const region = process.env.AWS_REGION;
    const stage = process.env.STAGE;
    const url = `https://${apiId}.execute-api.${region}.amazonaws.com/${stage}/api/users`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegister),
    };

    console.log(requestOptions);
    const response = await fetch(url, requestOptions);
    console.log(response);
    const gatewayResponse = await response.json();
    console.log(gatewayResponse);
    if (!uuidValidate(gatewayResponse.message)) {
      return new NextResponse(JSON.stringify({success: false, error: "Gateway error: Return value was not a UUID."}));
    }
    const statusCode = response.status;

    if (gatewayResponse && isGatewayResponse(gatewayResponse) && gatewayResponse) {
      if (statusCode >= 200 && statusCode < 300) {
        return new NextResponse(JSON.stringify({ success: true, message: gatewayResponse.message}));
      } else {
        return new NextResponse(JSON.stringify({success: false, message: "Failed to contact the Gateway."}), {status: statusCode});
      }
    } else {
      return new NextResponse(JSON.stringify({ success: false, message: "Unexpected Gateway response", error: gatewayResponse.error}), {status: 500});
    }
  } catch (error) {
    console.log("Next server has encountered an error");
    const errorResponse = error;
    return new NextResponse(JSON.stringify(errorResponse), {status: 400});
  }
}
