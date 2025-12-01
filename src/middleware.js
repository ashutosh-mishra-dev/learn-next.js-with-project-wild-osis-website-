import { auth } from "@/app/_lib/auth";

/*
// ye middleware h agar aap middleware ka use karna chahte h to file ka name src me middleware.js hona chahiye
// hamne yha sirf check kiya h ki kya middleware sahi se work kar rha h ya nhi 

import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request); 
  return NextResponse.redirect(new URL("/about", request.url)); // yha redirect ho jayega /about pr jab ham matcher: ["/account"] matcher se match page pr jayenge 
}

*/

export const middleware = auth;
export const config = { matcher: ["/account"] };

//***** */ most importaint ab next.js 16 me ab middleware kaam nhi karta
// middleware ki jagah proxy use hota h.
