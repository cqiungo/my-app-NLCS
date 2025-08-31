// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(req: any) {
    const session = await auth(req);
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();

}

// Optional: chỉ chạy middleware ở các route cụ thể
export const config = {
  matcher: ["/dashboard","/"], // kiểm tra những route cần bảo vệ
};
