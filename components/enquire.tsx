"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { formatStayDate, StayCalendar } from "@/components/date-bar";
import { PlaceStory } from "@/components/place-story";
import { mealOptions, transferPlaces, type MealId } from "@/lib/places";
import { house } from "@/lib/site";
import {
  inr,
  listingCopy,
  parseEnquiry,
  placeLabel,
  quoteStay,
  rates,
  type EnquiryInput,
  type StayQuote,
} from "@/lib/stay";

type Picking = "arrive" | "depart";
type Receipt = { id: string; quote: StayQuote };

const emptyMeals: EnquiryInput["meals"] = { breakfast: false, lunch: false, dinner: false };

function monthStart(iso: string) {
  const [year, month] = iso.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

function readInitial(params: { get: (key: string) => string | null }): EnquiryInput {
  const guestsRaw = params.get("guests") ?? "";
  const guests = Number(guestsRaw.replace("+", ""));
  const suite = params.get("suite");
  return {
    name: "",
    phone: "",
    email: "",
    arrive: params.get("arrive") ?? "",
    depart: params.get("depart") ?? "",
    guests: Number.isInteger(guests) && guests >= 1 && guests <= rates.maxGuests ? guests : 2,
    note: suite ? `Interested in: ${suite}` : "",
    pickup: false,
    pickupPlace: "",
    pickupOther: "",
    dropoff: false,
    dropPlace: "",
    dropOther: "",
    meals: { ...emptyMeals },
  };
}

export function Enquire() {
  const params = useSearchParams();
  return <StayPage key={params.toString()} initial={readInitial(params)} />;
}

function StayPage({ initial }: { initial: EnquiryInput }) {
  const [fields, setFields] = useState<EnquiryInput>(initial);
  const [open, setOpen] = useState(false);
  const [picking, setPicking] = useState<Picking>("arrive");
  const [hover, setHover] = useState("");
  const [today, setToday] = useState("");
  const [cursor, setCursor] = useState<Date | null>(null);
  const [wide, setWide] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const stayRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  const quote = useMemo(() => quoteStay(fields), [fields]);

  useEffect(() => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    setToday(`${now.getFullYear()}-${month}-${day}`);
    const focus = initial.arrive ? monthStart(initial.arrive) : new Date(now.getFullYear(), now.getMonth(), 1);
    setCursor(focus);
    const onResize = () => setWide(window.innerWidth >= 760);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [initial.arrive]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (popRef.current?.contains(target) || stayRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const patch = (next: Partial<EnquiryInput>) => {
    setFields((prev) => ({ ...prev, ...next }));
    setReceipt(null);
  };

  const openCalendar = (field: Picking) => {
    if (open && picking === field) {
      setOpen(false);
      return;
    }
    const focus = fields.arrive ? monthStart(fields.arrive) : cursor ?? new Date();
    setCursor(new Date(focus.getFullYear(), focus.getMonth(), 1));
    setPicking(field);
    setHover("");
    setOpen(true);
    setError("");
  };

  const chooseDay = (iso: string) => {
    if (iso < today) return;
    if (picking === "arrive" || !fields.arrive || iso <= fields.arrive) {
      setFields((prev) => ({
        ...prev,
        arrive: iso,
        depart: prev.depart && iso >= prev.depart ? "" : prev.depart,
      }));
      setPicking("depart");
      setError("");
      setReceipt(null);
      return;
    }
    patch({ depart: iso });
    setOpen(false);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = parseEnquiry(fields);
    if (!parsed.ok) {
      setError(parsed.error);
      if (parsed.error.includes("check-in")) {
        setOpen(true);
        setPicking(fields.arrive ? "depart" : "arrive");
      }
      return;
    }
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.value),
      });
      const payload = (await response.json()) as { id?: string; quote?: StayQuote; error?: string };
      if (!response.ok || !payload.id || !payload.quote) {
        setError(payload.error || "The request could not be priced. Try again.");
        return;
      }
      setReceipt({ id: payload.id, quote: payload.quote });
    } catch {
      setError("The request could not reach the server. Try again.");
    } finally {
      setSending(false);
    }
  };

  const message = composeMessage(fields, receipt?.quote ?? quote, receipt?.id);
  const mailto = `mailto:${house.email}?subject=${encodeURIComponent(
    `Stay request ${receipt?.id ?? ""} ${fields.arrive}`.trim(),
  )}&body=${encodeURIComponent(message)}`;
  const whatsapp = `${house.whatsapp}?text=${encodeURIComponent(message)}`;

  const rangeEnd = picking === "depart" && hover && hover > fields.arrive ? hover : fields.depart;
  const now = today ? monthStart(today) : null;
  const canGoBack = Boolean(
    cursor &&
      now &&
      (cursor.getFullYear() > now.getFullYear() ||
        (cursor.getFullYear() === now.getFullYear() && cursor.getMonth() > now.getMonth())),
  );

  return (
    <form className="stay" onSubmit={submit}>
      <div className="stay-gallery" aria-hidden="false">
        <figure>
          <Image src="/photos/exterior.webp" alt="The front of Rain Homestay" fill priority sizes="(max-width: 800px) 100vw, 60vw" />
        </figure>
        <figure>
          <Image src="/photos/balcony.webp" alt="The curved balcony" fill sizes="20vw" />
        </figure>
        <figure>
          <Image src="/photos/living-wide.webp" alt="The living hall" fill sizes="20vw" />
        </figure>
        <figure>
          <Image src="/photos/bedroom-teak.webp" alt="A bedroom with a teak bed" fill sizes="20vw" />
        </figure>
      </div>

      <header className="stay-intro">
        <h1>{listingCopy.title}</h1>
        <p>{listingCopy.subtitle}</p>
        <ul className="stay-specs">
          {listingCopy.specs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
      </header>

      <div className="stay-read">
        <PlaceStory />
      </div>

      <section className="stay-confirm">
        <div className="stay-confirm-copy">
          <h2>Confirm the stay</h2>
          <p>
            <strong>{inr(rates.nightly)}</strong> a night for the whole house. Pickup and drop are {inr(rates.transfer)}{" "}
            once. Each meal is {inr(rates.meal)} a person.
          </p>
        </div>

        <div className="stay-confirm-dates" ref={stayRef}>
          <button
            type="button"
            className={open && picking === "arrive" ? "is-active" : ""}
            aria-expanded={open && picking === "arrive"}
            onClick={() => openCalendar("arrive")}
          >
            <span>Check-in</span>
            <strong className={fields.arrive ? "" : "is-empty"}>
              {fields.arrive ? formatStayDate(fields.arrive, false) : "Add date"}
            </strong>
          </button>
          <button
            type="button"
            className={open && picking === "depart" ? "is-active" : ""}
            aria-expanded={open && picking === "depart"}
            onClick={() => openCalendar("depart")}
          >
            <span>Check-out</span>
            <strong className={fields.depart ? "" : "is-empty"}>
              {fields.depart ? formatStayDate(fields.depart, false) : "Add date"}
            </strong>
          </button>
          <div className="stay-guest" ref={guestRef}>
            <span>Guests</span>
            <div>
              <button
                type="button"
                aria-label="Fewer guests"
                disabled={fields.guests <= 1}
                onClick={() => patch({ guests: fields.guests - 1 })}
              >
                −
              </button>
              <strong>
                {fields.guests} {fields.guests === 1 ? "guest" : "guests"}
              </strong>
              <button
                type="button"
                aria-label="More guests"
                disabled={fields.guests >= rates.maxGuests}
                onClick={() => patch({ guests: fields.guests + 1 })}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="stay-choices">
          <button type="button" className="stay-choice" aria-pressed={fields.pickup} onClick={() => patch({ pickup: !fields.pickup })}>
            <strong>Pickup</strong>
            <span>{inr(rates.transfer)} with drop, once for the stay</span>
          </button>
          <button type="button" className="stay-choice" aria-pressed={fields.dropoff} onClick={() => patch({ dropoff: !fields.dropoff })}>
            <strong>Drop</strong>
            <span>Included in the same {inr(rates.transfer)}</span>
          </button>
          {mealOptions.map((meal) => (
            <button
              key={meal.id}
              type="button"
              className="stay-choice"
              aria-pressed={fields.meals[meal.id]}
              onClick={() => patch({ meals: { ...fields.meals, [meal.id]: !fields.meals[meal.id] } })}
            >
              <strong>{meal.label}</strong>
              <span>{inr(rates.meal)} a person</span>
            </button>
          ))}
        </div>

        {(fields.pickup || fields.dropoff) && (
          <div className="stay-confirm-places">
            {fields.pickup && (
              <PlaceField
                label="Pickup from"
                value={fields.pickupPlace}
                other={fields.pickupOther}
                onPlace={(pickupPlace) => patch({ pickupPlace })}
                onOther={(pickupOther) => patch({ pickupOther })}
              />
            )}
            {fields.dropoff && (
              <PlaceField
                label="Drop at"
                value={fields.dropPlace}
                other={fields.dropOther}
                onPlace={(dropPlace) => patch({ dropPlace })}
                onOther={(dropOther) => patch({ dropOther })}
              />
            )}
          </div>
        )}

        <div className="stay-fields stay-confirm-fields">
          <input
            className="stay-input"
            required
            aria-label="Full name"
            placeholder="Full name"
            autoComplete="name"
            value={fields.name}
            onChange={(event) => patch({ name: event.target.value })}
          />
          <input
            className="stay-input"
            required
            type="tel"
            aria-label="Phone or WhatsApp"
            placeholder="Phone or WhatsApp"
            autoComplete="tel"
            value={fields.phone}
            onChange={(event) => patch({ phone: event.target.value })}
          />
          <input
            className="stay-input"
            required
            type="email"
            aria-label="Email"
            placeholder="Email"
            autoComplete="email"
            value={fields.email}
            onChange={(event) => patch({ email: event.target.value })}
          />
          <textarea
            className="stay-input"
            rows={3}
            aria-label="Message to the host"
            placeholder="Message to the host"
            value={fields.note}
            onChange={(event) => patch({ note: event.target.value })}
          />
        </div>

        <div className="stay-confirm-end">
          {quote.nights > 0 ? (
            <dl className="stay-bill">
              {quote.lines.map((line) => (
                <div key={line.label}>
                  <dt>{line.label}</dt>
                  <dd>{inr(line.amount)}</dd>
                </div>
              ))}
              <div className="is-total">
                <dt>Total</dt>
                <dd>{inr(quote.total)}</dd>
              </div>
            </dl>
          ) : (
            <p className="stay-confirm-wait">Add a check-in and check-out to see the total.</p>
          )}

          <div>
            {error && (
              <p className="stay-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="stay-submit" disabled={sending}>
              {sending ? "Checking the total…" : "Request to book"}
            </button>
            <p className="stay-fine">You won&apos;t be charged yet. The host confirms the dates.</p>
            {receipt && (
              <div className="stay-receipt">
                <strong>Request {receipt.id}</strong>
                <p>
                  Total {inr(receipt.quote.total)} for {receipt.quote.nights}{" "}
                  {receipt.quote.nights === 1 ? "night" : "nights"}. The house inbox is not connected yet, so send this
                  request on WhatsApp or email.
                </p>
                <a href={whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp the host
                </a>
                <a href={mailto}>Send by email</a>
              </div>
            )}
          </div>
        </div>
      </section>


      {open && cursor && today && (
        <StayCalendar
          popRef={popRef}
          anchor={stayRef.current}
          cursor={cursor}
          months={wide ? 2 : 1}
          arrive={fields.arrive}
          depart={fields.depart}
          rangeEnd={rangeEnd}
          today={today}
          picking={picking}
          canGoBack={canGoBack}
          onPrev={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          onNext={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          onPick={chooseDay}
          onHover={setHover}
          onClear={() => {
            patch({ arrive: "", depart: "" });
            setPicking("arrive");
            setHover("");
          }}
        />
      )}
    </form>
  );
}

function PlaceField({
  label,
  value,
  other,
  onPlace,
  onOther,
}: {
  label: string;
  value: string;
  other: string;
  onPlace: (value: string) => void;
  onOther: (value: string) => void;
}) {
  return (
    <div className="stay-place">
      <label>
        <span>{label}</span>
        <select aria-label={label} value={value} onChange={(event) => onPlace(event.target.value)}>
          <option value="">Choose a place</option>
          {transferPlaces.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.places.map((place) => (
                <option key={place} value={place}>
                  {place}
                </option>
              ))}
            </optgroup>
          ))}
          <option value="other">Other location</option>
        </select>
      </label>
      {value === "other" && (
        <input
          className="stay-input"
          aria-label={`${label} address`}
          placeholder="The address"
          value={other}
          onChange={(event) => onOther(event.target.value)}
        />
      )}
    </div>
  );
}

function composeMessage(fields: EnquiryInput, quote: StayQuote, id?: string) {
  const meals = mealOptions.filter((meal) => fields.meals[meal.id]).map((meal) => meal.label);
  const lines = [
    id ? `Rain Homestay request ${id}` : "Rain Homestay stay request",
    "Entire home, Satellite Township, Padamughal, Kakkanad",
    "",
    `Name: ${fields.name || "Guest"}`,
    `Phone: ${fields.phone || "Not added"}`,
    `Email: ${fields.email || "Not added"}`,
    `Check-in: ${fields.arrive ? formatStayDate(fields.arrive) : "Not chosen"}`,
    `Check-out: ${fields.depart ? formatStayDate(fields.depart) : "Not chosen"}`,
    `Guests: ${fields.guests}`,
    `Pickup: ${fields.pickup ? placeLabel(fields.pickupPlace, fields.pickupOther) || "Place not chosen" : "No"}`,
    `Drop: ${fields.dropoff ? placeLabel(fields.dropPlace, fields.dropOther) || "Place not chosen" : "No"}`,
    `Meals: ${meals.length ? meals.join(", ") : "None"}`,
    "",
    ...quote.lines.map((line) => `${line.label}: ${inr(line.amount)}`),
    quote.nights > 0 ? `Total: ${inr(quote.total)}` : "Total: add dates",
    "",
    fields.note.trim() ? `Note: ${fields.note.trim()}` : "",
    "Please confirm whether the house is free. Nothing has been paid on the website.",
  ];
  return lines.filter((line) => line !== "").join("\n");
}
