import React, { useState, useCallback, useEffect, useRef } from 'react';
import { narrate, stopNarration, sounds } from '../utils/audio';
import { celebrate, cheer, say } from '../utils/audio';
import PlaceValueChart from './PlaceValueChart';
import { simulateStation1Intro, simulateStation2Intro, simulateStation3Intro, simulateStation4Intro, simulateStation5Intro } from '../utils/narration';

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const STATIONS = [
  { id: 0, title: 'Coin Counter', subtitle: 'Concrete Grouping', icon: '🪙' },
  { id: 1, title: 'Build Decimal', subtitle: 'Pictorial Recognition', icon: '🔢' },
  { id: 2, title: 'Price Match', subtitle: 'Abstract Math', icon: '🏷️' },
  { id: 3, title: 'Shopping Cart', subtitle: 'Decimal Addition', icon: '🛒' },
  { id: 4, title: 'Order by Price', subtitle: 'Decimal Sorting', icon: '📊' },
];

// ═══════════════════════════════════════════════════
// STATION 1: Coin Counter (Concrete)
// ═══════════════════════════════════════════════════
function Station1({ audioEnabled, onNext }) {
  const [targetCents, setTargetCents] = useState(0);
  const [trayItems, setTrayItems] = useState([]);
  const [round, setRound] = useState(0);
  const [done, setDone] = useState(false);
  const narRef = useRef(null);
  
  const pool = [
    { denom: '1¢', valueCents: 1 },
    { denom: '5¢', valueCents: 5 },
    { denom: '10¢', valueCents: 10 },
    { denom: '25¢', valueCents: 25 },
    { denom: '$1', valueCents: 100 },
    { denom: '$5', valueCents: 500 },
  ];

  useEffect(() => {
    const targets = [235, 465, 720]; // 2.35, 4.65, 7.20
    setTargetCents(targets[round]);
    setTrayItems([]);
    setDone(false);
  }, [round]);

  useEffect(() => {
    if (audioEnabled) {
      narRef.current = narrate(simulateStation1Intro(), true);
    }
    return () => { narRef.current?.cancel(); };
  }, [audioEnabled]);

  const runningTotalCents = trayItems.reduce((sum, item) => sum + item.valueCents, 0);

  const handleDrop = (item) => {
    if (done) return;
    sounds.click();
    setTrayItems(prev => [...prev, item]);
  };
  
  const handleCheck = () => {
    if (runningTotalCents === targetCents) {
      setDone(true);
      sounds.correct();
      narRef.current?.cancel();
      if (audioEnabled) {
        narRef.current = narrate([
          celebrate(`Perfect! You made exactly $${(targetCents/100).toFixed(2)}!`),
        ], true);
      }
    } else {
      sounds.wrong();
      narRef.current?.cancel();
      if (audioEnabled) {
        narRef.current = narrate([cheer("So close! Check your total again.")], true);
      }
    }
  };

  const handleClear = () => {
    setTrayItems([]);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="station-header"><h2>🪙 The Coin Counter</h2></div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
        Drop coins and notes into the tray to make exactly <strong style={{ color: 'var(--gold)' }}>${(targetCents/100).toFixed(2)}</strong>!
      </p>

      {/* Target & Running Total */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Target</div>
          <div style={{ fontSize: '2rem', color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>${(targetCents/100).toFixed(2)}</div>
        </div>
        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Current Total</div>
          <div style={{ fontSize: '2rem', color: done ? 'var(--green)' : 'white', fontFamily: 'var(--font-display)' }}>${(runningTotalCents/100).toFixed(2)}</div>
        </div>
      </div>

      {/* Pool */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
        {pool.map((item, i) => (
          <button key={i} onClick={() => handleDrop(item)} className="btn btn-outline" style={{ minWidth: '60px', padding: '10px' }}>
            {item.denom}
          </button>
        ))}
      </div>

      {/* Tray */}
      <div style={{ minHeight: '120px', background: 'rgba(0,0,0,0.2)', border: '2px dashed rgba(255,255,255,0.3)', borderRadius: '16px', padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        {trayItems.length === 0 ? <span style={{ color: 'var(--text-muted)' }}>Tap a coin or note to add to tray</span> : 
         trayItems.map((item, i) => (
           <div 
             key={i} 
             onClick={() => { if (!done) { sounds.click(); setTrayItems(prev => prev.filter((_, idx) => idx !== i)); } }}
             style={{ padding: '8px 12px', background: 'var(--gold)', color: '#000', borderRadius: '50%', fontWeight: 'bold', cursor: done ? 'default' : 'pointer', transition: 'transform 0.2s ease' }}
             onMouseEnter={(e) => { if (!done) e.currentTarget.style.transform = 'scale(1.1)'; }}
             onMouseLeave={(e) => { if (!done) e.currentTarget.style.transform = 'scale(1)'; }}
             title="Click to remove"
           >
             {item.denom}
           </div>
         ))
        }
      </div>
      
      {!done ? (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={handleClear} disabled={trayItems.length === 0}>Clear All</button>
            <button className="btn btn-primary" onClick={handleCheck} disabled={trayItems.length === 0}>Check Total</button>
        </div>
      ) : (
        <div style={{ animation: 'bounceIn 0.5s' }}>
          <button className={`btn ${round < 2 ? 'btn-outline' : 'btn-primary'}`} onClick={() => round < 2 ? setRound(r => r + 1) : onNext()}>
            {round < 2 ? 'Try Another →' : 'Next Station →'}
          </button>
        </div>
      )}

      <div style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Round {Math.min(round + 1, 3)} / 3</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// STATION 2: Build Decimal (Pictorial)
// ═══════════════════════════════════════════════════
function Station2({ audioEnabled, onNext }) {
  const [round, setRound] = useState(0);
  const [targetCents, setTargetCents] = useState(0);
  const [placed, setPlaced] = useState({ dollars: null, tenths: null, hundredths: null });
  const [done, setDone] = useState(false);
  const narRef = useRef(null);

  const targets = [300, 540, 805]; // $3.00, $5.40, $8.05
  
  useEffect(() => {
    setTargetCents(targets[round]);
    setPlaced({ dollars: null, tenths: null, hundredths: null });
    setDone(false);
  }, [round]);

  useEffect(() => {
    if (audioEnabled) {
      narRef.current = narrate(simulateStation2Intro(), true);
    }
    return () => { narRef.current?.cancel(); };
  }, [audioEnabled]);

  const reqDollars = Math.floor(targetCents / 100);
  const reqTenths = Math.floor((targetCents % 100) / 10);
  const reqHundredths = (targetCents % 10);

  const handlePlace = (col, val) => {
    if (done) return;
    setPlaced(prev => ({ ...prev, [col]: val }));
  };

  const handleCheck = () => {
    if (placed.dollars === reqDollars && placed.tenths === reqTenths && placed.hundredths === reqHundredths) {
      setDone(true);
      sounds.correct();
      narRef.current?.cancel();
    } else {
      sounds.wrong();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="station-header"><h2>🔢 Build the Decimal</h2></div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
        Build <strong style={{ color: 'var(--gold)' }}>${(targetCents/100).toFixed(2)}</strong> in the place value chart!
      </p>

      {/* Manual Place Value Display */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button className="btn btn-outline" style={{ width: '80px', height: '80px', fontSize: '2rem' }} onClick={() => handlePlace('dollars', reqDollars)}>{placed.dollars !== null ? placed.dollars : '?'}</button>
          <div style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>Dollars</div>
        </div>
        <div style={{ fontSize: '4rem', color: 'var(--gold)', fontWeight: 'bold', lineHeight: '1' }}>.</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button className="btn btn-outline" style={{ width: '80px', height: '80px', fontSize: '2rem' }} onClick={() => handlePlace('tenths', reqTenths)}>{placed.tenths !== null ? placed.tenths : '?'}</button>
          <div style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>Tenths</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button className="btn btn-outline" style={{ width: '80px', height: '80px', fontSize: '2rem' }} onClick={() => handlePlace('hundredths', reqHundredths)}>{placed.hundredths !== null ? placed.hundredths : '?'}</button>
          <div style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>Hundredths</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
         <span style={{ color: 'var(--text-muted)' }}>Tap the empty boxes to auto-fill (Drag and drop mock)</span>
      </div>

      {!done ? (
        <button className="btn btn-primary" onClick={handleCheck}>Check Chart</button>
      ) : (
        <div style={{ marginTop: 20, animation: 'bounceIn 0.5s' }}>
          <div style={{ marginBottom: '20px' }}>
            <PlaceValueChart amountCents={targetCents} animated={true} />
          </div>
          <button className={`btn ${round < 2 ? 'btn-outline' : 'btn-primary'}`} onClick={() => round < 2 ? setRound(r => r + 1) : onNext()}>
            {round < 2 ? 'Try Another →' : 'Next Station →'}
          </button>
        </div>
      )}
      <div style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Round {Math.min(round + 1, 3)} / 3</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// STATION 3: Price Tag Match-Up (Abstract)
// ═══════════════════════════════════════════════════
function Station3({ audioEnabled, onNext }) {
  const [round, setRound] = useState(0);
  const [tagA, setTagA] = useState(0);
  const [tagB, setTagB] = useState(0);
  const [answered, setAnswered] = useState(false);
  const narRef = useRef(null);

  useEffect(() => {
    // 3 rounds: Compare, Compare, Compare (simpler mock for TRD abstract)
    const tags = [
      { a: 340, b: 304, correct: 'a' }, // $3.40 vs $3.04
      { a: 520, b: 502, correct: 'a' }, // $5.20 vs $5.02
      { a: 819, b: 891, correct: 'b' }, // $8.19 vs $8.91
    ];
    setTagA(tags[round].a);
    setTagB(tags[round].b);
    setAnswered(false);
  }, [round]);

  useEffect(() => {
    if (audioEnabled) {
      narRef.current = narrate(simulateStation3Intro(), true);
    }
    return () => { narRef.current?.cancel(); };
  }, [audioEnabled]);

  const handleSelect = (selected) => {
    if (answered) return;
    const correct = tagA > tagB ? 'a' : 'b';
    if (selected === correct) {
      setAnswered(true);
      sounds.correct();
      narRef.current?.cancel();
    } else {
      sounds.wrong();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="station-header"><h2>🏷️ Price Tag Match-Up</h2></div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
        Tap the <strong style={{ color: 'var(--gold)' }}>greater</strong> amount!
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
        <div 
          onClick={() => handleSelect('a')}
          style={{ padding: '40px', background: answered && tagA > tagB ? 'var(--green)' : 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '16px', fontSize: '2rem', cursor: 'pointer', fontFamily: 'var(--font-display)', minWidth: '150px' }}>
          ${(tagA/100).toFixed(2)}
        </div>
        <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>vs</div>
        <div 
          onClick={() => handleSelect('b')}
          style={{ padding: '40px', background: answered && tagB > tagA ? 'var(--green)' : 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '16px', fontSize: '2rem', cursor: 'pointer', fontFamily: 'var(--font-display)', minWidth: '150px' }}>
          ${(tagB/100).toFixed(2)}
        </div>
      </div>

      {answered && (
        <div style={{ marginTop: 24, animation: 'bounceIn 0.5s' }}>
          {round < 2 ? (
            <button className="btn btn-outline" onClick={() => setRound(r => r + 1)}>Try Another →</button>
          ) : (
            <button className="btn btn-primary" onClick={onNext}>Next Station →</button>
          )}
        </div>
      )}

      <div style={{ marginTop: 24, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Round {Math.min(round + 1, 3)} / 3</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// STATION 4: Shopping Cart Total (Addition)
// ═══════════════════════════════════════════════════
function Station4({ audioEnabled, onNext }) {
  const [round, setRound] = useState(0);
  const [itemA, setItemA] = useState({ name: 'Apple', price: 0, icon: '🍎' });
  const [itemB, setItemB] = useState({ name: 'Banana', price: 0, icon: '🍌' });
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const narRef = useRef(null);

  useEffect(() => {
    const rounds = [
      { a: { n: 'Apple', p: 120, i: '🍎' }, b: { n: 'Banana', p: 75, i: '🍌' } }, // $1.20 + $0.75 = $1.95
      { a: { n: 'Juice', p: 250, i: '🧃' }, b: { n: 'Cookie', p: 130, i: '🍪' } }, // $2.50 + $1.30 = $3.80
      { a: { n: 'Book', p: 540, i: '📘' }, b: { n: 'Pencil', p: 125, i: '✏️' } }, // $5.40 + $1.25 = $6.65
    ];
    const r = rounds[round];
    setItemA({ name: r.a.n, price: r.a.p, icon: r.a.i });
    setItemB({ name: r.b.n, price: r.b.p, icon: r.b.i });
    const correct = r.a.p + r.b.p;
    setOptions([correct, correct + 100, correct - 10].sort(() => Math.random() - 0.5));
    setAnswered(false);
  }, [round]);

  useEffect(() => {
    if (audioEnabled) {
      narRef.current = narrate(simulateStation4Intro(), true);
    }
    return () => { narRef.current?.cancel(); };
  }, [audioEnabled]);

  const handleSelect = (selectedCents) => {
    if (answered) return;
    const correctCents = itemA.price + itemB.price;
    if (selectedCents === correctCents) {
      setAnswered(true);
      sounds.correct();
      narRef.current?.cancel();
    } else {
      sounds.wrong();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="station-header"><h2>🛒 Shopping Cart Total</h2></div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
        Find the total cost of the {itemA.name} and {itemB.name}!
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '1.2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem' }}>{itemA.icon}</div>
          <div style={{ marginTop: '8px', fontWeight: 'bold' }}>${(itemA.price/100).toFixed(2)}</div>
        </div>
        <div style={{ fontSize: '2rem', color: 'var(--gold)' }}>+</div>
        <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '1.2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem' }}>{itemB.icon}</div>
          <div style={{ marginTop: '8px', fontWeight: 'bold' }}>${(itemB.price/100).toFixed(2)}</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
        {options.map((opt, i) => (
          <button 
            key={i} 
            className="btn btn-outline" 
            style={{ fontSize: '1.5rem', background: answered && opt === itemA.price + itemB.price ? 'var(--green)' : 'transparent' }}
            onClick={() => handleSelect(opt)}
          >
            ${(opt/100).toFixed(2)}
          </button>
        ))}
      </div>

      {answered && (
        <div style={{ marginTop: 24, animation: 'bounceIn 0.5s' }}>
          {round < 2 ? (
            <button className="btn btn-outline" onClick={() => setRound(r => r + 1)}>Try Another →</button>
          ) : (
            <button className="btn btn-primary" onClick={onNext}>Next Station →</button>
          )}
        </div>
      )}

      <div style={{ marginTop: 24, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Round {Math.min(round + 1, 3)} / 3</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// STATION 5: Order by Price (Sorting)
// ═══════════════════════════════════════════════════
function Station5({ audioEnabled, onComplete }) {
  const [round, setRound] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [done, setDone] = useState(false);
  const narRef = useRef(null);

  useEffect(() => {
    const rounds = [
      [{ val: 150, icon: '🍔' }, { val: 105, icon: '🍟' }, { val: 155, icon: '🥤' }],
      [{ val: 420, icon: '📓' }, { val: 402, icon: '✏️' }, { val: 425, icon: '📏' }],
      [{ val: 99, icon: '🍎' }, { val: 101, icon: '🍌' }, { val: 110, icon: '🍇' }],
    ];
    const shuffled = [...rounds[round]].map((item, i) => ({ id: i, ...item })).sort(() => Math.random() - 0.5);
    setTags(shuffled);
    setSelectedOrder([]);
    setDone(false);
  }, [round]);

  useEffect(() => {
    if (audioEnabled) {
      narRef.current = narrate(simulateStation5Intro(), true);
    }
    return () => { narRef.current?.cancel(); };
  }, [audioEnabled]);

  const handleSelect = (tag) => {
    if (done || selectedOrder.find(t => t.id === tag.id)) return;
    sounds.click();
    const newOrder = [...selectedOrder, tag];
    setSelectedOrder(newOrder);
    
    if (newOrder.length === 3) {
      const isSorted = newOrder[0].val < newOrder[1].val && newOrder[1].val < newOrder[2].val;
      setDone(true);
      if (isSorted) {
        sounds.correct();
        narRef.current?.cancel();
      } else {
        sounds.wrong();
      }
    }
  };

  const handleRemove = (index) => {
    if (done) return;
    sounds.click();
    setSelectedOrder(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setSelectedOrder([]);
    setDone(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="station-header"><h2>📊 Order by Price</h2></div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
        Tap the prices in order from <strong style={{ color: 'var(--gold)' }}>cheapest</strong> to <strong style={{ color: 'var(--gold)' }}>most expensive</strong>!
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} 
            onClick={() => selectedOrder[i] && handleRemove(i)}
            style={{ 
            width: '130px', height: '90px', 
            border: '2px dashed rgba(255,255,255,0.2)', 
            borderRadius: '12px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', fontFamily: 'var(--font-display)',
            background: selectedOrder[i] ? 'rgba(255,255,255,0.1)' : 'transparent',
            color: 'white',
            cursor: selectedOrder[i] && !done ? 'pointer' : 'default',
            transition: 'transform 0.2s'
          }}>
            {selectedOrder[i] ? (
              <>
                <div style={{ fontSize: '2rem' }}>{selectedOrder[i].icon}</div>
                <div>${(selectedOrder[i].val/100).toFixed(2)}</div>
              </>
            ) : '?'}
          </div>
        ))}
      </div>
      
      {/* Help text for removing */}
      {!done && selectedOrder.length > 0 && (
         <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '-20px', marginBottom: '20px' }}>
           Tap a selected item above to remove it
         </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {tags.map(tag => {
          const isSelected = selectedOrder.find(t => t.id === tag.id);
          return (
            <button 
              key={tag.id}
              className="btn btn-outline"
              disabled={isSelected}
              style={{ 
                fontSize: '1.5rem', 
                padding: '12px 24px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                opacity: isSelected ? 0.3 : 1,
                transform: isSelected ? 'scale(0.95)' : 'scale(1)'
              }}
              onClick={() => handleSelect(tag)}
            >
              <div style={{ fontSize: '2rem', marginBottom: '4px' }}>{tag.icon}</div>
              <div>${(tag.val/100).toFixed(2)}</div>
            </button>
          );
        })}
      </div>

      {done && (
        <div style={{ marginTop: 24, animation: 'bounceIn 0.5s' }}>
          {selectedOrder[0].val < selectedOrder[1].val && selectedOrder[1].val < selectedOrder[2].val ? (
            round < 2 ? (
              <button className="btn btn-outline" onClick={() => setRound(r => r + 1)}>Next Question →</button>
            ) : (
              <button className="btn btn-primary btn-lg" onClick={onComplete}>🎉 Complete Simulation!</button>
            )
          ) : (
            <button className="btn btn-secondary" onClick={handleReset}>Try Again ↺</button>
          )}
        </div>
      )}

      <div style={{ marginTop: 24, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Round {Math.min(round + 1, 3)} / 3</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// Main SimulatePhase
// ═══════════════════════════════════════════════════
export default function SimulatePhase({ onComplete, audioEnabled }) {
  const [station, setStation] = useState(0);
  const nextStation = useCallback(() => { if (station < 4) setStation(s => s + 1); }, [station]);

  return (
    <div className="simulate-phase">
      <div className="simulate-header">
        <h3 className="simulate-label">🧪 Simulate</h3>
        <p className="simulate-sublabel">Explore and discover — no wrong answers!</p>
      </div>
      <div className="progress-dots">
        {STATIONS.map((s, i) => (
          <div key={i} className="simulate-dot-wrapper">
            <div className={`progress-dot ${i === station ? 'active' : i < station ? 'completed' : ''}`} />
            <span className="simulate-dot-label">{s.icon}</span>
          </div>
        ))}
      </div>
      <div className="glass-card" style={{ maxWidth: 800, width: '100%', animation: 'slideUp 0.4s ease' }}>
        {station === 0 && <Station1 audioEnabled={audioEnabled} onNext={nextStation} />}
        {station === 1 && <Station2 audioEnabled={audioEnabled} onNext={nextStation} />}
        {station === 2 && <Station3 audioEnabled={audioEnabled} onNext={nextStation} />}
        {station === 3 && <Station4 audioEnabled={audioEnabled} onNext={nextStation} />}
        {station === 4 && <Station5 audioEnabled={audioEnabled} onComplete={onComplete} />}
      </div>
    </div>
  );
}
