import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paul & Jozzy | By Design",
  description: "The official wedding website of Paul Quartey and Jozzy Owusu.",
  metadataBase: new URL("https://thejpstory.com"),
  openGraph: {
    title: "Paul & Jozzy | By Design",
    description: "Celebrate the wedding of Paul Quartey and Jozzy Owusu.",
    url: "https://thejpstory.com",
    siteName: "Paul & Jozzy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${headingFont.variable} ${bodyFont.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
