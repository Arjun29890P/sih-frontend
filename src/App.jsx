import React from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Header from './components/layout/Header';
import ElderPortal from './components/elder/ElderPortal';
import CaregiverDashboard from './components/caregiver/CaregiverDashboard';
import LoginPage from './components/auth/LoginPage';
import './styles/theme.css';
import './styles/elder-ui.css';

function MainContent() {
  const { portalMode, isAuthenticated, login } = useLanguage();

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <div className="app-container">
      <Header />

      <main style={{ flex: 1 }}>
        {portalMode === 'elder' ? <ElderPortal /> : <CaregiverDashboard />}
      </main>

      {}
      <footer style={{
        background: 'var(--bg-secondary)',
        borderTop: '2px solid rgba(26, 64, 49, 0.08)',
        padding: '24px',
        textAlign: 'center',
        marginTop: 'auto',
        fontSize: '0.9em',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ fontWeight: 800, color: 'var(--ner-forest-deep)', fontSize: '1.05em', marginBottom: 4 }}>
            🌿 Aeterna NER • AI-Enabled Cognitive & Dementia Care Platform
          </div>
          <p style={{ margin: '4px 0 10px', color: 'var(--text-muted)' }}>
            Developed for Ministry of Development of North Eastern Region (MDoNER) • SIH26003 Problem Statement
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85em' }}>
            <span>🚑 Emergency Medical: 108</span>
            <span>🧠 National Dementia Helpline: 1800-11-0031</span>
            <span>🏥 GMCH Neuro-Geriatrics Wing: +91 361-2529457</span>
            <span>🏔️ Offline Edge Node: Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
