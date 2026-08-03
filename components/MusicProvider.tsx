"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

const AUDIO_SOURCE = "/music/our-song.mp3";
const START_TIME = 0.08;
const TARGET_VOLUME = 0.25;
const FADE_IN_DURATION = 3000;
const FADE_OUT_DURATION = 1200;

type MusicContextValue = {
  startMusic: () => Promise<void>;
};

const MusicContext = createContext<MusicContextValue | null>(null);

function easeInOut(progress: number) {
  return progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
}

export function MusicProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const shouldResumeRef = useRef(false);
  const hasStartedRef = useRef(false);
  const isPageActiveRef = useRef(true);

  const stopFade = useCallback(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const fadeTo = useCallback(
    (
      targetVolume: number,
      duration: number,
      onComplete?: () => void,
    ) => {
      const audio = audioRef.current;

      if (!audio) return;

      stopFade();

      const initialVolume = audio.volume;
      const startedAt = performance.now();

      function animate(now: number) {
        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = easeInOut(progress);

        audio!.volume =
          initialVolume + (targetVolume - initialVolume) * easedProgress;

        if (progress < 1) {
          animationFrameRef.current = window.requestAnimationFrame(animate);
          return;
        }

        audio!.volume = targetVolume;
        animationFrameRef.current = null;
        onComplete?.();
      }

      animationFrameRef.current = window.requestAnimationFrame(animate);
    },
    [stopFade],
  );

  useEffect(() => {
    const audio = new Audio(AUDIO_SOURCE);

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;

    audioRef.current = audio;

    return () => {
      stopFade();
      audio.pause();
      audioRef.current = null;
    };
  }, [stopFade]);

  const resumeMusic = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || !hasStartedRef.current || !isPageActiveRef.current) {
      return;
    }

    try {
      audio.volume = 0;
      await audio.play();
      fadeTo(TARGET_VOLUME, FADE_IN_DURATION);
    } catch (error) {
      console.error("Unable to resume wedding music:", error);
    }
  }, [fadeTo]);

  const fadeOutAndPause = useCallback(() => {
    const audio = audioRef.current;

    if (!audio || audio.paused) return;

    shouldResumeRef.current = true;

    fadeTo(0, FADE_OUT_DURATION, () => {
      audio.pause();
    });
  }, [fadeTo]);

  const handlePageInactive = useCallback(() => {
    if (!isPageActiveRef.current) return;

    isPageActiveRef.current = false;
    fadeOutAndPause();
  }, [fadeOutAndPause]);

  const handlePageActive = useCallback(() => {
    if (document.hidden) return;

    isPageActiveRef.current = true;

    if (shouldResumeRef.current) {
      shouldResumeRef.current = false;
      void resumeMusic();
    }
  }, [resumeMusic]);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        handlePageInactive();
      } else {
        handlePageActive();
      }
    }

    function handlePageHide() {
      const audio = audioRef.current;

      if (audio && !audio.paused) {
        shouldResumeRef.current = true;
        stopFade();
        audio.volume = 0;
        audio.pause();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handlePageInactive);
    window.addEventListener("focus", handlePageActive);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handlePageInactive);
      window.removeEventListener("focus", handlePageActive);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [handlePageActive, handlePageInactive, stopFade]);

  const startMusic = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) return;

    stopFade();

    try {
      if (!hasStartedRef.current) {
        audio.currentTime = START_TIME;
        hasStartedRef.current = true;
      }

      isPageActiveRef.current = !document.hidden;
      shouldResumeRef.current = false;
      audio.volume = 0;

      await audio.play();
      fadeTo(TARGET_VOLUME, FADE_IN_DURATION);
    } catch (error) {
      console.error("Unable to start wedding music:", error);
    }
  }, [fadeTo, stopFade]);

  return (
    <MusicContext.Provider value={{ startMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error("useMusic must be used inside MusicProvider.");
  }

  return context;
}
