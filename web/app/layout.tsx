import type { Metadata } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/source-serif-4/400.css";
import "@fontsource/source-serif-4/500.css";
import "@fontsource/source-serif-4/600.css";
import "@fontsource/source-serif-4/400-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Streamline — Intelligence, composed like second nature",
  description:
    "Streamline is an open research group making model creation composable, shareable and effortless.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="text-slate-100 antialiased bg-[#061220] font-serif">
        {children}
      </body>
    </html>
  );
}
