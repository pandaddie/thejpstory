"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Check,
  ChevronDown,
  Compass,
  Copy,
  ExternalLink,
  Gift,
  Hotel,
  Mail,
  Plane,
  Sparkles,
  UtensilsCrossed,
  X,
} from "lucide-react";

type CopyKey = "paypal-primary" | "paypal-secondary" | "interac" | "mtn" | null;
type PaymentRegion = "north-america" | "international" | null;

export default function Registry() {
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedItem, setCopiedItem] = useState<CopyKey>(null);
  const [copiedLabel, setCopiedLabel] = useState("");
  const [openRegion, setOpenRegion] = useState<PaymentRegion>(null);
  const paymentSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [modalOpen]);

  async function copyPaymentDetail(value: string, key: CopyKey, label: string) {
    try {
      await navigator.clipboard.writeText(value);

      setCopiedItem(key);
      setCopiedLabel(label);

      window.setTimeout(() => {
        setCopiedItem(null);
        setCopiedLabel("");
      }, 2200);
    } catch (error) {
      console.error("Unable to copy payment detail:", error);
    }
  }

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setCopiedItem(null);
    setCopiedLabel("");
    setOpenRegion(null);
  }


  function scrollToPaymentMethods() {
    setOpenRegion((current) => current ?? "north-america");

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        paymentSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }


  return (
    <section id="registry" className="registry">
      <div className="registry-background" aria-hidden="true">
        <motion.div
          className="registry-floating-gift registry-gift-one"
          animate={{
            y: [0, -18, 0],
            rotate: [0, 4, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Gift />
        </motion.div>

        <motion.div
          className="registry-floating-gift registry-gift-two"
          animate={{
            y: [0, 16, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7,
          }}
        >
          <Gift />
        </motion.div>

        <motion.div
          className="registry-floating-sparkle registry-sparkle-one"
          animate={{
            opacity: [0.25, 0.75, 0.25],
            scale: [0.9, 1.15, 0.9],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles />
        </motion.div>

        <motion.div
          className="registry-floating-sparkle registry-sparkle-two"
          animate={{
            opacity: [0.2, 0.65, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Sparkles />
        </motion.div>
      </div>

      <div className="registry-overlay" />

      <div className="registry-container">
        <motion.header
          className="registry-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="section-tag">Registry</span>

          <h2 className="section-title">
            Your Presence Is
            <br />
            Our Greatest Gift
          </h2>

          <p>
            Celebrating this special day with you means more to us than words
            can express. For those who would like to bless our new beginning
            further, we have provided one meaningful option below.
          </p>
        </motion.header>

        <div className="registry-grid registry-grid-single">
          <motion.article
            className="registry-card"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="registry-card-number">01</div>

            <motion.div
              className="registry-icon"
              whileHover={{
                rotate: 6,
                scale: 1.08,
              }}
              transition={{ duration: 0.3 }}
            >
              <Plane size={27} strokeWidth={1.3} />
            </motion.div>

            <h3>Honeymoon Fund</h3>

            <p>
              Help us create beautiful memories as we begin our first adventure
              together as husband and wife.
            </p>

            <button
              type="button"
              className="registry-link"
              onClick={openModal}
              aria-label="Contribute to our honeymoon fund"
            >
              Contribute
              <ExternalLink size={15} />
            </button>
          </motion.article>
        </div>

        <motion.p
          className="registry-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Thank you for your love, generosity and prayers as we begin this new
          chapter together.
        </motion.p>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="registry-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            role="presentation"
          >
            <motion.div
              className="registry-gift-modal"
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.32,
                ease: "easeOut",
              }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="registry-modal-title"
            >
              <button
                type="button"
                className="registry-modal-close"
                onClick={closeModal}
                aria-label="Close honeymoon fund"
              >
                <X size={21} />
              </button>

              <div className="registry-modal-heading">
                <span className="section-tag">Honeymoon Fund</span>

                <h2 id="registry-modal-title">
                  Help Us Create Beautiful Memories
                </h2>

                <p>
                  As we begin this new chapter together, your generosity can
                  help us create unforgettable memories on our honeymoon and
                  bless the beginning of our marriage.
                </p>
              </div>

              <motion.div
                className="honeymoon-experience-grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
              >
                <div
                  className="honeymoon-experience-card honeymoon-experience-card-clickable"
                  role="button"
                  tabIndex={0}
                  onClick={scrollToPaymentMethods}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      scrollToPaymentMethods();
                    }
                  }}
                  aria-label="View ways to contribute"
                >
                  <div className="honeymoon-card-header">
                    <div className="honeymoon-icon icon-journey">
                      <Plane size={20} strokeWidth={1.8} />
                    </div>

                    <h3>Our Journey</h3>
                  </div>

                  <p>Contribute toward our flights and travel.</p>
                </div>

                <div
                  className="honeymoon-experience-card honeymoon-experience-card-clickable"
                  role="button"
                  tabIndex={0}
                  onClick={scrollToPaymentMethods}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      scrollToPaymentMethods();
                    }
                  }}
                  aria-label="View ways to contribute"
                >
                  <div className="honeymoon-card-header">
                    <div className="honeymoon-icon icon-stay">
                      <Hotel size={20} strokeWidth={1.8} />
                    </div>

                    <h3>Our Stay</h3>
                  </div>

                  <p>Help make our honeymoon accommodation extra special.</p>
                </div>

                <div
                  className="honeymoon-experience-card honeymoon-experience-card-clickable"
                  role="button"
                  tabIndex={0}
                  onClick={scrollToPaymentMethods}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      scrollToPaymentMethods();
                    }
                  }}
                  aria-label="View ways to contribute"
                >
                  <div className="honeymoon-card-header">
                    <div className="honeymoon-icon icon-dinner">
                      <UtensilsCrossed size={20} strokeWidth={1.8} />
                    </div>

                    <h3>Romantic Dinner</h3>
                  </div>

                  <p>Bless us with a beautiful dinner for two.</p>
                </div>

                <div
                  className="honeymoon-experience-card honeymoon-experience-card-clickable"
                  role="button"
                  tabIndex={0}
                  onClick={scrollToPaymentMethods}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      scrollToPaymentMethods();
                    }
                  }}
                  aria-label="View ways to contribute"
                >
                  <div className="honeymoon-card-header">
                    <div className="honeymoon-icon icon-experience">
                      <Camera size={20} strokeWidth={1.8} />
                    </div>

                    <h3>Honeymoon Experience</h3>
                  </div>

                  <p>Contribute toward an excursion or memorable experience.</p>
                </div>

                <div
                  className="honeymoon-experience-card honeymoon-experience-card-clickable"
                  role="button"
                  tabIndex={0}
                  onClick={scrollToPaymentMethods}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      scrollToPaymentMethods();
                    }
                  }}
                  aria-label="View ways to contribute"
                >
                  <div className="honeymoon-card-header">
                    <div className="honeymoon-icon icon-adventure">
                      <Compass size={20} strokeWidth={1.8} />
                    </div>

                    <h3>A Little Extra Adventure</h3>
                  </div>

                  <p>
                    Help us explore, discover and enjoy something unexpected.
                  </p>
                </div>

                <div
                  className="honeymoon-experience-card honeymoon-monetary-card honeymoon-experience-card-clickable"
                  role="button"
                  tabIndex={0}
                  onClick={scrollToPaymentMethods}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      scrollToPaymentMethods();
                    }
                  }}
                  aria-label="View ways to give a monetary gift"
                >
                  <div className="honeymoon-card-header">
                    <div className="honeymoon-icon icon-gift">
                      <Gift size={20} strokeWidth={1.8} />
                    </div>

                    <h3>Monetary Gift</h3>
                  </div>

                  <p>
                    Prefer to simply bless our new beginning? A monetary gift
                    will help us create beautiful memories and begin married
                    life with gratitude.
                  </p>
                </div>
              </motion.div>

              <div ref={paymentSectionRef} className="registry-payment-section">
                <div className="registry-payment-header">
                  <Sparkles size={18} strokeWidth={1.4} />

                  <h3>Ways to Bless Our Journey</h3>

                  <p>
                    Please choose the contribution method that is most
                    convenient for your location.
                  </p>
                </div>

                <div className="registry-payment-accordion">
                  <div className="registry-payment-group">
                    <button
                      type="button"
                      className="registry-payment-group-toggle"
                      onClick={() =>
                        setOpenRegion((current) =>
                          current === "north-america" ? null : "north-america",
                        )
                      }
                      aria-expanded={openRegion === "north-america"}
                      aria-controls="north-america-payment-options"
                    >
                      <div className="registry-payment-group-toggle-copy">
                        <span className="registry-payment-group-toggle-number">
                          01
                        </span>

                        <span className="registry-payment-group-toggle-text">
                          <strong>United States &amp; Canada</strong>
                          <small>Cash App, Zelle and Interac e-Transfer</small>
                        </span>
                      </div>

                      <ChevronDown
                        size={21}
                        className="registry-payment-chevron"
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {openRegion === "north-america" && (
                        <motion.div
                          id="north-america-payment-options"
                          className="registry-payment-group-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="registry-payment-group-content-inner">
                            <div className="registry-payment-grid">
                              <a
                                href="https://cash.app/$jpbydesign"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="registry-payment-card registry-payment-link"
                              >
                                <PaymentBadge label="$" />

                                <div className="registry-payment-info">
                                  <h4>Cash App</h4>
                                  <p>$jpbydesign</p>
                                </div>

                                <ExternalLink
                                  className="registry-payment-side-icon"
                                  size={18}
                                />
                              </a>

                              <a
                                href="mailto:paulkbquartey@gmail.com?subject=Zelle%20Contribution%20Details"
                                className="registry-payment-card registry-payment-link"
                              >
                                <PaymentBadge label="Z" />

                                <div className="registry-payment-info">
                                  <h4>Zelle</h4>
                                  <p>Details provided upon request</p>
                                </div>

                                <span className="registry-contact-action">
                                  <Mail size={16} />
                                  Contact
                                </span>
                              </a>

                              <div className="registry-payment-card">
                                <PaymentBadge label="E" />

                                <div className="registry-payment-info">
                                  <h4>Interac e-Transfer</h4>
                                  <p>paulkbquartey@gmail.com</p>
                                </div>

                                <CopyButton
                                  copied={copiedItem === "interac"}
                                  onClick={() =>
                                    copyPaymentDetail(
                                      "paulkbquartey@gmail.com",
                                      "interac",
                                      "Interac email",
                                    )
                                  }
                                  ariaLabel="Copy Interac e-Transfer email"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="registry-payment-group">
                    <button
                      type="button"
                      className="registry-payment-group-toggle"
                      onClick={() =>
                        setOpenRegion((current) =>
                          current === "international" ? null : "international",
                        )
                      }
                      aria-expanded={openRegion === "international"}
                      aria-controls="international-payment-options"
                    >
                      <div className="registry-payment-group-toggle-copy">
                        <span className="registry-payment-group-toggle-number">
                          02
                        </span>

                        <span className="registry-payment-group-toggle-text">
                          <strong>International Guests</strong>
                          <small>Bank Transfer, PayPal and MTN Mobile Money</small>
                        </span>
                      </div>

                      <ChevronDown
                        size={21}
                        className="registry-payment-chevron"
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {openRegion === "international" && (
                        <motion.div
                          id="international-payment-options"
                          className="registry-payment-group-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="registry-payment-group-content-inner">
                            <div className="registry-payment-grid">
                              <a
                                href="mailto:paulkbquartey@gmail.com?subject=Bank%20Transfer%20Contribution%20Details"
                                className="registry-payment-card registry-payment-link"
                              >
                                <PaymentBadge label="B" />

                                <div className="registry-payment-info">
                                  <h4>Bank Transfer</h4>
                                  <p>Details provided upon request</p>
                                </div>

                                <span className="registry-contact-action">
                                  <Mail size={16} />
                                  Contact
                                </span>
                              </a>

                              <div className="registry-payment-card registry-paypal-card">
                                <PaymentBadge label="P" />

                                <div className="registry-payment-info registry-paypal-info">
                                  <h4>PayPal</h4>

                                  <PaymentAccount
                                    number="1."
                                    value="flayar7@gmail.com"
                                    copied={copiedItem === "paypal-primary"}
                                    onCopy={() =>
                                      copyPaymentDetail(
                                        "flayar7@gmail.com",
                                        "paypal-primary",
                                        "PayPal email",
                                      )
                                    }
                                  />

                                  <PaymentAccount
                                    number="2."
                                    value="owusuj.official@gmail.com"
                                    copied={copiedItem === "paypal-secondary"}
                                    onCopy={() =>
                                      copyPaymentDetail(
                                        "owusuj.official@gmail.com",
                                        "paypal-secondary",
                                        "PayPal email",
                                      )
                                    }
                                  />
                                </div>
                              </div>

                              <div className="registry-payment-card">
                                <PaymentBadge label="M" />

                                <div className="registry-payment-info">
                                  <h4>MTN Mobile Money</h4>
                                  <p>0540319184</p>
                                </div>

                                <CopyButton
                                  copied={copiedItem === "mtn"}
                                  onClick={() =>
                                    copyPaymentDetail(
                                      "0540319184",
                                      "mtn",
                                      "Mobile Money number",
                                    )
                                  }
                                  ariaLabel="Copy MTN Mobile Money number"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="registry-gratitude-card">
                <Sparkles size={18} strokeWidth={1.3} />

                <span>With Grateful Hearts</span>

                <p>
                  Your presence at our wedding is the greatest gift we could ask
                  for. Thank you for celebrating this beautiful season with us
                  and for blessing the beginning of our journey together.
                </p>

                <strong>Paul &amp; Jozzy</strong>
              </div>

              <AnimatePresence>
                {copiedLabel && (
                  <motion.div
                    className="registry-copy-toast"
                    initial={{
                      opacity: 0,
                      y: 18,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 12,
                      scale: 0.96,
                    }}
                  >
                    <span>
                      <Check size={15} />
                    </span>

                    <div>
                      <strong>Copied to Clipboard</strong>
                      <p>{copiedLabel} copied successfully.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PaymentBadge({ label }: { label: string }) {
  return <span className="registry-payment-badge">{label}</span>;
}

interface CopyButtonProps {
  copied: boolean;
  onClick: () => void;
  ariaLabel: string;
}

function CopyButton({ copied, onClick, ariaLabel }: CopyButtonProps) {
  return (
    <motion.button
      type="button"
      className={`registry-copy-button ${
        copied ? "registry-copy-button-copied" : ""
      }`}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      aria-label={ariaLabel}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            <Check size={15} />
            <em>Copied</em>
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            <Copy size={15} />
            <em>Copy</em>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

interface PaymentAccountProps {
  number: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}

function PaymentAccount({
  number,
  value,
  copied,
  onCopy,
}: PaymentAccountProps) {
  return (
    <div className="registry-paypal-account">
      <div className="registry-paypal-address">
        <span>{number}</span>
        <p>{value}</p>
      </div>

      <CopyButton
        copied={copied}
        onClick={onCopy}
        ariaLabel={`Copy ${value}`}
      />
    </div>
  );
}
