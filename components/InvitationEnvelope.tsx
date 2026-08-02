"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./InvitationEnvelope.module.css";

const STORAGE_KEY = "pj-invitation-opened";

const HERO_REVEAL_DELAY = 6200;
const OPENER_REMOVE_DELAY = 8500;

export default function InvitationEnvelope() {
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);
  const [revealingHero, setRevealingHero] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const revealTimerRef = useRef<number | null>(null);
  const removeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem(STORAGE_KEY) === "true";

    if (alreadyOpened) {
      setVisible(false);
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";

      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current);
      }

      if (removeTimerRef.current !== null) {
        window.clearTimeout(removeTimerRef.current);
      }

      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  async function startMusic() {
    if (!audioRef.current) {
      audioRef.current = new Audio("/music/our-song.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.25;
      audioRef.current.preload = "auto";
    }

    try {
      // Start at 0.08 seconds
      audioRef.current.currentTime = 0.08;

      await audioRef.current.play();
    } catch (error) {
      console.error("Unable to start music:", error);
    }
  }

  async function openInvitation() {
    if (opening) return;

    setOpening(true);

    // Start the music immediately after the click
    await startMusic();

    revealTimerRef.current = window.setTimeout(() => {
      document.getElementById("home")?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });

      setRevealingHero(true);
    }, HERO_REVEAL_DELAY);

    removeTimerRef.current = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "true");
      document.body.style.overflow = "";
      setVisible(false);
    }, OPENER_REMOVE_DELAY);
  }

  if (!visible) return null;

  return (
    <div
      className={[
        styles.opener,
        opening ? styles.opening : "",
        revealingHero ? styles.revealingHero : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Paul and Jozzy wedding invitation"
    >
      <div className={styles.heroReveal} aria-hidden="true">
        <span className={styles.heroLightBurst} />
        <span className={styles.heroCurtain} />
      </div>

      <button
        type="button"
        className={styles.stage}
        onClick={openInvitation}
        disabled={opening}
        aria-label="Open Paul and Jozzy's wedding invitation"
      >
        <span className={styles.envelopeScene}>
          <span className={styles.shadow} aria-hidden="true" />

          <span className={styles.closedArtwork}>
            <Image
              src="/images/invitation-envelope.png"
              alt="Ivory and gold wedding envelope with Paul and Jozzy monogram"
              fill
              priority
              sizes="(max-width: 680px) 96vw, 860px"
            />
          </span>

          <span className={styles.envelopeStructure} aria-hidden="true">
            <span className={styles.backPanel} />

            <span className={styles.invitationCard}>
              <span className={styles.cardInner}>
                <Image
                  src="/images/pj-monogram.png"
                  alt=""
                  width={150}
                  height={150}
                  priority
                />

                <span>You Are Invited</span>
              </span>
            </span>

            <span className={styles.leftPocket} />
            <span className={styles.rightPocket} />
            <span className={styles.bottomPocket} />

            <span className={styles.flap}>
              <span className={styles.flapFace} />
            </span>

            <span className={styles.seal}>
              <Image
                src="/images/pj-monogram.png"
                alt=""
                width={100}
                height={100}
                priority
              />
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}
