import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import CognitiveAnalytics from './CognitiveAnalytics';
import MemoryVaultManager from './MemoryVaultManager';
import OfflineSyncManager from './OfflineSyncManager';
import ClinicalReportModal from './ClinicalReportModal';
import { Brain, Heart, Database, FileText, UserCheck, Activity, Shield } from 'lucide-react';

export default function CaregiverDashboard() {
  const { t, setPortalMode } = useLanguage();
  const [activeCareTab, setActiveCareTab] = useState('analytics');
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      { }
      <div className="elder-card" style={{
        background: 'linear-gradient(135deg, #132E22, #1A4031)',
        color: '#FFFFFF',
        marginBottom: 24,
        padding: '24px 28px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                background: 'var(--ner-muga-gold)',
                color: '#FFFFFF',
                padding: '3px 10px',
                borderRadius: 'var(--border-radius-full)',
                fontSize: '0.8em',
                fontWeight: 800
              }}>
                MDoNER CLINICAL PORTAL
              </span>
              <span style={{ fontSize: '0.9em', opacity: 0.9 }}>Guwahati Hub</span>
            </div>

            <h2 style={{ fontSize: '1.8em', fontWeight: 800, marginTop: 6, color: '#FFFFFF' }}>
              Prahari - Caregiver & Clinical Dashboard
            </h2>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 8, fontSize: '0.95em', opacity: 0.95 }}>
              <span>👤 {t('cgPatient')}</span>
              <span>🩺 {t('cgStage')}</span>
              <span>👩‍⚕️ Primary: Ananya Gogoi</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              className="btn-tactile btn-gold"
              onClick={() => setShowReportModal(true)}
              style={{ minHeight: 46, padding: '10px 18px', fontSize: '0.9em' }}
            >
              <FileText size={18} />
              {t('cgGenerateReport')}
            </button>

            <button
              className="btn-tactile"
              onClick={() => setPortalMode('elder')}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                minHeight: 46,
                padding: '10px 18px',
                fontSize: '0.9em'
              }}
            >
              ← Back to Elder Mode
            </button>
          </div>
        </div>
      </div>

      { }
      <div style={{
        display: 'flex',
        gap: 12,
        marginBottom: 24,
        borderBottom: '2px solid rgba(26,64,49,0.1)',
        paddingBottom: 8,
        overflowX: 'auto'
      }}>
        <button
          className={`pill-btn ${activeCareTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveCareTab('analytics')}
        >
          <Activity size={18} />
          Cognitive Analytics & MMSE Tracking
        </button>

        <button
          className={`pill-btn ${activeCareTab === 'vault' ? 'active' : ''}`}
          onClick={() => setActiveCareTab('vault')}
        >
          <Heart size={18} />
          Family Memory Vault
        </button>

        <button
          className={`pill-btn ${activeCareTab === 'sync' ? 'active' : ''}`}
          onClick={() => setActiveCareTab('sync')}
        >
          <Database size={18} />
          Offline Sync & Regional Telemetry
        </button>
      </div>

      { }
      {activeCareTab === 'analytics' && <CognitiveAnalytics />}
      {activeCareTab === 'vault' && <MemoryVaultManager />}
      {activeCareTab === 'sync' && <OfflineSyncManager />}

      { }
      {showReportModal && <ClinicalReportModal onClose={() => setShowReportModal(false)} />}
    </div>
  );
}
