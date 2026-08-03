"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
  { label: "The Wedding", href: "#wedding" },
  { label: "Accommodation", href: "#accommodation" },
  { label: "Registry", href: "#registry" },
  { label: "RSVP", href: "#rsvp" },
  { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = menuOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={[
        "navbar",
        scrolled ? "navbar-scrolled" : "",
        menuOpen ? "navbar-menu-active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="navbar-inner">
        <Link
          href="#home"
          className="navbar-logo"
          onClick={closeMenu}
          aria-label="Paul and Jozzy - Home"
        >
          <span className="navbar-logo-glow" aria-hidden="true" />

          <Image
            src="/images/pj-monogram.png"
            alt="Paul and Jozzy"
            width={90}
            height={70}
            className="navbar-monogram"
            priority
          />
        </Link>

        <nav className="navbar-desktop" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={`navbar-toggle ${menuOpen ? "navbar-toggle-open" : ""}`}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="navbar-toggle-line navbar-toggle-line-one" />
          <span className="navbar-toggle-line navbar-toggle-line-two" />
          <span className="navbar-toggle-line navbar-toggle-line-three" />
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-decoration" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              style={{
                transitionDelay: menuOpen ? `${120 + index * 70}ms` : "0ms",
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>

              <strong>{item.label}</strong>

              <i aria-hidden="true" />
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          <p>Paul Quartey &amp; Jozzy Owusu</p>
          <span>October 03, 2026</span>
        </div>
      </div>
    </header>
  );
}
