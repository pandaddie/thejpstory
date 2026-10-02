"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Story() {
  return (
    <section id="story" className="story">
      <div className="story-container">
        <motion.div
          className="story-copy"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="section-tag">Our Story</span>

          <h2 className="section-title">
            A Love Written
            <br />
            By Divine Design
          </h2>

          <p className="story-intro">
            What began as two separate journeys became one beautiful story,
            guided by faith, friendship and purpose.
          </p>

          <p className="story-text">
            Through every season, God gently aligned our paths and taught us
            that love is not merely found; it is nurtured through patience,
            prayer, understanding and devotion.
          </p>

          <p className="story-text">
            Today, we stand grateful for the journey behind us and joyful for
            the covenant ahead. We cannot wait to celebrate this new beginning
            with the people who have loved, encouraged and supported us.
          </p>

          <div className="story-signature">
            <span>Paul</span>
            <span className="story-ampersand">&</span>
            <span>Jozzy</span>
          </div>
        </motion.div>

        <motion.div
          className="story-images"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="story-image story-image-large">
            <Image
              src="/images/story/story_new.png"
              alt="Paul and Jozzy together"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              priority={false}
            />
            {/*}
            <div className="story-monogram-image">
              <Image
                src="/images/pj-monogram.png"
                alt="Paul and Jozzy monogram"
                width={125}
                height={125}
              />
            </div>*/}
          </div>
        </motion.div>
      </div>
      {/*
      <motion.blockquote
        className="story-scripture"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p>“He has made everything beautiful in its time.”</p>
        <cite>Ecclesiastes 3:11</cite>
      </motion.blockquote> */}
    </section>
  );
}
