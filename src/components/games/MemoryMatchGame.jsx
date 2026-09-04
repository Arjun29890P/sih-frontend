import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { soundEngine } from '../../utils/soundEngine';
import { voiceAssistant } from '../../utils/voiceAssistant';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Volume2, Award, Brain, ArrowLeft, Lightbulb } from 'lucide-react';

const CULTURAL_ITEMS = [
  { id: 'rhino', name: 'Kaziranga Rhino', icon: '🦏', region: 'Assam', desc: 'One-horned Rhino of Kaziranga' },
  { id: 'dhol', name: 'Bihu Dhol', icon: '🪘', region: 'Assam', desc: 'Festive Bihu rhythmic drum' },
  { id: 'tea', name: 'Assam Tea', icon: '🍵', region: 'Assam', desc: 'Golden orthodox tea cup' },
  { id: 'japi', name: 'Assam Japi', icon: '👒', region: 'Assam', desc: 'Traditional wicker hat of honor' },
  { id: 'hornbill', name: 'Hornbill Bird', icon: '🦅', region: 'Nagaland', desc: 'Majestic bird of the hill festival' },
  { id: 'orchid', name: 'Blue Vanda', icon: '🌺', region: 'Meghalaya', desc: 'Sacred hill orchid' },
  { id: 'bamboo', name: 'Bamboo Flute', icon: '🎋', region: 'Tripura', desc: 'Handcrafted melody pipe' },
  { id: 'muga', name: 'Muga Silk Loom', icon: '🧵', region: 'Assam', desc: 'Golden silk weaver loom' }
];

