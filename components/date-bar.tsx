"use client";

import { FormEvent, useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const guestCounts = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12+"];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function toIso(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function fromIso(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function tomorrowIso() {
  return toIso(addDays(startOfDay(new Date()), 1));
}

export function nightsBetween(arrive: string, depart: string) {
  if (!arrive || !depart || depart <= arrive) return 0;
  return Math.round((fromIso(depart).getTime() - fromIso(arrive).getTime()) / 86_400_000);
}

export function formatStayDate(iso: string, withYear = true) {
  if (!iso) return "";
  const date = fromIso(iso);
  const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });
  const label = `${weekday}, ${date.getDate()} ${monthNames[date.getMonth()].slice(0, 3)}`;
  return withYear ? `${label} ${date.getFullYear()}` : label;
}

function monthCells(year: number, month: number) {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = Array.from({ length: lead }, () => null);
  for (let day = 1; day <= count; day += 1) cells.push(new Date(year, month, day));
  return cells;
}

type Picking = "arrive" | "depart";

type DateBarProps = {
  initialArrive?: string;
  initialDepart?: string;
  initialGuests?: string;
  variant?: "bar" | "card" | "footer";
};

export function DateBar({
  initialArrive = "",
  initialDepart = "",
  initialGuests = "2",
  variant = "bar",
}: DateBarProps) {
  const router = useRouter();
  const [arrive, setArrive] = useState(initialArrive);
  const [depart, setDepart] = useState(initialDepart);
  const [guests, setGuests] = useState(initialGuests);
  const [datesReady, setDatesReady] = useState(Boolean(initialArrive));
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [picking, setPicking] = useState<Picking>("arrive");
  const [hover, setHover] = useState("");
  const [cursor, setCursor] = useState<Date | null>(null);
  const [today, setToday] = useState("");
  const [wide, setWide] = useState(false);
  const dockRef = useRef<HTMLFormElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const nights = useMemo(() => nightsBetween(arrive, depart), [arrive, depart]);

  useEffect(() => {
    const now = startOfDay(new Date());
    setToday(toIso(now));
    setCursor((current) => current ?? new Date(now.getFullYear(), now.getMonth(), 1));
    if (!initialArrive) setArrive(toIso(addDays(now, 1)));
    setDatesReady(true);
  }, [initialArrive]);

  useEffect(() => {
    const measure = () => setWide(window.innerWidth >= 760);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (popRef.current?.contains(target) || dockRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const openCalendar = (field: Picking) => {
    const focus = arrive ? fromIso(arrive) : (today ? fromIso(today) : new Date(cursor ?? Date.now()));
    setCursor(new Date(focus.getFullYear(), focus.getMonth(), 1));
    setPicking(field);
    setHover("");
    setOpen(true);
    setError("");
  };

  const chooseDay = (iso: string) => {
    if (iso < today) return;
    if (picking === "arrive" || !arrive || iso <= arrive) {
      setArrive(iso);
      if (depart && iso >= depart) setDepart("");
      setPicking("depart");
      return;
    }
    setDepart(iso);
    setOpen(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!arrive || !depart) {
      setError("Choose a check-in and a check-out date.");
      setOpen(true);
      setPicking(arrive ? "depart" : "arrive");
      return;
    }
    if (depart <= arrive) {
      setError("Check-out has to be after check-in.");
      return;
    }
    const query = new URLSearchParams({ arrive, depart, guests });
    router.push(`/book?${query.toString()}`);
  };

  const months = wide ? 2 : 1;
  const rangeEnd = picking === "depart" && hover && hover > arrive ? hover : depart;
  const now = today ? fromIso(today) : null;
  const canGoBack = Boolean(
    cursor && now && (cursor.getFullYear() > now.getFullYear() || (cursor.getFullYear() === now.getFullYear() && cursor.getMonth() > now.getMonth())),
  );

  return (
    <form
      ref={dockRef}
      className={`luxury-date-dock${variant === "card" ? " is-card-dock" : ""}${variant === "footer" ? " is-footer" : ""}`}
      onSubmit={onSubmit}
    >
      <div className="dock-inputs-cluster">
        <button
          type="button"
          className={`dock-field dock-date-btn ${open && picking === "arrive" ? "is-active" : ""}`}
          aria-label="Check-in date"
          aria-expanded={open && picking === "arrive"}
          onClick={() => openCalendar("arrive")}
        >
          <span className="field-micro-label">Check-in</span>
          <span className={`dock-date-value ${arrive ? "" : "is-empty"}`}>
            {datesReady ? (arrive ? formatStayDate(arrive, false) : "Add date") : "\u00a0"}
          </span>
        </button>

        <div className="dock-field-divider" />

        <button
          type="button"
          className={`dock-field dock-date-btn ${open && picking === "depart" ? "is-active" : ""}`}
          aria-label="Check-out date"
          aria-expanded={open && picking === "depart"}
          onClick={() => openCalendar("depart")}
        >
          <span className="field-micro-label">Check-out</span>
          <span className={`dock-date-value ${depart ? "" : "is-empty"}`}>
            {depart ? formatStayDate(depart, false) : "Add date"}
          </span>
        </button>

        <div className="dock-field-divider" />

        <label className="dock-field">
          <span className="field-micro-label">
            Guests{variant === "footer" ? "" : <span className="guest-scope"> (Entire Home)</span>}
          </span>
          <select
            name="guests"
            value={guests}
            aria-label="Number of guests"
            onChange={(event) => setGuests(event.target.value)}
          >
            {guestCounts.map((count) => (
              <option key={count} value={count}>
                {count} {Number(count) === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </label>
      </div>

      {nights > 0 && (
        <div className="dock-duration-pill">
          <span>{nights} {nights === 1 ? "Night" : "Nights"}</span>
        </div>
      )}

      <button className="dock-submit-btn" type="submit">
        <span>Check Availability</span>
        <span className="btn-arrow">→</span>
      </button>

      {error && <p className="dock-error-msg" role="alert">{error}</p>}

      {open && cursor && (
        <StayCalendar
          popRef={popRef}
          anchor={dockRef.current}
          cursor={cursor}
          months={months}
          arrive={arrive}
          depart={depart}
          rangeEnd={rangeEnd}
          today={today}
          picking={picking}
          canGoBack={canGoBack}
          onPrev={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          onNext={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          onPick={chooseDay}
          onHover={setHover}
          onClear={() => {
            setArrive(tomorrowIso());
            setDepart("");
            setPicking("depart");
            setHover("");
          }}
        />
      )}
    </form>
  );
}

export function StayCalendar({
  popRef,
  anchor,
  cursor,
  months,
  arrive,
  depart,
  rangeEnd,
  today,
  picking,
  canGoBack,
  onPrev,
  onNext,
  onPick,
  onHover,
  onClear,
}: {
  popRef: RefObject<HTMLDivElement | null>;
  anchor: HTMLElement | null;
  cursor: Date;
  months: number;
  arrive: string;
  depart: string;
  rangeEnd: string;
  today: string;
  picking: Picking;
  canGoBack: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPick: (iso: string) => void;
  onHover: (iso: string) => void;
  onClear: () => void;
}) {
  const [box, setBox] = useState({ top: 12, left: 12, width: 340, ready: false });

  useLayoutEffect(() => {
    const place = () => {
      if (!anchor || !popRef.current) return;
      const rect = anchor.getBoundingClientRect();
      const width = Math.min(months === 2 ? 680 : 340, window.innerWidth - 24);
      let left = rect.left + rect.width / 2 - width / 2;
      left = Math.max(12, Math.min(left, window.innerWidth - width - 12));
      const height = popRef.current.offsetHeight || 360;
      const below = rect.bottom + 12;
      const above = rect.top - height - 12;
      let top = below;
      if (below + height > window.innerHeight - 12) {
        top = above >= 88 ? above : Math.max(88, Math.round((window.innerHeight - height) / 2));
      }
      setBox({ top, left, width, ready: true });
    };
    place();
    const frame = requestAnimationFrame(place);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [anchor, months, cursor, popRef]);

  const panels = Array.from({ length: months }, (_, index) => {
    const date = new Date(cursor.getFullYear(), cursor.getMonth() + index, 1);
    return { year: date.getFullYear(), month: date.getMonth() };
  });

  return createPortal(
    <div
      ref={popRef}
      className="stay-cal"
      role="dialog"
      aria-label={picking === "arrive" ? "Choose check-in" : "Choose check-out"}
      style={{ top: box.top, left: box.left, width: box.width, visibility: box.ready ? "visible" : "hidden" }}
    >
      <div className="stay-cal-head">
        <button type="button" className="stay-cal-nav" onClick={onPrev} disabled={!canGoBack} aria-label="Previous month">
          ‹
        </button>
        <p>{picking === "arrive" ? "Select check-in" : "Select check-out"}</p>
        <button type="button" className="stay-cal-nav" onClick={onNext} aria-label="Next month">
          ›
        </button>
      </div>
      <div className={`stay-cal-months ${months === 2 ? "is-pair" : ""}`}>
        {panels.map((panel) => (
          <div key={`${panel.year}-${panel.month}`}>
            <p className="stay-cal-month">
              {monthNames[panel.month]} {panel.year}
            </p>
            <div className="stay-cal-week">
              {weekdays.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="stay-cal-grid">
              {monthCells(panel.year, panel.month).map((date, index) => {
                if (!date) return <span key={`e-${index}`} />;
                const iso = toIso(date);
                const disabled = iso < today;
                const selected = iso === arrive || iso === depart;
                const inRange = Boolean(arrive && rangeEnd && iso > arrive && iso < rangeEnd);
                const start = iso === arrive && Boolean(rangeEnd);
                const end = iso === rangeEnd && Boolean(arrive) && rangeEnd !== arrive;
                return (
                  <span
                    key={iso}
                    className={`stay-cal-cell ${inRange ? "is-range" : ""} ${start ? "is-start" : ""} ${end ? "is-end" : ""}`}
                  >
                    <button
                      type="button"
                      disabled={disabled}
                      className={`${selected ? "is-selected" : ""} ${iso === today ? "is-today" : ""}`}
                      aria-label={date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                      aria-pressed={selected}
                      onMouseEnter={() => onHover(iso)}
                      onFocus={() => onHover(iso)}
                      onClick={() => onPick(iso)}
                    >
                      {date.getDate()}
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="stay-cal-foot">
        <button type="button" onClick={onClear}>
          Clear dates
        </button>
      </div>
    </div>,
    document.body,
  );
}
