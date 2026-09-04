import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { soundEngine } from '../../utils/soundEngine';
import { voiceAssistant } from '../../utils/voiceAssistant';
import { Mic, MicOff, Volume2, X, Sparkles, MessageCircleHeart } from 'lucide-react';

export default function VoiceCompanionModal({ onClose }) {
  const { t, currentLang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [companionReply, setCompanionReply] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleStartListen = () => {
    soundEngine.playTap();
    setIsListening(true);
    setTranscript('');
    setCompanionReply('');

    voiceAssistant.listen(
      (userSpeech) => {
        setIsListening(false);
        setTranscript(userSpeech);
        respondToQuery(userSpeech);
      },
      (err) => {
        setIsListening(false);

        setTranscript('Could not capture microphone clearly. You can also tap the common questions below!');
      },
      currentLang
    );
  };

  const respondToQuery = (queryText) => {
    const aiResp = voiceAssistant.getAICompanionResponse(queryText, currentLang, 'Bapu');
    setCompanionReply(aiResp.text);
    setIsSpeaking(true);
    voiceAssistant.speak(aiResp.text, currentLang);
    setTimeout(() => setIsSpeaking(false), 6000);
  };

  const handleQuickPrompt = (promptText) => {
    soundEngine.playTap();
    setTranscript(promptText);
    respondToQuery(promptText);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 640 }}>
        {}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--ner-teal), #184E55)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem'
            }}>
              🧕
            </div>
            <div>
              <h3 style={{ fontSize: '1.4em', fontWeight: 800, color: 'var(--ner-forest-deep)' }}>
                {t('companionTitle')}
              </h3>
              <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>
                {t('companionSubtitle')}
              </p>
            </div>
          </div>

          <button className="pill-btn" onClick={onClose} style={{ minHeight: 40 }}>
            <X size={20} />
          </button>
        </div>

        {}
        <div style={{
          background: 'linear-gradient(135deg, var(--bg-accent), #FFFFFF)',
          borderRadius: 'var(--border-radius-lg)',
          padding: '32px 20px',
          textAlign: 'center',
          marginBottom: 24,
          border: '2px solid rgba(26, 64, 49, 0.1)'
        }}>
          <button
            onClick={isListening ? () => voiceAssistant.stopListening() : handleStartListen}
            style={{
              width: 110,
              height: 110,
              borderRadius: '50%',
              background: isListening 
                ? 'linear-gradient(135deg, #E53935, #C62828)' 
                : 'linear-gradient(135deg, var(--ner-teal), #134B52)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: isListening 
                ? '0 0 0 12px rgba(229, 57, 53, 0.25)' 
                : '0 8px 24px rgba(24, 78, 85, 0.35)',
              animation: isListening ? 'gentlePulse 1.2s infinite' : 'none',
              cursor: 'pointer',
              border: '4px solid #FFFFFF'
            }}
          >
            {isListening ? <MicOff size={44} /> : <Mic size={44} />}
          </button>

          <div style={{ fontWeight: 800, fontSize: '1.25em', color: 'var(--ner-forest-deep)' }}>
            {isListening ? t('companionListening') : t('companionTapToSpeak')}
          </div>
          <div style={{ fontSize: '0.95em', color: 'var(--text-muted)', marginTop: 4 }}>
            Speak freely in Assamese, Bengali, Manipuri, Hindi or English
          </div>
        </div>

        {}
        {(transcript || companionReply) && (
          <div style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {transcript && (
              <div style={{
                background: 'var(--bg-elevated)',
                padding: '12px 18px',
                borderRadius: 'var(--border-radius-md)',
                fontSize: '1.05em',
                color: 'var(--text-primary)',
                borderLeft: '5px solid var(--ner-muga-gold)'
              }}>
                🗣️ <strong>You said:</strong> "{transcript}"
              </div>
            )}

            {companionReply && (
              <div style={{
                background: 'linear-gradient(135deg, #E8F5E9, #FFFFFF)',
                padding: '14px 20px',
                borderRadius: 'var(--border-radius-md)',
                fontSize: '1.15em',
                fontWeight: 600,
                color: 'var(--ner-forest-deep)',
                borderLeft: '5px solid var(--state-success)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12
              }}>
                <Volume2 color="var(--state-success)" size={26} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>Aai:</strong> {companionReply}
                </div>
              </div>
            )}
          </div>
        )}

        {}
        <div>
          <div style={{ fontWeight: 700, fontSize: '1em', color: 'var(--ner-forest)', marginBottom: 10 }}>
            Or tap common soothing questions:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { q: 'What time of the day is it right now?', icon: '⏰' },
              { q: 'Where am I? Who is at home with me?', icon: '🏡' },
              { q: 'Tell me a gentle folk tale from the hills', icon: '📖' },
              { q: 'What enjoyable activity should I do next?', icon: '🌿' }
            ].map((item, idx) => (
              <button
                key={idx}
                className="btn-tactile btn-secondary"
                onClick={() => handleQuickPrompt(item.q)}
                style={{
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  padding: '12px 18px',
                  fontSize: '1.05em'
                }}
              >
                <span>{item.icon}</span>
                <span>{item.q}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
