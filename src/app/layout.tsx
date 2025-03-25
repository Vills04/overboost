// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "../context/UserContext"; // Importa el contexto de usuario
import { CartProvider } from "../context/CartContext"; // Importa el contexto del carrito
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <UserProvider> {/* ✅ UserProvider envuelve todo */}
          <CartProvider> {/* Ahora el CartProvider envuelve todo también */}
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}



