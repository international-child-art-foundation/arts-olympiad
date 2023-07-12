import artworksData from "../../../../mock/artworks.json";

import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
  const limitStr = req.nextUrl.searchParams.get("_limit");
  const pageStr = req.nextUrl.searchParams.get("_page");

  // # to display per page
  const defaultLimit = 4;
  const limit = typeof(limitStr) === "string" ? parseInt(limitStr) : defaultLimit;
  // how many to skip
  const page = typeof(pageStr) === "string" ? parseInt(pageStr) : 1;
  
  // temporary pagination on front end
  const artworks = artworksData;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const data = artworks.slice(startIndex, endIndex);

  const res = {
    total: artworks.length,
    data,
  };
  return NextResponse.json(res);
  
}