export default function MemoryMatchGame({ onBack }) {
  const { t, currentLang, recordScore } = useLanguage();
  const [level, setLevel] = useState(1); 
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [hintIndex, setHintIndex] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [consecutiveMisses, setConsecutiveMisses] = useState(0);

  useEffect(() => {
    startNewGame(level);
  }, [level]);

  const getPairsCountForLevel = (lvl) => {
    switch (lvl) {
      case 1: return 2; 
      case 2: return 3; 
      case 3: return 4; 
      case 4: return 6; 
      default: return 3;
    }
  };

  const startNewGame = (lvl = level) => {
    const pairsCount = getPairsCountForLevel(lvl);
    const selected = CULTURAL_ITEMS.slice(0, pairsCount);
    const deck = [...selected, ...selected]
      .map((item, index) => ({
        ...item,
        uniqueId: `${item.id}-${index}`,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(deck);
    setFlippedIndices([]);
    setMatchedIds([]);
    setMoves(0);
    setMistakes(0);
    setIsWon(false);
    setHintIndex(null);
    setConsecutiveMisses(0);
    setStartTime(Date.now());

    voiceAssistant.speak(
      currentLang === 'as' 
        ? 'উত্তৰ-পূৰ্বৰ ধুনীয়া বস্তুবোৰৰ যোৰ মিলাওক' 
        : 'Match the pairs of traditional treasures!', 
      currentLang
    );
  };

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedIds.includes(cards[index].id)) {
      return;
    }

    soundEngine.playTap();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const first = cards[newFlipped[0]];
      const second = cards[newFlipped[1]];

      if (first.id === second.id) {

        soundEngine.playSuccess();
        setMatchedIds(prev => {
          const next = [...prev, first.id];
          const totalPairs = getPairsCountForLevel(level);
          if (next.length === totalPairs) {
            handleVictory();
          }
          return next;
        });
        setFlippedIndices([]);
        setConsecutiveMisses(0);
        setHintIndex(null);
      } else {

        setMistakes(m => m + 1);
        setConsecutiveMisses(c => {
          const updated = c + 1;

          if (updated >= 2) {
            triggerAIHint();
          }
          return updated;
        });

        setTimeout(() => {
          setFlippedIndices([]);
        }, 1300);
      }
    }
  };

  const triggerAIHint = () => {

    const unmatchedIndex = cards.findIndex(c => !matchedIds.includes(c.id));
    if (unmatchedIndex !== -1) {
      setHintIndex(unmatchedIndex);
      soundEngine.playFluteTone(520, 0.4);
      setTimeout(() => setHintIndex(null), 2500);
    }
  };

  const handleVictory = () => {
    setIsWon(true);
    soundEngine.playSuccess();
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    const timeTaken = Math.round((Date.now() - (startTime || Date.now())) / 1000);
    const score = Math.max(50, 100 - (mistakes * 5) - Math.floor(timeTaken / 3));

    recordScore('NER Smriti Match', score, timeTaken, mistakes);

    voiceAssistant.speak(
      currentLang === 'as' 
        ? 'বৰ ধুনীয়া! আপুনি অতি সুন্দৰভাৱে যোৰ মিলালে!' 
        : 'Wonderful work! You matched all pairs beautifully!', 
      currentLang
    );
  };

  return (
    <div className="elder-card" style={{ maxWidth: 960, margin: '0 auto' }}>
      {}
      <div className="card-title-row">
        <button className="pill-btn" onClick={onBack} aria-label="Go Back to Games">
          <ArrowLeft size={20} />
          {t('backToGames')}
        </button>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontWeight: 700, color: 'var(--ner-teal)' }}>
            {t('level')}: {level}
          </span>
          <button 
            className="pill-btn" 
            onClick={() => setLevel(l => (l === 4 ? 1 : l + 1))}
            style={{ fontSize: '0.85em' }}
          >
            Change Level ({level}/4)
          </button>
          <button className="pill-btn" onClick={() => startNewGame()} title="Restart Game">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h2 className="card-title" style={{ justifyContent: 'center', marginBottom: 8 }}>
          <Sparkles color="var(--ner-muga-gold)" size={28} />
          {t('game1Title')}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05em' }}>
          {t('game1Desc')}
        </p>
      </div>

      {}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        background: 'var(--bg-accent)',
        borderRadius: 'var(--border-radius-md)',
        padding: '12px 20px',
        marginBottom: 24,
        fontWeight: 700,
        fontSize: '1.1em'
      }}>
        <div style={{ color: 'var(--ner-forest)' }}>
          {t('moves')}: <span style={{ color: 'var(--ner-muga-gold)' }}>{moves}</span>
        </div>
        <div style={{ color: 'var(--ner-forest)' }}>
          Pairs: <span style={{ color: 'var(--ner-muga-gold)' }}>{matchedIds.length} / {getPairsCountForLevel(level)}</span>
        </div>
        {hintIndex !== null && (
          <div style={{ color: 'var(--ner-terracotta)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Lightbulb size={18} /> AI Hint Active!
          </div>
        )}
      </div>

      {}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cards.length <= 4 ? 2 : cards.length <= 8 ? 4 : 4}, 1fr)`,
        gap: 16,
        marginBottom: 28
      }}>
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx) || matchedIds.includes(card.id);
          const isHinted = hintIndex === idx;

          return (
            <button
              key={card.uniqueId}
              onClick={() => handleCardClick(idx)}
              style={{
                height: 140,
                borderRadius: 'var(--border-radius-md)',
                perspective: '1000px',
                border: isHinted ? '4px solid #FF9800' : '3px solid rgba(26, 64, 49, 0.15)',
                boxShadow: isFlipped ? 'var(--shadow-medium)' : 'var(--shadow-soft)',
                background: isFlipped 
                  ? 'linear-gradient(135deg, #FFFFFF, var(--bg-accent))' 
                  : 'linear-gradient(135deg, var(--ner-forest), var(--ner-teal))',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: 12,
                cursor: matchedIds.includes(card.id) ? 'default' : 'pointer',
                transform: isFlipped ? 'scale(1.02)' : isHinted ? 'scale(1.05)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                animation: isHinted ? 'gentlePulse 1s infinite' : 'none'
              }}
              aria-label={isFlipped ? card.name : 'Hidden card'}
            >
              {isFlipped ? (
                <>
                  <span style={{ fontSize: '3rem', lineHeight: 1 }}>{card.icon}</span>
                  <span style={{ 
                    fontSize: '0.9em', 
                    fontWeight: 800, 
                    color: 'var(--ner-forest-deep)',
                    textAlign: 'center'
                  }}>
                    {card.name}
                  </span>
                </>
              ) : (
                <div style={{ textAlign: 'center', color: '#FFFFFF' }}>
                  <span style={{ fontSize: '2.4rem', opacity: 0.85 }}>🌿</span>
                  <div style={{ fontSize: '0.85em', fontWeight: 600, marginTop: 4, opacity: 0.9 }}>
                    Tap to Flip
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {}
      {isWon && (
        <div style={{
          background: 'linear-gradient(135deg, var(--ner-muga-light), #FFFFFF)',
          border: '3px solid var(--ner-muga-gold)',
          borderRadius: 'var(--border-radius-lg)',
          padding: 24,
          textAlign: 'center',
          boxShadow: 'var(--shadow-prominent)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: 8 }}>🌸 🎉</div>
          <h3 style={{ fontSize: '1.6em', color: 'var(--ner-forest-deep)', fontWeight: 800 }}>
            {t('greatJob')}
          </h3>
          <p style={{ color: 'var(--text-secondary)', margin: '10px 0 18px', fontSize: '1.1em' }}>
            You recalled all regional treasures with wonderful mindfulness!
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-tactile btn-primary" onClick={() => startNewGame()}>
              <RotateCcw size={20} />
              {t('playAgain')}
            </button>
            <button className="btn-tactile btn-gold" onClick={() => setLevel(l => Math.min(l + 1, 4))}>
              <Award size={20} />
              Try Next Level ({level + 1}/4)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
