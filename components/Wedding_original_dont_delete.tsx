"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  ExternalLink,
  MapPin,
  Shirt,
} from "lucide-react";

const weddingEvents = [
  {
    number: "01",
    label: "The Covenant",
    title: "Wedding Ceremony",
    time: "1:30 PM",
    venue: "Shanah City",
    address: "380 South Potomac Street, Aurora, CO 80012, Unit 120",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=380+South+Potomac+Street+Aurora+CO+80012",
  },
  {
    number: "02",
    label: "The Celebration",
    title: "Wedding Reception",
    time: "4:00 PM",
    venue: "DoubleTree by Hilton Hotel Denver",
    address: "3203 Quebec St, Denver, CO 80207",
    note: "Adults Only, respectfully.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=3203+Quebec+St+Denver+CO+80207",
  },
  {
    number: "03",
    label: "The Thanksgiving",
    title: "Thanksgiving Service",
    time: "10:00 AM",
    venue: "Shanah City",
    address: "380 South Potomac Street, Aurora, CO 80012, Unit 120",
    secondaryTime: "2:00 PM",
    secondaryTitle: "Lunch",
    secondaryNote: "More details to follow.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=380+South+Potomac+Street+Aurora+CO+80012",
  },
];

export default function Wedding() {
  return (
    <section id="wedding" className="wedding">
      <div className="wedding-container">
        <motion.header
          className="wedding-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="section-tag">The Wedding</span>

          <h2 className="section-title">
            Together With Our Families,
            <br />
            We Invite You
          </h2>

          <p className="wedding-introduction">To celebrate with us...</p>
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

          <p>Denver, Colorado</p>
        </motion.div>

        <div className="wedding-events">
          {weddingEvents.map((event, index) => (
            <motion.article
              key={event.title}
              className="wedding-event"
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <span className="wedding-event-number">{event.number}</span>

              <div className="wedding-event-content">
                <p className="wedding-event-label">{event.label}</p>

                <h3>{event.title}</h3>

                <div className="wedding-event-detail">
                  <Clock3 size={18} strokeWidth={1.5} />
                  <span>{event.time}</span>
                </div>

                <div className="wedding-event-detail wedding-event-location">
                  <MapPin size={18} strokeWidth={1.5} />

                  <div>
                    <strong>{event.venue}</strong>
                    <span>{event.address}</span>

                    {event.note && (
                      <span className="wedding-event-note">{event.note}</span>
                    )}
                  </div>
                </div>

                {event.secondaryTime && (
                  <>
                    <div className="wedding-event-detail">
                      <Clock3 size={18} strokeWidth={1.5} />
                      <span>{event.secondaryTime}</span>
                    </div>

                    <div className="wedding-event-detail wedding-event-location">
                      <MapPin size={18} strokeWidth={1.5} />

                      <div>
                        <strong>{event.secondaryTitle}</strong>
                        <span>{event.secondaryNote}</span>
                      </div>
                    </div>
                  </>
                )}

                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="wedding-map-link"
                >
                  View directions
                  <ExternalLink size={15} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="wedding-dress-code"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="wedding-dress-icon">
            <Shirt size={25} strokeWidth={1.3} />
          </div>

          <div>
            <span>Dress Code</span>
            <h3>Formal &amp; Glamorous</h3>

            <p>
              We invite our guests to celebrate with us in refined, fabulous
              attire, befitting the elegance of this special occasion.
            </p>
          </div>
        </motion.div>

        <motion.a
          href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Paul+%26+Jozzy+Wedding&dates=20261003T193000Z/20261004T020000Z&details=Join+us+for+the+wedding+celebration+of+Paul+and+Jozzy.&location=Shanah+City%2C+380+South+Potomac+Street%2C+Aurora%2C+CO+80012"
          target="_blank"
          rel="noreferrer"
          className="wedding-calendar-button"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <CalendarDays size={18} />
          Add to Google Calendar
        </motion.a>
      </div>
    </section>
  );
}
