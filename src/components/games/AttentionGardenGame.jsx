import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { soundEngine } from '../../utils/soundEngine';
import { voiceAssistant } from '../../utils/voiceAssistant';
import confetti from 'canvas-confetti';
import { ArrowLeft, Sparkles, Trophy, RotateCcw, Pause, Play } from 'lucide-react';

export default function AttentionGardenGame({ onBack }) {
  const { t, currentLang, recordScore } = useLanguage();
  const [leavesHarvested, setLeavesHarvested] = useState(0);
  const [targetGoal] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const nextLeafId = useRef(0);
  const animationFrameRef = useRef();

  const handleStart = () => {
    setIsPlaying(true);
    setIsFinished(false);
    setLeavesHarvested(0);
    setLeaves([]);
    setStartTime(Date.now());
    spawnNewLeaf();

    voiceAssistant.speak(
      currentLang === 'as'
        ? 'চাহবাগানত বতাহত উৰি অহা কুমলীয়া পাতবোৰ লাহেকৈ টিপি বুটলি লওক।'
        : 'Gently tap the fresh tea leaves as they drift softly across the garden.',
      currentLang
    );
  };

  const spawnNewLeaf = () => {
    const id = ++nextLeafId.current;
    const newLeaf = {
      id,
      x: 10 + Math.random() * 75, 
      y: -10, 
      speed: 0.25 + Math.random() * 0.2, 
      rotation: Math.random() * 360,
      scale: 0.9 + Math.random() * 0.3,
      isGold: Math.random() > 0.65 
    };
    setLeaves(prev => [...prev, newLeaf]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setLeaves(prev => {

        if (prev.length < 3 && Math.random() > 0.5) {
          spawnNewLeaf();
        }

        return prev
          .map(leaf => ({
            ...leaf,
            y: leaf.y + leaf.speed,
            rotation: leaf.rotation + 0.5
          }))
          .filter(leaf => leaf.y < 95); 
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleLeafTap = (id, isGold) => {
    soundEngine.playTap();
    if (isGold) {
      soundEngine.playFluteTone(660, 0.4);
    } else {
      soundEngine.playFluteTone(520, 0.3);
    }

    setLeaves(prev => prev.filter(l => l.id !== id));
    setLeavesHarvested(prev => {
      const nextCount = prev + 1;
      if (nextCount >= targetGoal) {
        finishGame();
      }
      return nextCount;
    });
  };

  const finishGame = () => {
    setIsPlaying(false);
    setIsFinished(true);
    soundEngine.playSuccess();
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    const timeSpent = Math.round((Date.now() - (startTime || Date.now())) / 1000);
    recordScore('Tea Leaf Harvest', 92, timeSpent, 0);

    voiceAssistant.speak(
      currentLang === 'as'
        ? 'বৰ ধুনীয়া! আপোনাৰ চাহৰ টোপোলা ভৰি পৰিল।'
        : 'Splendid! Your tea basket is full of fresh golden leaves.',
      currentLang
    );
  };

  return (
    <div className="elder-card" style={{ maxWidth: 880, margin: '0 auto' }}>
      {}
      <div className="card-title-row">
        <button className="pill-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          {t('backToGames')}
        </button>
        <div style={{ fontWeight: 700, color: 'var(--ner-forest)' }}>
          Harvested: <span style={{ color: 'var(--ner-muga-gold)', fontSize: '1.2em' }}>{leavesHarvested} / {targetGoal}</span>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 className="card-title" style={{ justifyContent: 'center', marginBottom: 4 }}>
          🌿 {t('game3Title')}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05em' }}>
          {t('game3Desc')}
        </p>
      </div>

      {}
      <div style={{
        width: '100%',
        height: 420,
        position: 'relative',
        borderRadius: 'var(--border-radius-lg)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #DCEEE2 0%, #A8D5BA 60%, #4D8B62 100%)',
        border: '4px solid rgba(26, 64, 49, 0.2)',
        boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.06)'
      }}>
        {}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: 'radial-gradient(ellipse at bottom, #2E6B48 0%, #1A4031 100%)',
          borderTopLeftRadius: '50% 20px',
          borderTopRightRadius: '50% 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#E8F5E9',
          fontWeight: 700,
          fontSize: '1.1em',
          letterSpacing: '0.5px'
        }}>
          🧺 Your Handwoven Bamboo Basket
        </div>

        {}
        {isPlaying && leaves.map(leaf => (
          <button
            key={leaf.id}
            onClick={() => handleLeafTap(leaf.id, leaf.isGold)}
            style={{
              position: 'absolute',
              left: `${leaf.x}%`,
              top: `${leaf.y}%`,
              transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 10,
              fontSize: leaf.isGold ? '3.5rem' : '3.2rem',
              filter: leaf.isGold 
                ? 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' 
                : 'drop-shadow(0 4px 8px rgba(0, 50, 0, 0.25))',
              transition: 'transform 0.1s linear',
              userSelect: 'none'
            }}
            aria-label={leaf.isGold ? 'Golden tea bud' : 'Tea leaf'}
          >
            {leaf.isGold ? '✨🍃' : '🍃'}
          </button>
        ))}

        {}
        {!isPlaying && !isFinished && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(26, 64, 49, 0.45)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            padding: 24,
            textAlign: 'center',
            color: '#FFFFFF'
          }}>
            <div style={{ fontSize: '3.5rem' }}>🍵 🍃</div>
            <h3 style={{ fontSize: '1.8em', fontWeight: 800 }}>Ready to Harvest Fresh Tea Leaves?</h3>
            <p style={{ maxWidth: 460, fontSize: '1.15em', opacity: 0.95 }}>
              Tapping moving leaves exercises sustained attention, visual tracking, and finger coordination.
            </p>
            <button className="btn-tactile btn-gold" onClick={handleStart} style={{ padding: '16px 36px', fontSize: '1.3em' }}>
              <Play size={24} />
              Start Plucking Leaves
            </button>
          </div>
        )}

        {}
        {isFinished && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(247, 243, 235, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            padding: 24,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3.5rem' }}>🌸 🍵 🏆</div>
            <h3 style={{ fontSize: '1.8em', color: 'var(--ner-forest-deep)', fontWeight: 800 }}>
              Harvest Complete!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15em', maxWidth: 460 }}>
              You gathered 10 exquisite leaves with calm, steady focus. Your mind is refreshed like morning mountain air.
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              <button className="btn-tactile btn-primary" onClick={handleStart}>
                <RotateCcw size={20} />
                Harvest More Leaves
              </button>
              <button className="btn-tactile btn-secondary" onClick={onBack}>
                Return to Games
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
