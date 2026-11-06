"use client";

import { useEffect, useRef, useState } from "react";

export function Soundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const volume = 0.4;
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const thunderTimerRef = useRef<number | null>(null);

  // Initialize synthesized soothing Kerala rain audio using Web Audio API
  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Synthesize Pink Noise for Rainfall
      const bufferSize = ctx.sampleRate * 4;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      noiseSourceRef.current = whiteNoise;

      // Filter 1: Rain on leaves and clay tiles (bandpass & lowpass)
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(1400, ctx.currentTime);

      const highpass = ctx.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.setValueAtTime(180, ctx.currentTime);

      whiteNoise.connect(lowpass);
      lowpass.connect(highpass);
      highpass.connect(masterGain);
      whiteNoise.start();

      // Subtle occasional distant low rumble
      const triggerThunder = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === "closed") return;
        try {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          const oscFilter = ctx.createBiquadFilter();

          osc.type = "sine";
          osc.frequency.setValueAtTime(45, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(28, ctx.currentTime + 3.5);

          oscFilter.type = "lowpass";
          oscFilter.frequency.setValueAtTime(80, ctx.currentTime);

          oscGain.gain.setValueAtTime(0, ctx.currentTime);
          oscGain.gain.linearRampToValueAtTime(0.06 * volume, ctx.currentTime + 1.2);
          oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);

          osc.connect(oscFilter);
          oscFilter.connect(oscGain);
          oscGain.connect(masterGain);

          osc.start();
          osc.stop(ctx.currentTime + 4.6);
        } catch {
          // ignore
        }

        const nextThunder = Math.random() * 18000 + 14000;
        thunderTimerRef.current = window.setTimeout(triggerThunder, nextThunder);
      };

      thunderTimerRef.current = window.setTimeout(triggerThunder, 6000);
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (thunderTimerRef.current) {
      clearTimeout(thunderTimerRef.current);
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.5);
        setTimeout(() => {
          if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
            audioCtxRef.current.close();
          }
          audioCtxRef.current = null;
          gainNodeRef.current = null;
        }, 550);
      } catch {
        // ignore
      }
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="soundscape-control" title={isPlaying ? "Mute monsoon sound" : "Listen to Rain Homestay monsoon ambience"}>
      <button
        type="button"
        className={`soundscape-btn ${isPlaying ? "is-playing" : ""}`}
        onClick={toggleSound}
        aria-label={isPlaying ? "Mute monsoon soundscape" : "Play ambient monsoon sound"}
      >
        <span className="sound-waves" aria-hidden="true">
          <span className="wave-bar bar-1" />
          <span className="wave-bar bar-2" />
          <span className="wave-bar bar-3" />
          <span className="wave-bar bar-4" />
        </span>
        <span className="sound-label">
          {isPlaying ? "Monsoon Audio · Live" : "Monsoon Ambience"}
        </span>
      </button>
    </div>
  );
}
