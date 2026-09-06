import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { soundEngine } from '../../utils/soundEngine';
import { Globe, Eye, Volume2, VolumeX, Shield, Sun, Moon, Sparkles, HardDrive, Wifi, WifiOff, X, Check, LogOut } from 'lucide-react';

export default function Header() {
  const {
    t,
    currentLang,
    setCurrentLang,
    languages,
    fontScale,
    setFontScale,
    highContrast,
    setHighContrast,
    calmMode,
    setCalmMode,
    soundMuted,
    setSoundMuted,
    portalMode,
    setPortalMode,
    isOffline,
    logout
  } = useLanguage();

  const [showLangModal, setShowLangModal] = useState(false);

  const handleLangSelect = (code) => {
    soundEngine.playTap();
    setCurrentLang(code);
    setShowLangModal(false);
  };

  const handleLangChange = (e) => {
    soundEngine.playTap();
    setCurrentLang(e.target.value);
  };

  const toggleContrast = () => {
    soundEngine.playTap();
    setHighContrast(!highContrast);
  };

  const toggleCalm = () => {
    soundEngine.playTap();
    setCalmMode(!calmMode);
  };

  const toggleMute = () => {
    soundEngine.playTap();
    setSoundMuted(!soundMuted);
  };

  const defaultLang = languages.find(l => l.category === 'default') || languages[0];
  const nationalLang = languages.find(l => l.category === 'national');
  const localLanguages = languages.filter(l => l.category === 'local');

  return (
    <>
      <header className="top-header">
        <div className="header-content">
          {}
          <div className="brand-section">
            <div className="brand-logo-badge">
              🌿
            </div>
            <div className="brand-titles">
              <h1>
                {t('appTitle')}
                <span style={{
                  fontSize: '0.55em',
                  background: 'var(--ner-muga-gold)',
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: 'var(--border-radius-full)',
                  fontWeight: 700
                }}>
                  MDoNER
                </span>
              </h1>
              <div className="brand-subtitle">{t('appSubtitle')}</div>
            </div>
          </div>

          {}
          <div className="accessibility-bar">
            {}
            <div className="pill-select" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <button
                type="button"
                onClick={() => { soundEngine.playTap(); setShowLangModal(true); }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0,
                  color: 'inherit'
                }}
                title="Open Language Selection Modal"
                aria-label="Choose Language"
              >
                <Globe size={18} color="var(--ner-teal)" />
              </button>

              <select
                value={currentLang}
                onChange={handleLangChange}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontWeight: 700,
                  color: 'inherit',
                  outline: 'none',
                  cursor: 'pointer'
                }}
                aria-label="Select Language (English default, Hindi, or Regional)"
              >
                <optgroup label="Default Language">
                  <option value={defaultLang.code}>
                    {defaultLang.name} (Default)
                  </option>
                </optgroup>

                {nationalLang && (
                  <optgroup label="National Language">
                    <option value={nationalLang.code}>
                      {nationalLang.name} (National)
                    </option>
                  </optgroup>
                )}

                <optgroup label="North East Regional / Local Languages">
                  {localLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.region})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {}
            <div style={{ display: 'inline-flex', background: 'var(--bg-elevated)', borderRadius: 'var(--border-radius-full)', padding: 2 }}>
              <button
                className={`pill-btn ${fontScale === 1.0 ? 'active' : ''}`}
                onClick={() => { soundEngine.playTap(); setFontScale(1.0); }}
                title="Normal Font (100%)"
                style={{ padding: '6px 10px', minHeight: 36, fontSize: '0.85em' }}
              >
                A
              </button>
              <button
                className={`pill-btn ${fontScale === 1.25 ? 'active' : ''}`}
                onClick={() => { soundEngine.playTap(); setFontScale(1.25); }}
                title="Large Font (125%)"
                style={{ padding: '6px 10px', minHeight: 36, fontSize: '0.95em', fontWeight: 800 }}
              >
                A+
              </button>
              <button
                className={`pill-btn ${fontScale === 1.5 ? 'active' : ''}`}
                onClick={() => { soundEngine.playTap(); setFontScale(1.5); }}
                title="Extra Large Font (150%)"
                style={{ padding: '6px 10px', minHeight: 36, fontSize: '1.1em', fontWeight: 800 }}
              >
                A++
              </button>
            </div>

            {}
            <button
              className={`pill-btn ${highContrast ? 'active' : ''}`}
              onClick={toggleContrast}
              title="Dark Mode / High Contrast for Eye Comfort & Accessibility"
            >
              {highContrast ? <Sun size={16} /> : <Moon size={16} />}
              <span style={{ fontSize: '0.9em' }}>{t('highContrast')}</span>
            </button>

            {}
            <button
              className="pill-btn"
              onClick={toggleMute}
              title={soundMuted ? 'Unmute Soothing Sounds' : 'Mute Sounds'}
            >
              {soundMuted ? <VolumeX size={16} color="var(--state-danger)" /> : <Volume2 size={16} color="var(--ner-teal)" />}
            </button>

            {}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.8em',
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: 'var(--border-radius-full)',
                background: isOffline ? 'var(--ner-terracotta-light)' : 'var(--state-success-bg)',
                color: isOffline ? 'var(--ner-terracotta)' : 'var(--state-success)'
              }}
            >
              {isOffline ? <WifiOff size={14} /> : <Wifi size={14} />}
              {isOffline ? t('offlineBadge') : t('onlineBadge')}
            </span>

            {}
            <button
              className="btn-tactile btn-gold"
              onClick={() => {
                soundEngine.playTap();
                setPortalMode(portalMode === 'elder' ? 'caregiver' : 'elder');
              }}
              style={{
                minHeight: 44,
                padding: '8px 16px',
                fontSize: '0.9em'
              }}
            >
              <Shield size={16} />
              {portalMode === 'elder' ? t('switchCaregiver') : t('switchElder')}
            </button>

            <button
              className="pill-btn"
              onClick={() => {
                soundEngine.playTap();
                logout();
              }}
              title="Sign out of your account"
              style={{
                minHeight: 44,
                padding: '8px 16px',
                fontSize: '0.85em',
                borderColor: 'rgba(198, 40, 40, 0.25)',
                color: 'var(--state-danger)',
                fontWeight: 700
              }}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {}
      {showLangModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lang-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(19, 46, 34, 0.65)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 16
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowLangModal(false);
          }}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--border-radius-md)',
              width: '100%',
              maxWidth: 580,
              boxShadow: 'var(--shadow-prominent)',
              border: '2px solid var(--ner-forest)',
              padding: '24px',
              position: 'relative',
              animation: 'slideUp 0.25s ease-out'
            }}
          >
            {}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontSize: '1.6em', background: 'var(--bg-accent)', padding: 6, borderRadius: '50%' }}>
                  🌐
                </div>
                <div>
                  <h3 id="lang-modal-title" style={{ margin: 0, fontSize: '1.25em', color: 'var(--ner-forest-deep)' }}>
                    Choose Language / ভাষা নিৰ্বাচন
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85em', color: 'var(--text-muted)' }}>
                    English is default. Tap any option to switch instantly.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLangModal(false)}
                className="pill-btn"
                aria-label="Close language modal"
                style={{ padding: 8, minHeight: 36, minWidth: 36, borderRadius: '50%' }}
              >
                <X size={18} />
              </button>
            </div>

            {}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxHeight: '65vh', overflowY: 'auto', paddingRight: 4 }}>
              {}
              <div>
                <div style={{ fontSize: '0.75em', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ner-forest)', marginBottom: 6, letterSpacing: '0.05em' }}>
                  Default Language
                </div>
                <button
                  type="button"
                  onClick={() => handleLangSelect(defaultLang.code)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--border-radius-sm)',
                    border: currentLang === defaultLang.code ? '2px solid var(--ner-forest)' : '1px solid rgba(0,0,0,0.1)',
                    background: currentLang === defaultLang.code ? 'var(--bg-accent)' : 'var(--bg-elevated)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: '1.4em' }}>{defaultLang.flag}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.05em', color: 'var(--text-primary)' }}>
                        {defaultLang.name}
                      </div>
                      <div style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>
                        Default Universal Interface
                      </div>
                    </div>
                  </div>
                  {currentLang === defaultLang.code && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--state-success)', fontWeight: 800, fontSize: '0.85em' }}>
                      <Check size={18} /> Active
                    </span>
                  )}
                </button>
              </div>

              {}
              {nationalLang && (
                <div>
                  <div style={{ fontSize: '0.75em', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ner-forest)', marginBottom: 6, letterSpacing: '0.05em' }}>
                    National Language (हिन्दी)
                  </div>
                  <button
                    type="button"
                    onClick={() => handleLangSelect(nationalLang.code)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: 'var(--border-radius-sm)',
                      border: currentLang === nationalLang.code ? '2px solid var(--ner-forest)' : '1px solid rgba(0,0,0,0.1)',
                      background: currentLang === nationalLang.code ? 'var(--bg-accent)' : 'var(--bg-elevated)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: '1.4em' }}>{nationalLang.flag}</span>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.05em', color: 'var(--text-primary)' }}>
                          {nationalLang.name}
                        </div>
                        <div style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>
                          National Language • राष्ट्रीय भाषा
                        </div>
                      </div>
                    </div>
                    {currentLang === nationalLang.code && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--state-success)', fontWeight: 800, fontSize: '0.85em' }}>
                        <Check size={18} /> Active
                      </span>
                    )}
                  </button>
                </div>
              )}

              {}
              <div>
                <div style={{ fontSize: '0.75em', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ner-forest)', marginBottom: 6, letterSpacing: '0.05em' }}>
                  North Eastern Regional & Local Languages
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 10 }}>
                  {localLanguages.map((lang) => {
                    const isSelected = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleLangSelect(lang.code)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          borderRadius: 'var(--border-radius-sm)',
                          border: isSelected ? '2px solid var(--ner-forest)' : '1px solid rgba(0,0,0,0.1)',
                          background: isSelected ? 'var(--bg-accent)' : 'var(--bg-elevated)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: '1.3em' }}>{lang.flag}</span>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '1em', color: 'var(--text-primary)' }}>
                              {lang.name}
                            </div>
                            <div style={{ fontSize: '0.78em', color: 'var(--text-muted)' }}>
                              {lang.region}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <Check size={16} color="var(--state-success)" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {}
            <div style={{ marginTop: 18, paddingTop: 12, borderTop: '1px solid rgba(0,0,0,0.08)', textAlign: 'center', fontSize: '0.82em', color: 'var(--text-muted)' }}>
              Tip: You can switch between English, Hindi, and North Eastern regional languages at any time.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
