import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { soundEngine } from '../../utils/soundEngine';
import { voiceAssistant } from '../../utils/voiceAssistant';
import { Pill, CheckCircle2, Circle, Volume2, Calendar, Bell, Clock } from 'lucide-react';

export default function RemindersModule() {
  const { t, currentLang, medications, toggleMedication } = useLanguage();

  const handleSpeakMed = (med) => {
    soundEngine.playFluteTone(440, 0.2);
    voiceAssistant.speak(
      `Please take ${med.name}. ${med.detail}. Time scheduled: ${med.timeStr}.`,
      currentLang
    );
  };

  const appointments = [
    {
      id: 'a1',
      doctor: 'Dr. Bhupen Barua (MD, Neuro-Geriatrics)',
      facility: 'Gauhati Medical College & Hospital (GMCH)',
      date: 'Thursday, 10th September',
      time: '11:00 AM',
      type: 'Cognitive Review & Memory Follow-up',
      doctorNote: 'Bring completed MMSE progress charts from Aeterna NER app.'
    }
  ];

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h2 style={{
          fontSize: 'calc(26px * var(--font-scale))',
          fontWeight: 800,
          color: 'var(--ner-forest-deep)',
          marginBottom: 8
        }}>
          💊 {t('remindersTitle')}
        </h2>
        <p style={{
          fontSize: 'calc(18px * var(--font-scale))',
          color: 'var(--text-secondary)'
        }}>
          {t('remindersSub')}
        </p>
      </div>

      {}
      <div style={{ marginBottom: 36 }}>
        <h3 style={{
          fontSize: '1.3em',
          fontWeight: 800,
          color: 'var(--ner-forest-deep)',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}>
          <Pill color="var(--ner-forest)" size={24} />
          Today's Prescribed Medicine Box
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {medications.map((med) => (
            <div
              key={med.id}
              className="elder-card"
              style={{
                margin: 0,
                padding: '20px 24px',
                borderLeft: `8px solid ${med.color}`,
                background: med.taken ? 'var(--state-success-bg)' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  background: med.color + '25',
                  border: `3px solid ${med.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem'
                }}>
                  💊
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      fontWeight: 800,
                      fontSize: '1.25em',
                      color: med.taken ? 'var(--state-success)' : 'var(--ner-forest-deep)'
                    }}>
                      {med.name}
                    </span>
                    <span style={{
                      background: 'rgba(0,0,0,0.06)',
                      padding: '3px 10px',
                      borderRadius: 'var(--border-radius-full)',
                      fontSize: '0.85em',
                      fontWeight: 700
                    }}>
                      {med.timeStr}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05em', marginTop: 4 }}>
                    {med.detail}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  className="pill-btn"
                  onClick={() => handleSpeakMed(med)}
                  title="Speak details"
                >
                  <Volume2 size={20} />
                  Listen
                </button>

                <button
                  className="btn-tactile"
                  onClick={() => toggleMedication(med.id)}
                  style={{
                    background: med.taken ? 'var(--state-success)' : 'var(--bg-elevated)',
                    color: med.taken ? '#FFFFFF' : 'var(--text-primary)',
                    borderColor: med.taken ? 'var(--state-success)' : 'rgba(26,64,49,0.2)',
                    minHeight: 52,
                    padding: '10px 20px'
                  }}
                >
                  {med.taken ? (
                    <>
                      <CheckCircle2 size={22} />
                      {t('takenStatus')}
                    </>
                  ) : (
                    <>
                      <Circle size={22} />
                      {t('markTaken')}
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="elder-card" style={{ borderLeft: '8px solid var(--ner-teal)' }}>
        <h3 style={{
          fontSize: '1.3em',
          fontWeight: 800,
          color: 'var(--ner-forest-deep)',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}>
          <Calendar color="var(--ner-teal)" size={24} />
          Upcoming Doctor & Health Center Appointments
        </h3>

        {appointments.map(apt => (
          <div key={apt.id} style={{
            background: 'var(--bg-accent)',
            borderRadius: 'var(--border-radius-md)',
            padding: 20
          }}>
            <div style={{ fontWeight: 800, fontSize: '1.2em', color: 'var(--ner-forest-deep)' }}>
              {apt.doctor}
            </div>
            <div style={{ color: 'var(--ner-teal-deep)', fontWeight: 600, margin: '4px 0 8px' }}>
              📍 {apt.facility}
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: '1em', color: 'var(--text-primary)', marginBottom: 8 }}>
              <span>📅 {apt.date}</span>
              <span>⏰ {apt.time}</span>
              <span>🩺 {apt.type}</span>
            </div>
            <p style={{ fontStyle: 'italic', fontSize: '0.95em', color: 'var(--text-muted)' }}>
              Note: {apt.doctorNote}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
