import Image from "next/image";
import Link from "next/link";
import { DateBar } from "@/components/date-bar";

const PHONE = "+918129730777";
const EMAIL = "rainhomestaykochi@gmail.com";
const MAPS_URL = "https://maps.app.goo.gl/D8LXB4B44b3U6n28A";
const WHATSAPP_URL = "https://wa.me/918129730777?text=Hello%20Rain%20Homestay%2C%20I%20would%20like%20to%20enquire%20about%20booking%20dates.";

const visit = [
  { href: "/#sanctuary", label: "The house" },
  { href: "/#suites", label: "Suites" },
  { href: "/#experiences", label: "Hospitality" },
  { href: "/#gallery", label: "Archive" },
  { href: "/#location", label: "Location" },
];

export function Footer() {
  return (
    <footer className="luxury-footer">
      <div className="foot">
        <div className="foot-main">
          <div className="foot-brand">
            <Image
              src="/logo.webp"
              alt="Rain Homestay"
              width={580}
              height={430}
              className="brand-logo is-ink footer-logo"
            />
            <p>A private house in Satellite Township, kept for one group at a time.</p>
          </div>

          <div className="foot-cols">
            <nav className="foot-col" aria-label="Visit">
              <p>Visit</p>
              {visit.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="foot-col">
              <p>Contact</p>
              <a href={`tel:${PHONE}`}>+91 81297 30777</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href={MAPS_URL} target="_blank" rel="noreferrer">
                Google Maps
              </a>
            </div>

            <div className="foot-col">
              <p>Address</p>
              <address>
                Indira Junction, Rajiv Junction, Satellite Township, Padamughal, Kakkanad, Kochi, Kerala 682030
              </address>
            </div>
          </div>
        </div>

        <aside className="foot-stay">
          <h2>Check the house for your dates.</h2>
          <DateBar variant="footer" />
        </aside>
      </div>

      <div className="foot-base">
        <p>© 2026 Rain Homestay, Kakkanad.</p>
        <nav aria-label="Policies">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
