"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Gift,
  Heart,
  Hotel,
  MapPin,
  Send,
} from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

type SubmittedRSVP = {
  name: string;
  attending: "Yes" | "No";
  guests: number;
};

const WEDDING_DATE = new Date("2026-10-10T12:00:00-04:00");

function getFirstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || "Dear Guest";
}

function buildCalendarFile() {
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PJ Forever//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:paul-jozzy-wedding-20261010@pjforever.com",
    "DTSTAMP:20260729T000000Z",
    "DTSTART;VALUE=DATE:20261010",
    "DTEND;VALUE=DATE:20261011",
    "SUMMARY:Paul & Jozzy's Wedding",
    "DESCRIPTION:Join Paul and Jozzy as they celebrate their wedding day.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = "paul-and-jozzy-wedding.ics";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default function RSVP() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submittedRSVP, setSubmittedRSVP] = useState<SubmittedRSVP | null>(
    null,
  );
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const difference = WEDDING_DATE.getTime() - Date.now();
      setDaysRemaining(Math.max(0, Math.ceil(difference / 86_400_000)));
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 60_000);

    return () => window.clearInterval(timer);
  }, []);

  const sparklePositions = useMemo(
    () => [
      { left: "8%", top: "13%", delay: 0.05 },
      { left: "19%", top: "29%", delay: 0.22 },
      { left: "87%", top: "18%", delay: 0.36 },
      { left: "76%", top: "35%", delay: 0.14 },
      { left: "12%", top: "72%", delay: 0.44 },
      { left: "91%", top: "68%", delay: 0.28 },
      { left: "31%", top: "8%", delay: 0.5 },
      { left: "66%", top: "10%", delay: 0.18 },
    ],
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const attending = String(formData.get("attending") ?? "") as "Yes" | "No";
    const guests = Number(formData.get("guests") ?? 1);

    const payload = {
      name,
      email: formData.get("email"),
      phone: formData.get("phone"),
      attending,
      guests,
      message: formData.get("message"),
      submitted_at: new Date().toISOString(),
    };

    const endpoint = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (!endpoint) {
      setStatus("error");
      return;
    }

    try {
      setStatus("submitting");

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to submit RSVP.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("RSVP submission error:", error);
      setStatus("error");
    }
  }

  const firstName = submittedRSVP ? getFirstName(submittedRSVP.name) : "";
  const isAttending = submittedRSVP?.attending === "Yes";

  return (
    <section id="rsvp" className="rsvp">
      <div className="rsvp-container">
        <motion.div
          className="rsvp-intro"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <span className="section-tag">RSVP</span>

          <h2 className="section-title">
            We Look Forward to
            <br />
            Celebrating With You
          </h2>

          <p>
            We would be honored to celebrate with you. Kindly complete the form
            below to let us know if you&apos;ll be joining us. We can&apos;t
            wait to welcome you on our special day.
          </p>
        </motion.div>

        <motion.div
          className="rsvp-form-panel"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {status === "success" && submittedRSVP ? (
            <motion.div
              className="rsvp-success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="rsvp-success-sparkles" aria-hidden="true">
                {sparklePositions.map((sparkle, index) => (
                  <motion.span
                    key={index}
                    style={{ left: sparkle.left, top: sparkle.top }}
                    initial={{ opacity: 0, scale: 0, rotate: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: 45,
                    }}
                    transition={{
                      duration: 1.8,
                      delay: sparkle.delay,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="rsvp-success-seal"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              >
                <CheckCircle2 size={44} strokeWidth={1.35} />
              </motion.div>

              <span className="rsvp-success-kicker">Response Received</span>
              <h3>Thank You, {firstName}!</h3>

              <p className="rsvp-success-message">
                {isAttending
                  ? "We are absolutely delighted that you will be celebrating with us. Your presence will make our day even more meaningful, and we cannot wait to welcome you."
                  : "Thank you for taking the time to respond. Though we will miss celebrating with you in person, we are deeply grateful for your love, prayers, and warm wishes."}
              </p>

              {isAttending && (
                <div className="rsvp-seat-card">
                  <span>We have reserved</span>
                  <strong>
                    {submittedRSVP.guests}{" "}
                    {submittedRSVP.guests === 1 ? "Seat" : "Seats"}
                  </strong>
                  <span>especially for you</span>
                </div>
              )}

              <div className="rsvp-countdown-card">
                <span>Only</span>
                <strong>{daysRemaining ?? "—"}</strong>
                <span>
                  {daysRemaining === 1
                    ? "Day Until We Say “I Do”"
                    : "Days Until We Say “I Do”"}
                </span>
              </div>

              <div className="rsvp-quick-actions">
                <button type="button" onClick={buildCalendarFile}>
                  <CalendarDays size={18} />
                  Add to Calendar
                </button>

                <a href="#wedding">
                  <MapPin size={18} />
                  Wedding Details
                </a>

                <a href="#accommodation">
                  <Hotel size={18} />
                  Accommodation
                </a>

                <a href="#registry">
                  <Gift size={18} />
                  View Registry
                </a>
              </div>

              <div className="rsvp-success-signature">
                <Heart size={17} fill="currentColor" />
                <span>With love,</span>
                <strong>Paul &amp; Jozzy</strong>
                <small>October 10, 2026</small>
              </div>

              <blockquote>
                “He has made everything beautiful in its time.”
                <cite>Ecclesiastes 3:11</cite>
              </blockquote>

              <button
                type="button"
                className="rsvp-another-response"
                onClick={() => {
                  setSubmittedRSVP(null);
                  setStatus("idle");
                }}
              >
                Submit Another Response
              </button>
            </motion.div>
          ) : (
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <div className="rsvp-field rsvp-field-full">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="rsvp-field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="rsvp-field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 000 000 0000"
                  autoComplete="tel"
                />
              </div>

              <fieldset className="rsvp-field rsvp-field-full">
                <legend>Will you be attending?</legend>
                <div className="rsvp-options">
                  <label>
                    <input type="radio" name="attending" value="Yes" required />
                    <span>Will Attend Joyfully</span>
                  </label>
                  <label>
                    <input type="radio" name="attending" value="No" required />
                    <span>Unable to Attend</span>
                  </label>
                </div>
              </fieldset>

              <div className="rsvp-field">
                <label htmlFor="guests">Number of Guests</label>

                <select id="guests" name="guests" defaultValue="1" required>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                </select>
              </div>

              <div className="rsvp-field rsvp-field-full">
                <label htmlFor="message">Message for the Couple</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Leave us a message, blessing or well wishes (optional)"
                />
              </div>

              {status === "error" && (
                <p className="rsvp-error">
                  We could not submit your response. Please try again in a
                  moment.
                </p>
              )}

              <button
                type="submit"
                className="rsvp-submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    <span className="rsvp-submit-spinner" aria-hidden="true" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit RSVP
                    <Send size={17} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
