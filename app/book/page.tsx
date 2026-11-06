import type { Metadata } from "next";
import { Suspense } from "react";
import { Enquire } from "@/components/enquire";
import { house, siteUrl } from "@/lib/site";
import { amenityGroups, rates } from "@/lib/stay";

const description =
  "Request the entire Rain Homestay in Satellite Township, Padamughal, Kakkanad. Four bedrooms, three bathrooms, a full kitchen, and parking. ₹10,000 a night. Pickup and drop ₹1,500. Breakfast, lunch, or dinner ₹200 a person.";

export const metadata: Metadata = {
  title: "Request Rain Homestay — entire home in Kakkanad, Kochi",
  description,
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Rain Homestay — entire home in Kakkanad, Kochi",
    description,
    url: "/book",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: house.name,
  description,
  url: `${siteUrl}/book`,
  image: `${siteUrl}/photos/exterior.webp`,
  telephone: house.phoneTel,
  email: house.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Satellite Township, Padamughal",
    addressLocality: house.locality,
    addressRegion: house.region,
    postalCode: house.postalCode,
    addressCountry: house.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: house.lat,
    longitude: house.lng,
  },
  numberOfRooms: 4,
  amenityFeature: amenityGroups
    .flatMap((group) => group.items)
    .filter((item) => item.available)
    .map((item) => ({
      "@type": "LocationFeatureSpecification",
      name: item.name,
      value: true,
    })),
  makesOffer: {
    "@type": "Offer",
    price: rates.nightly,
    priceCurrency: "INR",
    description: "Per night for the entire home. The host confirms the dates. Nothing is charged on this website.",
    url: `${siteUrl}/book`,
  },
};

export default function BookPage() {
  return (
    <main id="content" data-page="book">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Suspense fallback={<p className="stay-intro">Loading the house…</p>}>
        <Enquire />
      </Suspense>
    </main>
  );
}
