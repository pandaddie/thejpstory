"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function RSVP() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      attending: formData.get("attending"),
      guests: formData.get("guests"),
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
    } catch {
      setStatus("error");
    }
  }

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
            We would be honoured to celebrate with you. Kindly complete the form
            below to let us know if you'll be joining us. We can't wait to
            welcome you on our special day.
          </p>
        </motion.div>

        <motion.div
          className="rsvp-form-panel"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {status === "success" ? (
            <div className="rsvp-success">
              <CheckCircle2 size={52} strokeWidth={1.3} />

              <span>Response Received</span>

              <h3>Thank You</h3>

              <p>
                Your RSVP has been received. We are grateful and look forward to
                celebrating with you.
              </p>

              <button type="button" onClick={() => setStatus("idle")}>
                Submit Another Response
              </button>
            </div>
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
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
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
                  We could not submit your response. Please confirm that your
                  Google Apps Script URL has been added to `.env.local`.
                </p>
              )}

              <button
                type="submit"
                className="rsvp-submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  "Submitting..."
                ) : (
                  <>
                    submit RSVP
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
