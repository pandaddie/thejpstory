import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The JP Story | Paul & Jozzy",

  description:
    "Join us as we celebrate our wedding. Find ceremony details, RSVP, registry information, accommodations, and everything you need for our special day.",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "The JP Story | Paul & Jozzy",
    description: "Join us as we celebrate our wedding journey.",
    url: "https://thejpstory.com",
    siteName: "The JP Story",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Paul & Jozzy Wedding",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The JP Story | Paul & Jozzy",
    description: "Join us as we celebrate our wedding journey.",
    images: ["/og-image.jpg"],
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
