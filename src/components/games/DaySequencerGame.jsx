import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { soundEngine } from '../../utils/soundEngine';
import { voiceAssistant } from '../../utils/voiceAssistant';
import confetti from 'canvas-confetti';
import { ArrowLeft, Clock, CheckCircle2, RotateCcw, Sparkles, Sun, Moon, Sunrise, Sunset } from 'lucide-react';

const DAILY_ACTIVITIES = [
  {
    order: 1,
    period: 'Morning',
    icon: '🌅',
    title: 'Morning Assam Tea & Warm Breakfast',
    desc: 'Waking up to birds chirping, sipping hot tea, and greeting the sunrise.',
    color: '#FFF8E1',
    borderColor: '#FFA000'
  },
  {
    order: 2,
    period: 'Noon',
    icon: '💊',
    title: 'Midday Meal & Medicine',
    desc: 'Nutritious lunch, drinking clean water, and taking morning prescribed tablet.',
    color: '#E8F5E9',
    borderColor: '#43A047'
  },
  {
    order: 3,
    period: 'Late Afternoon',
    icon: '🌿',
    title: 'Garden Walk & Flower Watering',
    desc: 'Walking softly on the grass, touching orchid petals, and fresh breeze.',
    color: '#E0F2F1',
    borderColor: '#00897B'
  },
  {
    order: 4,
    period: 'Night',
    icon: '🌙',
    title: 'Evening Prayer & Gentle Sleep',
    desc: 'Lighting the sacred lamp (Diya), relaxing breathing, and restful slumber.',
    color: '#EDE7F6',
    borderColor: '#5E35B1'
  }
];

