import React, { useState, useCallback } from 'react';
import PlaceValueChart from './PlaceValueChart';

function Visual({ question }) {
  if (!question.visual) return null;

  if (question.visual === 'placeValueChart') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <PlaceValueChart amountCents={question.amountCents} size="small" />
      </div>
    );
  }

  if (question.visual === 'priceTag') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1e1e50, #2d1b69)',
          padding: '16px 32px',
          borderRadius: '16px',
          border: '2px solid var(--gold)',
          boxShadow: '0 0 16px rgba(255, 193, 7, 0.3)',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <span style={{ fontSize: '2rem', color: 'var(--gold)' }}>$</span>
          <span style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white' }}>
            {(question.amountCents / 100).toFixed(2)}
          </span>
        </div>
      </div>
    );
  }

  if (question.visual === 'coinTray') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <div style={{
          padding: '16px 24px',
          background: 'rgba(255,255,255,0.05)',
          border: '2px dashed rgba(255,255,255,0.3)',
          borderRadius: '16px',
          display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '300px', justifyContent: 'center'
        }}>
          {Array.from({ length: Math.min(question.amountCents / 100, 5) }).map((_, i) => (
             <div key={'d'+i} style={{ padding: '8px 12px', background: 'var(--gold)', color: '#000', borderRadius: '50%', fontWeight: 'bold' }}>$1</div>
          ))}
          {Array.from({ length: Math.min((question.amountCents % 100) / 25, 3) }).map((_, i) => (
             <div key={'c'+i} style={{ padding: '8px 12px', background: 'silver', color: '#000', borderRadius: '50%', fontWeight: 'bold' }}>25¢</div>
          ))}
          <span style={{ color: 'var(--text-muted)' }}>... and more</span>
        </div>
      </div>
    );
  }

  if (question.visual === 'trueFalse') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0', fontSize: '4rem', gap: '20px' }}>
        👍 👎
      </div>
    );
  }

  return null;
}

export default function QuestionRenderer({ question, onAnswer, disabled }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = useCallback((option) => {
    if (disabled) return;
    setSelectedOption(option);
    const isCorrect = String(option) === String(question.correctAnswer);
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedOption(null);
    }, 600);
  }, [disabled, question.correctAnswer, onAnswer]);

  return (
    <div>
      <div style={{ display: 'inline-block', background: 'var(--green)', color: 'black', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700, marginBottom: 12, letterSpacing: '0.5px' }}>
        💰 DECIMAL NOTATION
      </div>
      <p className="question-text">{question.questionText}</p>

      <Visual question={question} />

      {question.options && (
        <div className="options-grid">
          {question.options.map((opt, i) => {
            let cls = 'option-btn';
            if (disabled) cls += ' disabled';
            if (selectedOption === opt) {
              cls += String(opt) === String(question.correctAnswer) ? ' correct' : ' wrong';
            } else if (disabled && String(opt) === String(question.correctAnswer)) {
              cls += ' correct';
            }
            return (
              <button key={i} className={cls} onClick={() => handleOptionClick(opt)}>
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
