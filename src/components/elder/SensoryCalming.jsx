import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { soundEngine } from '../../utils/soundEngine';
import { voiceAssistant } from '../../utils/voiceAssistant';
import { Music, Play, Square, Wind, Heart, Sparkles, Smile, Meh, Frown, AlertCircle } from 'lucide-react';

export default function SensoryCalming() {
  const { t, currentLang } = useLanguage();
  const [playingTrack, setPlayingTrack] = useState(null);
  const [breathPhase, setBreathPhase] = useState('in'); 
  const [selectedMood, setSelectedMood] = useState(null);
  const [soothingMessage, setSoothingMessage] = useState('');

  const tracks = [
    {
      id: 'flute',
      title: t('fluteTrack'),
      desc: 'Gentle bamboo flute melodies inspired by the green Khasi pine ridges',
      icon: '🎋',
      playTone: () => {
        soundEngine.playFluteTone(440, 1.2);
        setTimeout(() => soundEngine.playFluteTone(523.25, 1.2), 1200);
        setTimeout(() => soundEngine.playFluteTone(587.33, 1.5), 2400);
      }
    },
    {
      id: 'rain',
      title: t('rainTrack'),
      desc: 'Soft rhythmic raindrops trickling on broad banana leaves in Cherrapunji',
      icon: '🌧️',
      playTone: () => {
        soundEngine.playFluteTone(330, 0.8);
        setTimeout(() => soundEngine.playFluteTone(392, 0.8), 800);
      }
    },
    {
      id: 'river',
      title: t('riverTrack'),
      desc: 'Rippling calm waters of the mighty Brahmaputra at quiet sunset',
      icon: '🌊',
      playTone: () => {
        soundEngine.playFluteTone(261.63, 1.4);
        setTimeout(() => soundEngine.playFluteTone(329.63, 1.4), 1400);
      }
    },
    {
      id: 'bowl',
      title: t('singingBowlTrack'),
      desc: 'Deep resonant Tibetan monastic singing bowl for grounding and serenity',
      icon: '🧘',
      playTone: () => {
        soundEngine.playSuccess();
      }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBreathPhase(p => (p === 'in' ? 'out' : 'in'));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleTrack = (track) => {
    if (playingTrack === track.id) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(track.id);
      track.playTone();
      voiceAssistant.speak(`Playing ${track.title}. Let your heart feel calm and peaceful.`, currentLang);
    }
  };

  const handleMoodSelect = (moodKey) => {
    soundEngine.playTap();
    setSelectedMood(moodKey);

    if (moodKey === 'happy') {
      soundEngine.playSuccess();
      setSoothingMessage('It brings joy to know you are feeling happy and peaceful today! 🌸');
      voiceAssistant.speak('It brings joy to know you are feeling happy and peaceful today.', currentLang);
    } else if (moodKey === 'okay') {
      setSoothingMessage('A calm and steady day is a blessing. We are right here with you.');
      voiceAssistant.speak('A calm and steady day is a blessing.', currentLang);
    } else if (moodKey === 'confused') {
      soundEngine.playFluteTone(440, 0.8);
      setSoothingMessage('Do not worry at all, Bapu. You are safe at home. Breathe gently; your loved ones are near.');
      voiceAssistant.speak('Do not worry at all. You are completely safe at home. Take a slow, gentle breath.', currentLang);
    } else if (moodKey === 'anxious') {
      soundEngine.playFluteTone(392, 1.0);
      setSoothingMessage('We are holding your hand in spirit. Sit down comfortably, listen to the flute, and relax.');
      voiceAssistant.speak('You are safe and cherished. Let us listen to the soothing bamboo flute together.', currentLang);
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h2 style={{
          fontSize: 'calc(26px * var(--font-scale))',
          fontWeight: 800,
          color: 'var(--ner-forest-deep)',
          marginBottom: 8
        }}>
          🎶 {t('musicTitle')}
        </h2>
        <p style={{
          fontSize: 'calc(18px * var(--font-scale))',
          color: 'var(--text-secondary)'
        }}>
          {t('musicSub')}
        </p>
      </div>

      {}
      <div className="elder-card" style={{ marginBottom: 24, textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.3em', fontWeight: 800, color: 'var(--ner-forest-deep)', marginBottom: 12 }}>
          How is your heart feeling right now, Bapu?
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 14,
          margin: '20px 0'
        }}>
          <button
            onClick={() => handleMoodSelect('happy')}
            className="elder-card"
            style={{
              padding: 16,
              margin: 0,
              cursor: 'pointer',
              border: selectedMood === 'happy' ? '4px solid var(--state-success)' : '2px solid rgba(0,0,0,0.1)',
              background: selectedMood === 'happy' ? 'var(--state-success-bg)' : '#FFFFFF'
            }}
          >
            <div style={{ fontSize: '2.8rem' }}>😊</div>
            <div style={{ fontWeight: 800, marginTop: 6, color: 'var(--ner-forest-deep)' }}>Peaceful / Happy</div>
          </button>

          <button
            onClick={() => handleMoodSelect('okay')}
            className="elder-card"
            style={{
              padding: 16,
              margin: 0,
              cursor: 'pointer',
              border: selectedMood === 'okay' ? '4px solid var(--ner-teal)' : '2px solid rgba(0,0,0,0.1)',
              background: selectedMood === 'okay' ? 'var(--ner-teal-light)' : '#FFFFFF'
            }}
          >
            <div style={{ fontSize: '2.8rem' }}>🙂</div>
            <div style={{ fontWeight: 800, marginTop: 6, color: 'var(--ner-forest-deep)' }}>Okay / Resting</div>
          </button>

          <button
            onClick={() => handleMoodSelect('confused')}
            className="elder-card"
            style={{
              padding: 16,
              margin: 0,
              cursor: 'pointer',
              border: selectedMood === 'confused' ? '4px solid var(--ner-muga-gold)' : '2px solid rgba(0,0,0,0.1)',
              background: selectedMood === 'confused' ? 'var(--ner-muga-light)' : '#FFFFFF'
            }}
          >
            <div style={{ fontSize: '2.8rem' }}>😕</div>
            <div style={{ fontWeight: 800, marginTop: 6, color: 'var(--ner-forest-deep)' }}>A Little Confused</div>
          </button>

          <button
            onClick={() => handleMoodSelect('anxious')}
            className="elder-card"
            style={{
              padding: 16,
              margin: 0,
              cursor: 'pointer',
              border: selectedMood === 'anxious' ? '4px solid var(--ner-terracotta)' : '2px solid rgba(0,0,0,0.1)',
              background: selectedMood === 'anxious' ? 'var(--ner-terracotta-light)' : '#FFFFFF'
            }}
          >
            <div style={{ fontSize: '2.8rem' }}>😟</div>
            <div style={{ fontWeight: 800, marginTop: 6, color: 'var(--ner-forest-deep)' }}>Anxious / Restless</div>
          </button>
        </div>

        {soothingMessage && (
          <div className="card-instruction" style={{ maxWidth: 640, margin: '14px auto 0' }}>
            🌸 {soothingMessage}
          </div>
        )}
      </div>

      {}
      <div className="elder-card" style={{
        background: 'linear-gradient(135deg, #EDF7F1, #EAF4F4)',
        textAlign: 'center',
        padding: '36px 20px',
        marginBottom: 24
      }}>
        <h3 style={{ fontSize: '1.3em', fontWeight: 800, color: 'var(--ner-forest-deep)', marginBottom: 8 }}>
          Mindful Hill Breeze (Guided Breathing)
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: '1.05em' }}>
          Follow the breathing flower: inhale slowly as it grows, exhale gently as it rests.
        </p>

        {}
        <div style={{
          width: 140,
          height: 140,
          margin: '0 auto 20px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--ner-muga-gold) 0%, var(--ner-forest) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontSize: '3rem',
          boxShadow: '0 0 30px rgba(26, 64, 49, 0.3)',
          transform: breathPhase === 'in' ? 'scale(1.3)' : 'scale(0.85)',
          transition: 'transform 3.8s ease-in-out'
        }}>
          🌸
        </div>

        <div style={{
          fontSize: 'calc(24px * var(--font-scale))',
          fontWeight: 800,
          color: 'var(--ner-forest-deep)'
        }}>
          {breathPhase === 'in' ? t('breatheIn') : t('breatheOut')}
        </div>
      </div>

      {}
      <h3 style={{ fontSize: '1.3em', fontWeight: 800, color: 'var(--ner-forest-deep)', marginBottom: 16 }}>
        Traditional North Eastern Melodies
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {tracks.map(track => {
          const isCurrent = playingTrack === track.id;
          return (
            <div
              key={track.id}
              className="elder-card"
              style={{
                margin: 0,
                border: isCurrent ? '3px solid var(--ner-muga-gold)' : '2px solid rgba(0,0,0,0.1)',
                background: isCurrent ? 'var(--bg-accent)' : '#FFFFFF'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <span style={{ fontSize: '2.5rem' }}>{track.icon}</span>
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '1.15em', color: 'var(--ner-forest-deep)' }}>
                    {track.title}
                  </h4>
                  <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>
                    {track.desc}
                  </p>
                </div>
              </div>

              <button
                className={`btn-tactile ${isCurrent ? 'btn-gold' : 'btn-primary'}`}
                onClick={() => handleToggleTrack(track)}
                style={{ width: '100%', minHeight: 48 }}
              >
                {isCurrent ? <Square size={18} /> : <Play size={18} />}
                {isCurrent ? 'Playing Peaceful Melody' : 'Play Soundscape'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
