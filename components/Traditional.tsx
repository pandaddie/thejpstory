"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  ExternalLink,
  MapPin,
  Shirt,
} from "lucide-react";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Lakehouse+at+Southshore+27151+E+Lakeview+Dr+Aurora+CO+80016";

const CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Paul+%26+Jozzy+Traditional+Engagement&dates=20261002T170000Z/20261002T200000Z&details=Traditional+Engagement+of+Paul+and+Jozzy.&location=Lakehouse+at+Southshore%2C+27151+E+Lakeview+Dr%2C+Aurora%2C+CO+80016";

export default function Traditional() {
  return (
    <section id="traditional" className="wedding traditional">
      <div className="wedding-container">
        <div className="traditional-layout">
          <motion.article
            className="wedding-event traditional-main-card"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <span className="wedding-event-number">01</span>

            <div className="wedding-event-content">
              <p className="wedding-event-label">The Joining of Families</p>

              <h3>Traditional Engagement</h3>

              <div className="traditional-main-details">
                <div className="wedding-event-detail">
                  <Clock3 size={20} strokeWidth={1.5} />
                  <span>11:00 AM Prompt</span>
                </div>

                <div className="wedding-event-detail wedding-event-location">
                  <MapPin size={20} strokeWidth={1.5} />

                  <div>
                    <strong>Lakehouse at Southshore</strong>
                    <span>27151 E Lakeview Dr</span>
                    <span>Aurora, CO 80016</span>
                  </div>
                </div>
              </div>

              <a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="wedding-map-link"
              >
                View directions
                <ExternalLink size={15} />
              </a>
            </div>

            <div className="traditional-main-monogram" aria-hidden="true">
              <Image
                src="/images/pj-monogram.png"
                alt=""
                width={220}
                height={220}
                sizes="220px"
              />
            </div>
          </motion.article>

          <div className="traditional-secondary-grid">
            <motion.article
              className="wedding-event traditional-attire-card"
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <span className="wedding-event-number">02</span>

              <div className="wedding-event-content">
                <p className="wedding-event-label">Attire</p>

                <div className="traditional-card-icon">
                  <Shirt size={30} strokeWidth={1.25} />
                </div>

                <h3>White African Wear or White Plain Kente</h3>

                <p className="traditional-card-description">
                  A refined celebration in white, honouring heritage, culture,
                  and the joining of our families.
                </p>
              </div>
            </motion.article>

            <motion.article
              className="wedding-event traditional-calendar-card"
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <span className="wedding-event-number">03</span>

              <div className="wedding-event-content">
                <p className="wedding-event-label">Save The Date</p>

                <div className="traditional-card-icon">
                  <CalendarDays size={30} strokeWidth={1.25} />
                </div>

                <h3>Friday, October 02, 2026</h3>

                <div className="traditional-save-details">
                  <div className="wedding-event-detail">
                    <Clock3 size={18} strokeWidth={1.5} />
                    <span>11:00 AM Prompt</span>
                  </div>

                  <div className="wedding-event-detail wedding-event-location">
                    <MapPin size={18} strokeWidth={1.5} />

                    <div>
                      <strong>Lakehouse at Southshore</strong>
                      <span>Aurora, Colorado</span>
                    </div>
                  </div>
                </div>

                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="wedding-map-link traditional-calendar-link"
                >
                  Add to calendar
                  <ExternalLink size={15} />
                </a>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
