import { NextRequest, NextResponse } from "next/server";
import { handleSignUp } from "@/utils/auth";

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, birthdate, password } = await req.json();
  console.log(firstName);
  const result = await handleSignUp({ firstName, lastName, email, birthdate, password });

  if (result.success) {
    return NextResponse.json({ userId: result.userId, nextStep: result.nextStep }, { status: 200 });
  } else {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
}
