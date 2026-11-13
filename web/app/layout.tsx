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
    "Open research group investigating composable post-training, model adaptation, and purposeful intelligence.",
  metadataBase: new URL("https://streamline.research"),
  openGraph: {
    title: "Streamline — Intelligence, composed like second nature",
    description:
      "Open research group investigating composable post-training, model adaptation, and purposeful intelligence.",
    type: "website",
    locale: "en_US",
    siteName: "Streamline",
  },
  twitter: {
    card: "summary_large_image",
    title: "Streamline — Intelligence, composed like second nature",
    description:
      "Open research group investigating composable post-training, model adaptation, and purposeful intelligence.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="text-slate-900 antialiased bg-[#f6f9f8] font-serif">
        {children}
      </body>
    </html>
  );
}
