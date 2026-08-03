"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarClock,
  Hotel,
  MapPin,
} from "lucide-react";

const BOOKING_URL =
  "https://www.hilton.com/en/attend-my-event/rldv-dt-91j-00c9036e-62b6-4b25-a9e4-6c48db825a26/";

export default function Accommodation() {
  return (
    <section id="accommodation" className="accommodation">
      <div className="accommodation-container">
        <motion.header
          className="accommodation-header"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="section-tag">Where to Stay</span>

          <h2 className="section-title">Accommodation</h2>

          <p>
            A special hotel rate has been arranged for our wedding guests.
            Please reserve your room through the link below to access the
            discounted rate.
          </p>
        </motion.header>

        <motion.article
          className="accommodation-card"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="accommodation-card-icon" aria-hidden="true">
            <Hotel size={30} strokeWidth={1.35} />
          </div>

          <div className="accommodation-card-content">
            <span className="accommodation-eyebrow">
              Preferred Wedding Hotel
            </span>

            <h3>DoubleTree by Hilton Hotel Denver</h3>

            <div className="accommodation-detail">
              <MapPin size={18} strokeWidth={1.5} />

              <span>3203 Quebec St, Denver, CO 80207</span>
            </div>

            <div className="accommodation-deadline">
              <CalendarClock size={19} strokeWidth={1.5} />

              <div>
                <span>Discounted-rate deadline</span>
                <strong>Book by September 10, 2026</strong>
              </div>
            </div>

            <p className="accommodation-note">
              Availability is limited, so we encourage guests to reserve their
              rooms as early as possible.
            </p>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="accommodation-book-button"
            >
              Book Now
              <ArrowUpRight size={18} strokeWidth={1.6} />
            </a>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
