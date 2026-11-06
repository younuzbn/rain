import type { Metadata, Viewport } from "next";
import { Shell } from "@/components/shell";
import { Nav } from "@/components/nav";
import { SiteFooter } from "@/components/site-footer";
import { house, siteUrl } from "@/lib/site";
import "./globals.css";
import "./stay.css";

const description =
  "Entire private home in Satellite Township, Padamughal, Kakkanad, Kochi. Four bedrooms, three bathrooms, an 80 ft verandah, a full kitchen, and parking for 8–10 cars. ₹10,000 a night for one group.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rain Homestay — entire home in Kakkanad, Kochi",
    template: "%s",
  },
  description,
  applicationName: house.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rain Homestay — entire home in Kakkanad, Kochi",
    description,
    url: "/",
    siteName: house.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/photos/exterior.webp", alt: "The front of Rain Homestay in Kakkanad" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F4EF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Shell>
          <a className="skip" href="#content">
            Skip to content
          </a>
          <Nav />
          {children}
          <SiteFooter />
        </Shell>
      </body>
    </html>
  );
}
