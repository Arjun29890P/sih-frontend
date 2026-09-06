import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { soundEngine } from '../../utils/soundEngine';
import GamesHub from './GamesHub';
import RemindersModule from './RemindersModule';
import HydrationTracker from './HydrationTracker';
import SensoryCalming from './SensoryCalming';
import EmergencySOS from './EmergencySOS';
import VoiceCompanionModal from './VoiceCompanionModal';
import { Sparkles, Pill, Droplet, Music, AlertTriangle, MessageCircle, Sun, Moon, Sunrise, Sunset } from 'lucide-react';

export default function ElderPortal() {
  const { t, activeTab, setActiveTab } = useLanguage();
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const getDayPeriod = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return {
        greeting: t('greetingMorning'),
        icon: '🌅',
        bg: '#FFF8E1',
        label: 'Morning'
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        greeting: t('greetingAfternoon'),
        icon: '☀️',
        bg: '#FFFDE7',
        label: 'Afternoon'
      };
    } else if (hour >= 17 && hour < 20) {
      return {
        greeting: t('greetingEvening'),
        icon: '🌇',
        bg: '#FFF3E0',
        label: 'Evening'
      };
    } else {
      return {
        greeting: t('greetingNight'),
        icon: '🌙',
        bg: '#EDE7F6',
        label: 'Night'
      };
    }
  };

  const period = getDayPeriod();
  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const handleTabClick = (tabKey) => {
    soundEngine.playTap();
    setActiveTab(tabKey);
  };

  return (
    <div>
      {}
      <div className="day-orientation-banner">
        <div className="day-time-clock">
          <div className="celestial-icon-badge">
            {period.icon}
          </div>
          <div className="orientation-text">
            <div className="period-greeting">{period.greeting}</div>
            <div className="date-string">
              {todayStr} • {period.label} • {t('dateToday')}
            </div>
          </div>
        </div>

        <button
          className="voice-companion-trigger"
          onClick={() => {
            soundEngine.playFluteTone(440, 0.3);
            setShowVoiceModal(true);
          }}
          aria-label="Talk with voice companion"
        >
          <div className="voice-wave-dot" />
          <span>🎙️ {t('tabCompanion')}</span>
        </button>
      </div>

      {}
      <div className="main-wrapper">
        {}
        <div className="elder-nav-grid" role="tablist">
          <button
            className={`elder-nav-card ${activeTab === 'games' ? 'active' : ''}`}
            onClick={() => handleTabClick('games')}
            role="tab"
            aria-selected={activeTab === 'games'}
          >
            <div className="nav-icon-container">
              <Sparkles size={28} />
            </div>
            <div className="nav-label">{t('tabGames')}</div>
          </button>

          <button
            className={`elder-nav-card ${activeTab === 'reminders' ? 'active' : ''}`}
            onClick={() => handleTabClick('reminders')}
            role="tab"
            aria-selected={activeTab === 'reminders'}
          >
            <div className="nav-icon-container">
              <Pill size={28} />
            </div>
            <div className="nav-label">{t('tabReminders')}</div>
          </button>

          <button
            className={`elder-nav-card ${activeTab === 'hydration' ? 'active' : ''}`}
            onClick={() => handleTabClick('hydration')}
            role="tab"
            aria-selected={activeTab === 'hydration'}
          >
            <div className="nav-icon-container">
              <Droplet size={28} />
            </div>
            <div className="nav-label">{t('tabHydration')}</div>
          </button>

          <button
            className={`elder-nav-card ${activeTab === 'music' ? 'active' : ''}`}
            onClick={() => handleTabClick('music')}
            role="tab"
            aria-selected={activeTab === 'music'}
          >
            <div className="nav-icon-container">
              <Music size={28} />
            </div>
            <div className="nav-label">{t('tabMusic')}</div>
          </button>

          <button
            className={`elder-nav-card ${activeTab === 'sos' ? 'active' : ''}`}
            onClick={() => handleTabClick('sos')}
            role="tab"
            aria-selected={activeTab === 'sos'}
            style={{
              borderColor: activeTab === 'sos' ? 'var(--state-danger)' : 'rgba(211, 47, 47, 0.3)'
            }}
          >
            <div className="nav-icon-container" style={{ color: 'var(--state-danger)' }}>
              <AlertTriangle size={28} />
            </div>
            <div className="nav-label" style={{ color: activeTab === 'sos' ? '#FFF' : 'var(--state-danger)' }}>
              {t('tabSOS')}
            </div>
          </button>
        </div>

        {}
        <div style={{ marginTop: 10 }}>
          {activeTab === 'games' && <GamesHub />}
          {activeTab === 'reminders' && <RemindersModule />}
          {activeTab === 'hydration' && <HydrationTracker />}
          {activeTab === 'music' && <SensoryCalming />}
          {activeTab === 'sos' && <EmergencySOS />}
        </div>
      </div>

      {}
      {showVoiceModal && <VoiceCompanionModal onClose={() => setShowVoiceModal(false)} />}
    </div>
  );
}
