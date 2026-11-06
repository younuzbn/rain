import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms — Rain Homestay",
  description: "How a stay enquiry works at Rain Homestay in Kakkanad.",
};

export default function TermsPage() {
  return (
    <main id="content" className="legal">
      <article>
        <Link href="/" className="legal-back">
          ← House
        </Link>
        <p className="legal-kicker">Rain Homestay · Kakkanad</p>
        <h1>Terms</h1>
        <p>
          Sending dates on this website asks the house about a stay. It does not confirm a booking.
        </p>

        <h2>The house</h2>
        <p>
          Rain Homestay is a private house in Satellite Township, Padamughal, Kakkanad. A confirmed stay is for one group at a time. The house is not shared with another booking.
        </p>

        <h2>Dates and rates</h2>
        <p>
          Check-in and check-out dates are a request. The host confirms whether those dates are free. The published rate is ₹10,000 a night for the whole house. Pickup and drop are ₹1,500 for the stay. Breakfast, lunch, and dinner are ₹200 a person when you ask for them. Nothing is charged on this website.
        </p>

        <h2>The group</h2>
        <p>
          Tell us how many guests are coming, and whether you want a car from the airport or station, or Kerala meals. Those are arranged when you ask. The kitchen in the house is there for the group to use.
        </p>

        <h2>Contact</h2>
        <p>
          Rain Homestay, Indira Junction, Rajiv Junction, Satellite Township, Padamughal, Kakkanad, Kochi, Kerala 682030. Phone +91 81297 30777. Email rainhomestaykochi@gmail.com.
        </p>
      </article>
    </main>
  );
}
