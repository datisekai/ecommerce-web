import { NextResponse } from "next/server";

export default function middleware(req: any) {
  let verify = req.cookies.get("token");
  let url = req.url;

  console.log(verify);

  if (verify && url.includes("/login")) {
    return NextResponse.redirect("http://localhost:3000/");
  }
}
