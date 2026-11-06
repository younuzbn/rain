import { Hero } from "@/components/hero";
import { HouseFigures } from "@/components/house-figures";
import { PlaceStory } from "@/components/place-story";
import { listingCopy } from "@/lib/stay";
import { EstateChapters } from "@/components/estate-chapters";
import { EstateManifesto } from "@/components/estate-manifesto";
import { HorizontalGallery } from "@/components/horizontal-gallery";
import { SuitesShowcase } from "@/components/suites-showcase";
import { Experiences } from "@/components/experiences";
import { AsymmetricGallery } from "@/components/asymmetric-gallery";
import { LocationRadar } from "@/components/location-radar";
import { BookInvite } from "@/components/book-invite";

export default function Home() {
  return (
    <main id="content" className="luxury-estate-main">
      {/* 1. Immersive Fullscreen Architectural Hero with Parallax & Rain Atmosphere */}
      <Hero />
      <HouseFigures />
      <section className="home-place" id="place">
        <div className="home-place-inner">
          <header className="home-place-head">
            <p>The house</p>
            <h2>{listingCopy.subtitle}</h2>
            <ul className="stay-specs">
              {listingCopy.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </header>
          <PlaceStory showBookLink />
        </div>
      </section>
      <EstateChapters />
      <EstateManifesto />

      {/* 3. Horizontal Parallax Exhibition: The Colonnaded Verandah, Nadumuttam, & Spaces */}
      <HorizontalGallery />

      {/* 4. Interactive Accommodations Browser: The 4 Private Suites */}
      <SuitesShowcase />

      {/* 5. Bespoke Kerala Hospitality: Airport Transfers, Traditional Dining, Tech Proximity */}
      <Experiences />

      {/* 6. Dual-Speed Asymmetrical Vertical Parallax Archive */}
      <AsymmetricGallery />

      {/* 7. Reservation, then the location */}
      <BookInvite />
      <LocationRadar />
    </main>
  );
}
