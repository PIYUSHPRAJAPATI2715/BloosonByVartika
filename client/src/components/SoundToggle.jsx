import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Soft ambient audio synthesized using Web Audio API for a tranquil harp/chime feel
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const audioCtx = new AudioContext();
      let timer;

      if (isPlaying) {
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25]; // C E G B C E (Soft Pentatonic Harp)
        let noteIndex = 0;

        const playChime = () => {
          if (!isPlaying) return;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(notes[noteIndex % notes.length], audioCtx.currentTime);
          noteIndex++;

          gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.0);

          osc.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start();
          osc.stop(audioCtx.currentTime + 3.0);

          timer = setTimeout(playChime, 2500 + Math.random() * 2000);
        };

        playChime();
      }

      return () => {
        if (timer) clearTimeout(timer);
      };
    } catch (e) {
      console.warn("Audio Context setup skipped:", e);
    }
  }, [isPlaying]);

  return (
    <button
      onClick={() => setIsPlaying(!isPlaying)}
      title={isPlaying ? "Mute Ambient Sound" : "Play Luxury Ambient Chimes"}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 99,
        background: isPlaying ? 'rgba(200, 164, 93, 0.95)' : 'rgba(255, 255, 255, 0.85)',
        color: isPlaying ? '#FFFFFF' : '#2E2E2E',
        border: '1px solid rgba(200, 164, 93, 0.4)',
        padding: '10px 16px',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.82rem',
        fontWeight: '500',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
      }}
    >
      {isPlaying ? <Volume2 size={16} className="animate-pulse" /> : <VolumeX size={16} />}
      <span>{isPlaying ? 'Boutique Sound: ON' : 'Ambient Sound'}</span>
    </button>
  );
}
