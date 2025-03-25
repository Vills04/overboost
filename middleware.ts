import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Obtiene el token de las cookies

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirige al inicio si no hay token
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (decoded.rol !== "administrador") {
      return NextResponse.redirect(new URL("/", req.url)); // Si no es admin, lo manda al inicio
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/", req.url)); // Si el token es inválido
  }

  return NextResponse.next(); // Permite el acceso si es admin
}

// Aplica el middleware solo en /admin
export const config = {
  matcher: "/admin/:path*", 
};
