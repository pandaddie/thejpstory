"use client";

import { motion } from "framer-motion";
import { Clock3, ExternalLink, MapPin, Shirt } from "lucide-react";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Copperleaf+Clubhouse+4895+S+Tibet+St+Aurora+CO+80015";

const CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Paul+%26+Jozzy+Traditional+Engagement&dates=20261003T170000Z/20261003T200000Z&details=Traditional+Engagement+of+Paul+and+Jozzy.&location=Copperleaf+Clubhouse%2C+4895+S.+Tibet+St.%2C+Aurora%2C+CO+80015";

export default function Traditional() {
  return (
    <section id="traditional" className="wedding traditional">
      <div className="wedding-container">
        <motion.header
          className="wedding-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="section-tag">The Traditional</span>
          <h2 className="section-title">Joining Our Families</h2>
          <p className="wedding-introduction">
            A celebration of love, and the joining of our families.
          </p>
        </motion.header>

        <motion.div
          className="wedding-date-panel"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="wedding-date-day">Saturday</span>
          <div className="wedding-date-display">
            <span>October</span>
            <strong>03</strong>
            <span>2026</span>
          </div>
          <p>Aurora, Colorado</p>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noreferrer"
            className="traditional-date-calendar-link"
          >
            Add to calendar <ExternalLink size={15} />
          </a>
        </motion.div>

        <div className="wedding-events traditional-events">
          <motion.article
            className="wedding-event traditional-event-card"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <span className="wedding-event-number">01</span>
            <div className="wedding-event-content">
              <p className="wedding-event-label">The Venue</p>
              <h3>Copperleaf Clubhouse</h3>
              <div className="wedding-event-detail">
                <Clock3 size={18} strokeWidth={1.5} />
                <span>10:30 AM</span>
              </div>
              <div className="wedding-event-detail wedding-event-location">
                <MapPin size={18} strokeWidth={1.5} />
                <div>
                  <strong>Copperleaf Clubhouse</strong>
                  <span>4895 S. Tibet St.</span>
                  <span>Aurora, CO 80015</span>
                </div>
              </div>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="wedding-map-link"
              >
                View directions <ExternalLink size={15} />
              </a>
            </div>
          </motion.article>

          <motion.article
            className="wedding-event traditional-event-card"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <span className="wedding-event-number">02</span>
            <div className="wedding-event-content">
              <p className="wedding-event-label">Attire</p>
              <h3>White African Wear or White Plain Kente</h3>
              <div className="traditional-attire-icon">
                <Shirt size={25} strokeWidth={1.3} />
              </div>
              <p className="traditional-attire-copy">
                A celebration in white, honouring God, and the sacred joining of
                two families in love and covenant.
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
