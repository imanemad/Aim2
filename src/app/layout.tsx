import type { Metadata } from "next";
import "./globals.css";
import "@/sass/app.scss";

export const metadata: Metadata = {
  title: "aimFinance",
  description: "مدیریت واریز و برداشت",
};

export default function RootLayout({children}:IChildrenProps) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
