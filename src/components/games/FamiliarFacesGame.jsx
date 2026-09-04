import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { soundEngine } from '../../utils/soundEngine';
import { voiceAssistant } from '../../utils/voiceAssistant';
import confetti from 'canvas-confetti';
import { ArrowLeft, Heart, Volume2, HelpCircle, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

export default function FamiliarFacesGame({ onBack }) {
  const { t, currentLang, familyVault, recordScore } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentItem = familyVault[currentIndex] || familyVault[0];

  const getOptions = () => {
    const correct = currentItem.name;
    const others = familyVault
      .filter(item => item.name !== correct)
      .map(item => item.name);

    const fallbackNames = ['Neighbor Barua', 'Dr. Sarma', 'Brother Pradip', 'Sister Minati'];
    while (others.length < 2) {
      const fb = fallbackNames.shift();
      if (!others.includes(fb)) others.push(fb);
    }

    const shuffled = [correct, others[0], others[1]].sort(() => Math.random() - 0.5);
    return shuffled;
  };

  const [options, setOptions] = useState(getOptions);

  const handleSelect = (name) => {
    soundEngine.playTap();
    setSelectedAnswer(name);

    if (name === currentItem.name) {
      soundEngine.playSuccess();
      setAnsweredCorrectly(true);
      setScore(s => s + 25);
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}

      voiceAssistant.speak(
        `Yes! That is ${currentItem.name}, your ${currentItem.relation}. ${currentItem.hint}`,
        currentLang
      );
    } else {
      voiceAssistant.speak(
        `Let me tell you a little hint: ${currentItem.hint}`,
        currentLang
      );
      setShowHint(true);
    }
  };

  const playVoiceHint = () => {
    soundEngine.playFluteTone(440, 0.4);
    voiceAssistant.speak(
      `Loving hint: ${currentItem.hint}. ${currentItem.audioHint || ''}`,
      currentLang
    );
  };

  const handleNext = () => {
    soundEngine.playTap();
    if (currentIndex + 1 < familyVault.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedAnswer(null);
      setAnsweredCorrectly(false);
      setShowHint(false);

      const correct = familyVault[nextIdx].name;
      const others = familyVault.filter((_, i) => i !== nextIdx).map(x => x.name);
      setOptions([correct, others[0] || 'Friend', others[1] || 'Neighbor'].sort(() => Math.random() - 0.5));
    } else {
      setIsCompleted(true);
      soundEngine.playSuccess();
      recordScore('Swa-Jana Familiar Faces', 95, 45, 0);
      voiceAssistant.speak('Wonderful! You remembered your loving family and home so well.', currentLang);
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnsweredCorrectly(false);
    setShowHint(false);
    setScore(0);
    setIsCompleted(false);
    setOptions(getOptions());
  };

  return (
    <div className="elder-card" style={{ maxWidth: 840, margin: '0 auto' }}>
      {}
      <div className="card-title-row">
        <button className="pill-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          {t('backToGames')}
        </button>
        <span style={{ fontWeight: 700, color: 'var(--ner-teal)' }}>
          Memory Card {currentIndex + 1} of {familyVault.length}
        </span>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h2 className="card-title" style={{ justifyContent: 'center', marginBottom: 6 }}>
          <Heart color="var(--ner-terracotta)" fill="var(--ner-terracotta)" size={28} />
          {t('game2Title')}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05em' }}>
          {t('game2Desc')}
        </p>
      </div>

      {!isCompleted ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          {}
          <div style={{
            width: '100%',
            maxWidth: 420,
            borderRadius: 'var(--border-radius-lg)',
            overflow: 'hidden',
            border: '6px solid var(--ner-muga-light)',
            boxShadow: 'var(--shadow-medium)',
            background: '#FFFFFF',
            textAlign: 'center',
            position: 'relative'
          }}>
            <img
              src={currentItem.photo}
              alt="Familiar face or home"
              style={{
                width: '100%',
                height: 300,
                objectFit: 'cover',
                display: 'block'
              }}
              onError={(e) => {

                e.target.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=80';
              }}
            />
            {answeredCorrectly && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(26, 64, 49, 0.92)',
                color: '#FFFFFF',
                padding: '12px 16px',
                animation: 'fadeIn 0.3s ease-out'
              }}>
                <div style={{ fontWeight: 800, fontSize: '1.3em', color: 'var(--ner-muga-gold)' }}>
                  {currentItem.name}
                </div>
                <div style={{ fontSize: '0.95em', opacity: 0.9 }}>
                  {currentItem.relation}
                </div>
              </div>
            )}
          </div>

          {}
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="pill-btn" onClick={playVoiceHint} style={{ background: 'var(--ner-teal-light)', color: 'var(--ner-teal-deep)' }}>
              <Volume2 size={20} />
              Listen to Loving Hint
            </button>
            <button 
              className="pill-btn" 
              onClick={() => setShowHint(true)}
              style={{ background: 'var(--ner-muga-light)', color: 'var(--ner-muga-gold)' }}
            >
              <HelpCircle size={20} />
              Read Hint
            </button>
          </div>

          {}
          {showHint && (
            <div className="card-instruction" style={{ maxWidth: 500, margin: 0 }}>
              💡 <strong>Hint:</strong> {currentItem.hint}
            </div>
          )}

          {}
          <div style={{ width: '100%', maxWidth: 540, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.2em', color: 'var(--ner-forest-deep)' }}>
              Who is this beloved person or memory?
            </div>

            {options.map((opt) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = opt === currentItem.name;
              let btnClass = 'btn-secondary';
              let customStyle = {};

              if (isSelected) {
                if (isCorrect) {
                  btnClass = 'btn-primary';
                  customStyle = { background: 'var(--state-success)', borderColor: 'var(--state-success)', color: '#FFF' };
                } else {
                  customStyle = { background: 'var(--state-danger-bg)', borderColor: 'var(--state-danger)', color: 'var(--state-danger)' };
                }
              }

              return (
                <button
                  key={opt}
                  className={`btn-tactile ${btnClass}`}
                  onClick={() => handleSelect(opt)}
                  disabled={answeredCorrectly}
                  style={{
                    fontSize: '1.2em',
                    padding: '16px 24px',
                    justifyContent: 'space-between',
                    ...customStyle
                  }}
                >
                  <span>{opt}</span>
                  {isSelected && isCorrect && <CheckCircle2 size={24} />}
                </button>
              );
            })}
          </div>

          {}
          {answeredCorrectly && (
            <button
              className="btn-tactile btn-gold"
              onClick={handleNext}
              style={{ padding: '16px 36px', fontSize: '1.25em', marginTop: 10 }}
            >
              Next Familiar Memory →
            </button>
          )}
        </div>
      ) : (

        <div style={{ textAlign: 'center', padding: '30px 20px' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 10 }}>🏡 💖</div>
          <h3 style={{ fontSize: '1.8em', color: 'var(--ner-forest-deep)', fontWeight: 800, marginBottom: 12 }}>
            Memory Reconnected With Love!
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15em', maxWidth: 500, margin: '0 auto 24px' }}>
            Looking at familiar faces and reminiscing brings immense warmth, reduces confusion, and strengthens inner peace.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            <button className="btn-tactile btn-primary" onClick={restartGame}>
              <RotateCcw size={20} />
              Review Memories Again
            </button>
            <button className="btn-tactile btn-secondary" onClick={onBack}>
              Return to Mind Games
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
