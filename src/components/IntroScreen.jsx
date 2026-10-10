import { useEffect, useRef, useState } from 'react';
import { narrate, stopNarration } from '../utils/audio';
import { introNarration } from '../utils/narration';

const JOURNEY_PHASES = [
  { icon: '🔍', label: 'Wonder', desc: 'A decimal money mystery!' },
  { icon: '📖', label: 'Story', desc: 'See decimals in action' },
  { icon: '🧪', label: 'Simulate', desc: 'Build money amounts' },
  { icon: '🎮', label: 'Practice', desc: 'Gamified challenges' },
  { icon: '📓', label: 'Reflect', desc: 'What did you learn?' },
];

export default function IntroScreen({ onStart, audioEnabled, onToggleAudio }) {
  const narrationRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted && audioEnabled) {
      const timer = setTimeout(() => {
        narrationRef.current = narrate(introNarration(), true);
      }, 3000);
      return () => {
        clearTimeout(timer);
        narrationRef.current?.cancel();
        stopNarration();
      };
    }
  }, [audioEnabled, hasStarted]);

  const handleAction = () => {
    if (!hasStarted) {
      setHasStarted(true);
    } else {
      narrationRef.current?.cancel();
      stopNarration();
      onStart();
    }
  };

  return (
    <div className="intro-screen">
      {/* Curriculum badge */}
      <div className="intro-badge">
        ✨  · Grade 3 Maths
      </div>

      {/* Title */}
      <h1 className="intro-title">
        <span style={{ color: 'var(--gold)' }}>Decimal Notation</span>{' '}—{' '}
        <span style={{ color: 'var(--coral)' }}>For Money</span>
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: 4, fontFamily: 'var(--font-display)' }}>
        Introduction to Decimal Money
      </p>

      {/* Mascot */}
      <div className="mascot-container">
        <div className="mascot">🤖</div>
        <div className="speech-bubble" style={{ fontSize: '1.2rem', maxWidth: '300px' }}>
          Let's explore decimal notation! 💰
        </div>
      </div>

      {/* Description */}
      <p className="intro-desc" style={{ fontSize: '1.3rem', maxWidth: '600px', lineHeight: '1.6' }}>
        Learn to write <strong style={{ color: 'var(--gold)' }}>money</strong> using decimal points, build amounts with coins, and discover how to read price tags!
      </p>

      {/* Journey map */}
      <div className="intro-journey-map">
        <h3 className="intro-journey-title">Your Learning Journey</h3>
        <div className="intro-journey-steps">
          {JOURNEY_PHASES.map((p, i) => (
            <div key={i} className="intro-journey-step">
              <div className="intro-journey-icon">{p.icon}</div>
              <div className="intro-journey-info">
                <div className="intro-journey-label">{p.label}</div>
                <div className="intro-journey-desc">{p.desc}</div>
              </div>
              {i < JOURNEY_PHASES.length - 1 && <div className="intro-journey-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button className="btn btn-primary btn-lg intro-start-btn" onClick={handleAction} id="start-journey-btn">
        {hasStarted ? '🚀 Begin Your Journey!' : '▶️ Start Learning'}
      </button>

      {/* Feature cards */}
      <div className="feature-cards">
        <div className="feature-card">
          <div className="feature-card-icon">🎯</div>
          <div className="feature-card-label">100 Challenges</div>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">💰</div>
          <div className="feature-card-label">Decimal Money</div>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">✨</div>
          <div className="feature-card-label">Badges & XP</div>
        </div>
      </div>
    </div>
  );
}
