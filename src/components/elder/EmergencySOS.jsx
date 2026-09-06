import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { soundEngine } from '../../utils/soundEngine';
import { voiceAssistant } from '../../utils/voiceAssistant';
import { AlertTriangle, PhoneCall, ShieldCheck, MapPin, Check, X } from 'lucide-react';

export default function EmergencySOS() {
  const { t, currentLang } = useLanguage();
  const [sosActive, setSosActive] = useState(false);

  const handleTriggerSOS = () => {
    soundEngine.playReminderChime();
    setSosActive(true);

    voiceAssistant.speak(
      currentLang === 'as'
        ? 'কোনো ভয় নকৰিব। সাহায্যৰ বাবে অনন্যাক খবৰ দিয়া হৈছে। আপুনি শান্তিৰে বহক, আপুনি সুৰক্ষিত।'
        : 'Do not worry at all. Help is on the way. Ananya has been alerted. Please sit down comfortably, you are safe.',
      currentLang
    );
  };

  const handleCancelSOS = () => {
    soundEngine.playTap();
    setSosActive(false);
    voiceAssistant.speak(
      currentLang === 'as' 
        ? 'সাহায্য বাতিল কৰা হ’ল। আপুনি ভালে থকাৰ বাবে ধন্যবাদ।' 
        : 'Emergency alert cancelled. Glad to know you are safe.', 
      currentLang
    );
  };

  return (
    <div className="elder-card" style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: '3.5rem', marginBottom: 10 }}>🆘 🚨</div>

      <h2 className="card-title" style={{ justifyContent: 'center', marginBottom: 6 }}>
        {t('sosTitle')}
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.15em', maxWidth: 580, margin: '0 auto 28px' }}>
        {t('sosDesc')}
      </p>

      {!sosActive ? (
        <div>
          <button
            className="emergency-sos-btn"
            onClick={handleTriggerSOS}
            style={{
              padding: '24px 44px',
              fontSize: 'calc(24px * var(--font-scale))',
              letterSpacing: '1px'
            }}
          >
            <AlertTriangle size={36} />
            PRESS FOR IMMEDIATE HELP
          </button>

          <div style={{
            marginTop: 36,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
            textAlign: 'left'
          }}>
            <div style={{
              background: 'var(--bg-accent)',
              padding: 16,
              borderRadius: 'var(--border-radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              <PhoneCall color="var(--ner-forest)" size={24} />
              <div>
                <div style={{ fontWeight: 800, color: 'var(--ner-forest-deep)' }}>Primary Caregiver</div>
                <div style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>Ananya Gogoi (Daughter)</div>
                <div style={{ fontSize: '0.85em', color: 'var(--ner-teal)' }}>+91 94350-82711</div>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-accent)',
              padding: 16,
              borderRadius: 'var(--border-radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              <MapPin color="var(--ner-terracotta)" size={24} />
              <div>
                <div style={{ fontWeight: 800, color: 'var(--ner-forest-deep)' }}>Safe Location</div>
                <div style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>Home (Uzan Bazar, Guwahati)</div>
                <div style={{ fontSize: '0.85em', color: 'var(--text-muted)' }}>GPS Geofence: Inside Home Safe Zone</div>
              </div>
            </div>
          </div>
        </div>
      ) : (

        <div style={{
          background: 'linear-gradient(135deg, #FFEBEE, #FFFFFF)',
          border: '4px solid var(--state-danger)',
          borderRadius: 'var(--border-radius-lg)',
          padding: 32,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>📡 🚨</div>
          <h3 style={{ fontSize: '1.8em', color: 'var(--state-danger)', fontWeight: 800, marginBottom: 8 }}>
            {t('sosActive')}
          </h3>
          <p style={{
            fontSize: '1.25em',
            fontWeight: 700,
            color: 'var(--ner-forest-deep)',
            maxWidth: 540,
            margin: '0 auto 20px',
            lineHeight: 1.6
          }}>
            🌸 {t('sosReassurance')}
          </p>

          <div style={{
            background: '#FFFFFF',
            padding: 16,
            borderRadius: 'var(--border-radius-md)',
            maxWidth: 480,
            margin: '0 auto 24px',
            border: '2px dashed var(--state-danger)',
            fontSize: '1em',
            color: 'var(--text-secondary)'
          }}>
            📍 Emergency broadcast sent with GPS: 26.1882° N, 91.7512° E.<br/>
            Dialing caregiver phone and neighborhood health worker.
          </div>

          <button
            className="btn-tactile btn-secondary"
            onClick={handleCancelSOS}
            style={{ padding: '16px 32px', fontSize: '1.15em' }}
          >
            <X size={22} />
            {t('sosCancel')}
          </button>
        </div>
      )}
    </div>
  );
}