export default function DaySequencerGame({ onBack }) {
  const { t, currentLang, recordScore } = useLanguage();

  const [availableCards, setAvailableCards] = useState(() => {
    return [...DAILY_ACTIVITIES].sort(() => Math.random() - 0.5);
  });

  const [sequencedCards, setSequencedCards] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handlePickCard = (card) => {
    soundEngine.playTap();
    const nextSequence = [...sequencedCards, card];
    const nextAvailable = availableCards.filter(c => c.order !== card.order);

    setSequencedCards(nextSequence);
    setAvailableCards(nextAvailable);
    setHasError(false);

    if (nextSequence.length === 4) {
      const isCorrect = nextSequence.every((c, idx) => c.order === idx + 1);
      if (isCorrect) {
        handleSuccess();
      } else {
        handleMistake();
      }
    }
  };

  const handleRemoveFromSequence = (card) => {
    soundEngine.playTap();
    setSequencedCards(prev => prev.filter(c => c.order !== card.order));
    setAvailableCards(prev => [...prev, card]);
    setHasError(false);
  };

  const handleSuccess = () => {
    setIsSuccess(true);
    soundEngine.playSuccess();
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    recordScore('Mera Din Day Sequencer', 90, 35, 0);

    voiceAssistant.speak(
      currentLang === 'as'
        ? 'অতি সুন্দৰ! আপুনি পুৱাৰ পৰা ৰাতিলৈকে গোটেই দিনটোৰ ক্ৰম শুদ্ধকৈ সজালে।'
        : 'Beautifully arranged! You recalled the exact flow of your peaceful day.',
      currentLang
    );
  };

  const handleMistake = () => {
    setHasError(true);
    soundEngine.playReminderChime();
    voiceAssistant.speak(
      currentLang === 'as'
        ? 'মনত পেলাওকচোন, পুৱাৰ চাহ খোৱাৰ পিছত কি কৰা হয়?'
        : 'Think about what you do right after morning tea.',
      currentLang
    );
  };

  const resetGame = () => {
    setAvailableCards([...DAILY_ACTIVITIES].sort(() => Math.random() - 0.5));
    setSequencedCards([]);
    setIsSuccess(false);
    setHasError(false);
  };

  return (
    <div className="elder-card" style={{ maxWidth: 900, margin: '0 auto' }}>
      {}
      <div className="card-title-row">
        <button className="pill-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          {t('backToGames')}
        </button>
        <button className="pill-btn" onClick={resetGame}>
          <RotateCcw size={18} />
          Start Over
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h2 className="card-title" style={{ justifyContent: 'center', marginBottom: 6 }}>
          <Clock color="var(--ner-teal)" size={28} />
          {t('game4Title')}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05em' }}>
          Tap each activity in the right order from Morning to Night
        </p>
      </div>

      {}
      <div style={{
        background: 'var(--bg-accent)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '20px',
        marginBottom: 24,
        border: hasError ? '3px solid var(--state-danger)' : '2px dashed var(--ner-teal)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14
        }}>
          <span style={{ fontWeight: 800, fontSize: '1.15em', color: 'var(--ner-forest-deep)' }}>
            Your Daily Sequence (1st → 4th):
          </span>
          <span style={{ fontSize: '0.95em', color: 'var(--text-muted)' }}>
            {sequencedCards.length} of 4 Placed
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12
        }}>
          {[0, 1, 2, 3].map(slotIndex => {
            const card = sequencedCards[slotIndex];
            const slotLabels = ['1. Morning 🌅', '2. Midday ☀️', '3. Afternoon 🌿', '4. Night 🌙'];

            return (
              <div
                key={slotIndex}
                style={{
                  minHeight: 140,
                  borderRadius: 'var(--border-radius-md)',
                  border: card ? `3px solid ${card.borderColor}` : '2px dashed rgba(26, 64, 49, 0.2)',
                  background: card ? card.color : '#FFFFFF',
                  padding: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                {card ? (
                  <>
                    <span style={{ fontSize: '2.5rem', marginBottom: 4 }}>{card.icon}</span>
                    <div style={{ fontWeight: 800, fontSize: '0.95em', color: 'var(--ner-forest-deep)' }}>
                      {card.title}
                    </div>
                    <button
                      onClick={() => handleRemoveFromSequence(card)}
                      style={{
                        marginTop: 8,
                        fontSize: '0.8em',
                        color: 'var(--ner-terracotta)',
                        fontWeight: 700,
                        textDecoration: 'underline'
                      }}
                    >
                      Tap to remove
                    </button>
                  </>
                ) : (
                  <div style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.95em' }}>
                    {slotLabels[slotIndex]}
                    <div style={{ fontSize: '0.8em', marginTop: 4, opacity: 0.7 }}>Empty Slot</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {hasError && (
          <div style={{
            marginTop: 14,
            padding: 10,
            background: 'var(--state-danger-bg)',
            color: 'var(--state-danger)',
            borderRadius: 'var(--border-radius-sm)',
            fontWeight: 700,
            textAlign: 'center'
          }}>
            ⚠️ The activities are not quite in order. Tap a card above to adjust!
          </div>
        )}
      </div>

      {}
      {!isSuccess && availableCards.length > 0 && (
        <div>
          <div style={{ fontWeight: 700, marginBottom: 12, color: 'var(--ner-forest-deep)', fontSize: '1.1em' }}>
            Tap the next activity that happens:
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14
          }}>
            {availableCards.map(card => (
              <button
                key={card.order}
                onClick={() => handlePickCard(card)}
                className="elder-card"
                style={{
                  padding: 16,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  border: `3px solid ${card.borderColor}`,
                  background: card.color
                }}
              >
                <span style={{ fontSize: '3rem' }}>{card.icon}</span>
                <span style={{ fontWeight: 800, fontSize: '1.1em', color: 'var(--ner-forest-deep)' }}>
                  {card.title}
                </span>
                <span style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>
                  {card.desc}
                </span>
                <span className="pill-btn" style={{ marginTop: 4, fontSize: '0.85em', background: '#FFF' }}>
                  Tap to place here +
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {}
      {isSuccess && (
        <div style={{
          background: 'linear-gradient(135deg, var(--ner-muga-light), #FFFFFF)',
          border: '3px solid var(--ner-muga-gold)',
          borderRadius: 'var(--border-radius-lg)',
          padding: 24,
          textAlign: 'center',
          boxShadow: 'var(--shadow-prominent)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: 8 }}>☀️ 🌿 🌙 🌟</div>
          <h3 style={{ fontSize: '1.7em', color: 'var(--ner-forest-deep)', fontWeight: 800 }}>
            Day Sequence Mastered!
          </h3>
          <p style={{ color: 'var(--text-secondary)', margin: '10px 0 20px', fontSize: '1.15em' }}>
            Remembering your daily rhythm fosters deep inner reassurance and combats disorientation.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            <button className="btn-tactile btn-primary" onClick={resetGame}>
              <RotateCcw size={20} />
              Practice Sequence Again
            </button>
            <button className="btn-tactile btn-secondary" onClick={onBack}>
              Return to Games
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
