import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The JP Story | Paul & Jozzy",

  description:
    "Join us as we celebrate our wedding. October 3, 2026. By Divine Design.",

  metadataBase: new URL("https://thejpstory.com"),

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "The JP Story | Paul & Jozzy",
    description:
      "Join us as we celebrate our wedding. October 3, 2026. By Divine Design.",
    url: "https://thejpstory.com",
    siteName: "The JP Story",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "The JP Story | Paul & Jozzy",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The JP Story | Paul & Jozzy",
    description:
      "Join us as we celebrate our wedding. October 3, 2026. By Divine Design.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
