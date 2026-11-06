import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy — Rain Homestay",
  description: "How Rain Homestay uses the details you send with a stay enquiry.",
};

export default function PrivacyPage() {
  return (
    <main id="content" className="legal">
      <article>
        <Link href="/" className="legal-back">
          ← House
        </Link>
        <p className="legal-kicker">Rain Homestay · Kakkanad</p>
        <h1>Privacy</h1>
        <p>
          This page explains what happens to the details you send when you ask about a stay at the house in Satellite Township, Padamughal.
        </p>

        <h2>What you send</h2>
        <p>
          An enquiry can include your name, phone number, email, check-in and check-out dates, the size of the group, pickup and drop requests, meal requests, and a note.
        </p>

        <h2>How it is used</h2>
        <p>
          The page checks the dates and the total on the server. The house does not keep a copy there yet. The request reaches the host when you send it by email or WhatsApp. Those details are used to reply about availability. They are not sold, and this website does not create an account or take a payment.
        </p>

        <h2>Email and WhatsApp</h2>
        <p>
          Send by email opens a message to rainhomestaykochi@gmail.com in your own mail app. WhatsApp opens a chat with +91 81297 30777. The message is the enquiry you wrote.
        </p>

        <h2>A question about a message</h2>
        <p>
          Write to rainhomestaykochi@gmail.com or call +91 81297 30777 if you want a previous enquiry updated.
        </p>
      </article>
    </main>
  );
}
