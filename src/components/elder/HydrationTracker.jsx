import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { soundEngine } from '../../utils/soundEngine';
import { voiceAssistant } from '../../utils/voiceAssistant';
import { Droplet, Plus, Award, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HydrationTracker() {
  const { t, currentLang, waterCount, incrementWater } = useLanguage();
  const goal = 8;

  const handleDrink = () => {
    incrementWater();
    if (waterCount + 1 >= goal) {
      try {
        confetti({ particleCount: 40, spread: 60 });
      } catch (e) {}
      voiceAssistant.speak(
        currentLang === 'as' 
          ? 'বৰ ধুনীয়া! আজিৰ পানী খোৱাৰ লক্ষ্য সম্পূৰ্ণ হ’ল।' 
          : 'Splendid! You have reached your daily healthy water intake target!',
        currentLang
      );
    } else {
      voiceAssistant.speak(
        currentLang === 'as'
          ? 'এগিলাচ পানী খালে মন শাঁত পৰে।'
          : 'Wonderful! Staying hydrated keeps your thoughts clear and refreshing.',
        currentLang
      );
    }
  };

  const percentage = Math.min(100, Math.round((waterCount / goal) * 100));

  return (
    <div className="elder-card" style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>💧 🌿</div>

      <h2 className="card-title" style={{ justifyContent: 'center', marginBottom: 6 }}>
        {t('waterTitle')}
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.15em', maxWidth: 600, margin: '0 auto 24px' }}>
        {t('waterSub')}
      </p>

      {}
      <div style={{
        background: 'linear-gradient(135deg, var(--ner-teal-light), #FFFFFF)',
        border: '3px solid var(--ner-teal)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '32px 20px',
        marginBottom: 28,
        boxShadow: 'var(--shadow-soft)'
      }}>
        <div style={{
          fontSize: 'calc(54px * var(--font-scale))',
          fontWeight: 800,
          color: 'var(--ner-teal-deep)',
          lineHeight: 1
        }}>
          {waterCount}
        </div>
        <div style={{ fontSize: '1.25em', fontWeight: 700, color: 'var(--ner-forest)', marginTop: 8 }}>
          {t('glassesCount')}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '1em', marginTop: 4 }}>
          {t('hydrationGoal')}
        </div>

        {}
        <div style={{
          maxWidth: 440,
          height: 18,
          background: 'rgba(0,0,0,0.08)',
          borderRadius: varBorderRadiusFull,
          margin: '20px auto 10px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #4FC3F7, var(--ner-teal))',
            borderRadius: varBorderRadiusFull,
            transition: 'width 0.4s ease-out'
          }} />
        </div>
        <div style={{ fontWeight: 700, color: 'var(--ner-teal-deep)', fontSize: '0.95em' }}>
          {percentage}% of Daily Hydration Reached
        </div>
      </div>

      {}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 32
      }}>
        {Array.from({ length: goal }).map((_, idx) => {
          const isFilled = idx < waterCount;
          return (
            <div
              key={idx}
              style={{
                width: 52,
                height: 68,
                borderRadius: '6px 6px 16px 16px',
                border: '3px solid #0288D1',
                background: isFilled ? 'linear-gradient(180deg, #81D4FA 0%, #0288D1 100%)' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: isFilled ? '0 4px 10px rgba(2, 136, 209, 0.3)' : 'none',
                transition: 'all 0.3s ease'
              }}
              title={`Glass ${idx + 1}`}
            >
              {isFilled ? '💧' : ''}
            </div>
          );
        })}
      </div>

      {}
      <button
        className="btn-tactile btn-primary"
        onClick={handleDrink}
        style={{
          background: 'linear-gradient(135deg, #0288D1, #01579B)',
          fontSize: '1.3em',
          padding: '18px 36px',
          margin: '0 auto'
        }}
      >
        <Droplet size={26} />
        {t('drinkGlass')}
      </button>
    </div>
  );
}

const varBorderRadiusFull = '9999px';
