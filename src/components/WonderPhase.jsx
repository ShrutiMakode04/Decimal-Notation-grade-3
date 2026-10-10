import { useState, useEffect, useCallback, useRef } from 'react';
import { narrate, stopNarration } from '../utils/audio';
import { wonderNarration, wonderDiscoverNarration } from '../utils/narration';

export default function WonderPhase({ onComplete, audioEnabled }) {
  const [stage, setStage] = useState(0);
  const [particles, setParticles] = useState([]);
  const narrationRef = useRef(null);
  const [coinsDropped, setCoinsDropped] = useState(0);

  useEffect(() => {
    // Generate background particles
    const emojis = ["🪙", "💰", "💵", "✨", "💲"];
    const p = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      size: 1.2 + Math.random() * 1.5,
    }));
    setParticles(p);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 500);
    const t2 = setTimeout(() => setStage(2), 2000);
    const t3 = setTimeout(() => setStage(3), 5500); // Merges into price tag
    const t4 = setTimeout(() => setStage(4), 8000); // Question revealed
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  useEffect(() => {
    if (stage >= 2 && stage < 3) {
      const dropInterval = setInterval(() => {
        setCoinsDropped(prev => {
          if (prev >= 7) {
            clearInterval(dropInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 400); // drop a coin every 400ms
      return () => clearInterval(dropInterval);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 1 && audioEnabled) {
      narrationRef.current = narrate(wonderNarration(), true);
    }
    if (stage === 4 && audioEnabled) {
      narrationRef.current?.cancel();
      narrationRef.current = narrate(wonderDiscoverNarration(), true);
    }
  }, [stage, audioEnabled]);

  useEffect(() => {
    return () => narrationRef.current?.cancel();
  }, []);

  const handleDiscover = useCallback(() => {
    narrationRef.current?.cancel();
    stopNarration();
    onComplete();
  }, [onComplete]);

  return (
    <div className="wonder-phase">
      <div className="wonder-particles">
        {particles.map(p => (
          <span key={p.id} className="wonder-particle" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
            fontSize: `${p.size}rem`,
          }}>{p.emoji}</span>
        ))}
      </div>
      
      <div className="wonder-content">
        <div className={`wonder-mascot ${stage >= 1 ? 'visible' : ''}`}>
          <div className="mascot thinking">🤖</div>
          <div className="speech-bubble wonder-bubble">Hmm... I wonder... 🤔</div>
        </div>

        <div className={`wonder-question-card ${stage >= 1 ? 'visible' : ''}`} style={{ minHeight: '300px' }}>
          
          {/* Visual Area */}
          <div style={{ position: 'relative', height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
            
            {/* Piggy Bank */}
            <div style={{
              fontSize: '6rem', 
              transition: 'all 0.8s ease',
              transform: stage >= 3 ? 'scale(0) rotate(180deg)' : 'scale(1) rotate(0deg)',
              opacity: stage >= 3 ? 0 : 1,
              position: 'relative'
            }}>
              🐖
              {/* Dropping Coins */}
              {stage >= 2 && stage < 3 && Array.from({ length: coinsDropped }).map((_, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  top: '-80px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '2rem',
                  animation: 'dropCoin 0.4s ease-in forwards',
                  zIndex: -1
                }}>
                  {i < 4 ? '🪙' : '🪙'} {/* 4 dollars, 3 quarters */}
                </div>
              ))}
            </div>

            {/* Glowing Price Tag */}
            <div style={{
              position: 'absolute',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: stage >= 3 ? 'scale(1)' : 'scale(0)',
              opacity: stage >= 3 ? 1 : 0,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'linear-gradient(135deg, #1e1e50, #2d1b69)',
              padding: '16px 32px',
              borderRadius: '16px',
              border: '2px solid var(--gold)',
              boxShadow: '0 0 24px rgba(255, 193, 7, 0.4)'
            }}>
              <span style={{ fontSize: '2.5rem', color: 'var(--gold)' }}>$</span>
              <span style={{ fontSize: '3.5rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white' }}>4.75</span>
            </div>

          </div>

          <h2 className="wonder-question-text">
            {stage < 4 
              ? "Sarah has 4 one-dollar coins and 3 quarters in her piggy bank. Her friend says she has $4.75." 
              : "What does that funny dot in the middle mean?"}
          </h2>
          
        </div>

        <button className={`btn btn-wonder ${stage >= 4 ? 'visible' : ''}`} onClick={handleDiscover} id="discover-btn">
          <span className="wonder-btn-sparkle">✨</span>
          Let's Discover!
          <span className="wonder-btn-sparkle">✨</span>
        </button>
      </div>

      <style>{`
        @keyframes dropCoin {
          0% { transform: translate(-50%, -60px) scale(1); opacity: 0; }
          20% { transform: translate(-50%, -30px) scale(1); opacity: 1; }
          100% { transform: translate(-50%, 20px) scale(0.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
