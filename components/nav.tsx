"use client";

import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/#sanctuary", id: "sanctuary", label: "The Sanctuary" },
  { href: "/#verandah", id: "verandah", label: "Architecture" },
  { href: "/#suites", id: "suites", label: "Suites" },
  { href: "/#experiences", id: "experiences", label: "Hospitality" },
  { href: "/#gallery", id: "gallery", label: "Archive" },
  { href: "/#location", id: "location", label: "Location" },
];

export function Nav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const lastScroll = useRef(0);

  const syncPastHero = () => {
    if (pathname !== "/") {
      setPastHero(true);
      return;
    }
    const hero = document.getElementById("top");
    const next = hero ? hero.getBoundingClientRect().bottom <= 88 : false;
    setPastHero((prev) => (prev === next ? prev : next));
  };

  useLenis((instance) => {
    const current = instance.scroll;
    const delta = current - lastScroll.current;
    lastScroll.current = current;
    setScrolled(current > 20);
    syncPastHero();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pathname === "/book" || open || reduce || current < 12) {
      setHidden(false);
      return;
    }
    if (delta > 0) setHidden(true);
    else if (delta < 0) setHidden(false);
  });

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    syncPastHero();
  }, [pathname]);

  if (pathname === "/book") {
    return (
      <header className="book-bar">
        <Link className="book-bar-logo" href="/">
          <Image
            src="/logo.webp"
            alt="Rain Homestay"
            width={580}
            height={430}
            priority
            className="brand-logo is-ink"
          />
        </Link>
        <Link className="book-bar-back" href="/">
          Back to home
        </Link>
      </header>
    );
  }

  return (
    <>
      <header className={`luxury-nav ${scrolled ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""} ${pathname !== "/" || pastHero ? "is-solid" : ""}`}>
        <Link className="luxury-logo" href="/" onClick={() => setOpen(false)}>
          <Image
            src="/logo.webp"
            alt="Rain Homestay"
            width={580}
            height={430}
            priority
            className="brand-logo"
          />
        </Link>

        <div className="nav-inner-container">
          <nav className="desktop-nav-menu" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link key={link.id} href={link.href} className="nav-anchor">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nav-action-cluster">
            <Link className="btn-nav-reserve" href="/book" onClick={() => setOpen(false)}>
              <span className="reserve-label-full">Reserve Homestay</span>
              <span className="reserve-label-short">Reserve</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={`mobile-nav-toggle ${open ? "is-active" : ""}`}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="line line-1" />
              <span className="line line-2" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`mobile-menu-drawer ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        aria-hidden={!open}
      >
        <div className="drawer-backdrop" onClick={() => setOpen(false)} />
        <div className="drawer-panel">
          <div className="drawer-header">
            <Image
              src="/logo.webp"
              alt="Rain Homestay"
              width={580}
              height={430}
              className="brand-logo is-ink drawer-logo"
            />
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="drawer-links-list">
            {navLinks.map((link, idx) => (
              <Link
                key={link.id}
                href={link.href}
                className="drawer-link-item"
                onClick={() => setOpen(false)}
              >
                <span className="drawer-index">0{idx + 1}</span>
                <span className="drawer-label">{link.label}</span>
              </Link>
            ))}
            <Link
              href="/book"
              className="drawer-link-item is-featured"
              onClick={() => setOpen(false)}
            >
              <span className="drawer-index">07</span>
              <span className="drawer-label">Request Dates</span>
            </Link>
          </nav>

          <div className="drawer-footer-info">
            <div className="drawer-contact-block">
              <p className="contact-heading">Direct Estate Concierge</p>
              <a href="tel:+918129730777" className="drawer-phone">
                +91 81297 30777
              </a>
              <a href="mailto:rainhomestaykochi@gmail.com" className="drawer-email">
                rainhomestaykochi@gmail.com
              </a>
            </div>
            <p className="drawer-location-tag">
              Satellite Township, Padamughal, Kakkanad, Kochi
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
