import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Wifi, WifiOff, RefreshCw, Database, CheckCircle2, ShieldCheck, HardDrive } from 'lucide-react';

export default function OfflineSyncManager() {
  const { isOffline, setIsOffline, syncQueue, lastSyncTime, triggerSync } = useLanguage();

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.4em', fontWeight: 800, color: 'var(--ner-forest-deep)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Database color="var(--ner-teal)" size={24} />
          Remote NER Offline Sync & Health Post Telemetry
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em', marginTop: 4 }}>
          Engineered for rural sub-centers & hilly districts across North East India with intermittent 2G/no connectivity.
        </p>
      </div>

      {}
      <div className="elder-card" style={{
        margin: '0 0 24px',
        borderLeft: `8px solid ${isOffline ? 'var(--ner-terracotta)' : 'var(--state-success)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 54,
            height: 54,
            borderRadius: '50%',
            background: isOffline ? 'var(--ner-terracotta-light)' : 'var(--state-success-bg)',
            color: isOffline ? 'var(--ner-terracotta)' : 'var(--state-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem'
          }}>
            {isOffline ? <WifiOff size={28} /> : <Wifi size={28} />}
          </div>

          <div>
            <div style={{ fontWeight: 800, fontSize: '1.2em', color: 'var(--ner-forest-deep)' }}>
              Status: {isOffline ? 'Operating in Remote Offline Mode' : 'Connected to District Cloud / PHC Server'}
            </div>
            <div style={{ fontSize: '0.9em', color: 'var(--text-secondary)', marginTop: 2 }}>
              Last synchronized with MDoNER Health Gateway: <strong>{lastSyncTime}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button
            className={`pill-btn ${isOffline ? 'active' : ''}`}
            onClick={() => setIsOffline(!isOffline)}
            style={{ minHeight: 44, padding: '8px 16px' }}
          >
            {isOffline ? '📶 Reconnect Online' : '🏔️ Simulate Remote Hill Offline'}
          </button>

          <button
            className="btn-tactile btn-primary"
            onClick={triggerSync}
            style={{ minHeight: 44, padding: '8px 20px', fontSize: '0.9em' }}
          >
            <RefreshCw size={16} />
            Sync Now ({syncQueue.length} Pending)
          </button>
        </div>
      </div>

      {}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {}
        <div className="elder-card" style={{ margin: 0, padding: 20 }}>
          <h3 style={{ fontSize: '1.15em', fontWeight: 800, color: 'var(--ner-forest-deep)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <HardDrive size={20} color="var(--ner-forest)" />
            Local Offline Encrypted Cache
          </h3>
          <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)', marginBottom: 14 }}>
            All game scores, audio interactions, and medication timestamps are cryptographically queued in browser IndexedDB/LocalStorage.
          </p>

          <div style={{
            background: 'var(--bg-accent)',
            borderRadius: 'var(--border-radius-md)',
            padding: 14,
            maxHeight: 220,
            overflowY: 'auto',
            fontSize: '0.85em'
          }}>
            {syncQueue.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--state-success)', fontWeight: 700, padding: '20px 0' }}>
                <CheckCircle2 size={32} style={{ margin: '0 auto 6px', display: 'block' }} />
                All local patient telemetry is completely synced!
              </div>
            ) : (
              syncQueue.map((item, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--ner-teal)' }}>[{item.type}]</span>{' '}
                  <span style={{ color: 'var(--text-primary)' }}>Logged at {new Date(item.timestamp || Date.now()).toLocaleTimeString()}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {}
        <div className="elder-card" style={{ margin: 0, padding: 20 }}>
          <h3 style={{ fontSize: '1.15em', fontWeight: 800, color: 'var(--ner-forest-deep)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldCheck size={20} color="var(--state-success)" />
            Resilience Architecture (NER Edge Nodes)
          </h3>

          <ul style={{ fontSize: '0.88em', color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: 18 }}>
            <li style={{ marginBottom: 6 }}>
              <strong>Zero Asset Failure:</strong> All audio chimes and voice responses use Web Audio synthesis & Web Speech API—no external audio files required.
            </li>
            <li style={{ marginBottom: 6 }}>
              <strong>Opportunistic Sync:</strong> Telemetry packets batch automatically the moment an ASHA worker or tablet connects to 3G/4G or village Wi-Fi.
            </li>
            <li style={{ marginBottom: 6 }}>
              <strong>Conflict Resolution:</strong> CRDT-inspired timestamp ordering ensures medication logs cannot be overwritten during intermittent outages.
            </li>
            <li>
              <strong>Data Privacy:</strong> HIPAA / ABDM compliant local tokenization keeping sensitive dementia records protected.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
