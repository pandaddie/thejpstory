"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const faqItems = [
  {
    question: "What time should I arrive?",
    answer:
      "We kindly ask guests to arrive at least 30 minutes before the ceremony begins. This will allow enough time for parking, seating and settling in before the celebration starts.",
  },
  {
    question: "What is the dress code?",
    answer:
      "The dress code is formal and elegant. We encourage our guests to dress beautifully and comfortably for the occasion.",
  },

  {
    question: "Are children invited?",
    answer:
      "With love and respect, our White Wedding ceremony and reception will be an adults-only celebration. We kindly ask that no children attend.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes. Parking will be available at both the ceremony and reception venues. We recommend arriving early to allow enough time to park and enter the venue.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "We would love for everyone to be fully present during the ceremony. Kindly keep phones and cameras away while the ceremony is taking place. You are welcome to take photos during the reception.",
  },
  {
    question: "What happens if I can no longer attend?",
    answer:
      "Please update us as soon as possible so we can make the necessary seating and catering arrangements.",
  },
  {
    question: "Who should I contact if I have a question?",
    answer:
      "Additional contact information will be provided closer to the wedding date. Please avoid contacting the couple directly on the wedding day unless it is urgent.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleItem(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section id="faqs" className="faqs">
      <div className="faqs-container">
        <motion.header
          className="faqs-header"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="section-tag">Guest Information</span>

          <h2 className="section-title">
            Frequently Asked
            <br />
            Questions
          </h2>

          <p>
            Everything you may need to know as we prepare to celebrate together.
          </p>
        </motion.header>

        <motion.div
          className="faqs-list"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true, amount: 0.15 }}
        >
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <article
                key={item.question}
                className={`faq-item ${isOpen ? "faq-item-open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(index)}
                >
                  <span className="faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="faq-question-text">{item.question}</span>

                  <span className="faq-icon" aria-hidden="true">
                    {isOpen ? (
                      <Minus size={19} strokeWidth={1.5} />
                    ) : (
                      <Plus size={19} strokeWidth={1.5} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.35 },
                        opacity: { duration: 0.25 },
                      }}
                    >
                      <div className="faq-answer-inner">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
