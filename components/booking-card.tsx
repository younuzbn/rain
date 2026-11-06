"use client";

import { DateBar } from "@/components/date-bar";

export function BookingCard() {
  return (
    <aside className="book-card">
      <p className="book-card-price">Rates on request</p>
      <p className="book-card-sub">You won’t be charged on this page.</p>
      <DateBar variant="card" />
    </aside>
  );
}
