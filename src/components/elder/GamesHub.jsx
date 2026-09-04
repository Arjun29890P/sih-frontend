import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { soundEngine } from '../../utils/soundEngine';
import MemoryMatchGame from '../games/MemoryMatchGame';
import FamiliarFacesGame from '../games/FamiliarFacesGame';
import AttentionGardenGame from '../games/AttentionGardenGame';
import DaySequencerGame from '../games/DaySequencerGame';
import { Sparkles, Heart, Clock, Play } from 'lucide-react';

export default function GamesHub() {
  const { t } = useLanguage();
  const [activeGame, setActiveGame] = useState(null);

  const handleSelectGame = (gameKey) => {
    soundEngine.playTap();
    setActiveGame(gameKey);
  };

  if (activeGame === 'memory') {
    return <MemoryMatchGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'faces') {
    return <FamiliarFacesGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'garden') {
    return <AttentionGardenGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'sequence') {
    return <DaySequencerGame onBack={() => setActiveGame(null)} />;
  }

  const gameList = [
    {
      key: 'memory',
      title: t('game1Title'),
      desc: t('game1Desc'),
      icon: '🦏',
      color: 'var(--ner-forest)',
      badge: 'Memory Training'
    },
    {
      key: 'faces',
      title: t('game2Title'),
      desc: t('game2Desc'),
      icon: '💖',
      color: 'var(--ner-terracotta)',
      badge: 'Family Reminiscence'
    },
    {
      key: 'garden',
      title: t('game3Title'),
      desc: t('game3Desc'),
      icon: '🍵',
      color: 'var(--ner-muga-gold)',
      badge: 'Attention & Focus'
    },
    {
      key: 'sequence',
      title: t('game4Title'),
      desc: t('game4Desc'),
      icon: '🌅',
      color: 'var(--ner-teal)',
      badge: 'Daily Orientation'
    }
  ];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h2 style={{
          fontSize: 'calc(26px * var(--font-scale))',
          fontWeight: 800,
          color: 'var(--ner-forest-deep)',
          marginBottom: 8
        }}>
          {t('gamesTitle')}
        </h2>
        <p style={{
          fontSize: 'calc(18px * var(--font-scale))',
          color: 'var(--text-secondary)'
        }}>
          {t('gamesSub')}
        </p>
      </div>

      <div className="game-picker-grid">
        {gameList.map(g => (
          <div key={g.key} className="game-preview-card">
            <span className="badge-difficulty">{g.badge}</span>
            <div className="game-badge-icon" style={{ borderColor: g.color }}>
              <span>{g.icon}</span>
            </div>
            <div className="game-info">
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
            </div>
            <button
              className="btn-tactile btn-primary"
              onClick={() => handleSelectGame(g.key)}
              style={{ width: '100%', marginTop: 'auto' }}
            >
              <Play size={20} />
              {t('playButton')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
