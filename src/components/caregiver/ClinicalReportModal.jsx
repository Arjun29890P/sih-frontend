import React from 'react';
import { X, Printer, Download, FileText, CheckCircle, ShieldCheck } from 'lucide-react';

export default function ClinicalReportModal({ onClose }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 780, maxHeight: '92vh', padding: 32 }}
      >
        { }
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontWeight: 800, color: 'var(--ner-teal)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <FileText size={18} /> Official Clinical Assessment Summary
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="pill-btn" onClick={handlePrint} style={{ minHeight: 36, padding: '4px 14px' }}>
              <Printer size={16} /> Print / PDF
            </button>
            <button className="pill-btn" onClick={onClose} style={{ minHeight: 36, padding: '4px 10px' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        { }
        <div style={{
          borderBottom: '3px double rgba(26,64,49,0.2)',
          paddingBottom: 16,
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: '1.4em', fontWeight: 800, color: 'var(--ner-forest-deep)' }}>
                AETERNA NER CLINICAL PROGRESS REPORT
              </h2>
              <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)' }}>
                MDoNER Digital Therapeutic & Neuro-Cognitive Monitoring System
              </p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.85em', color: 'var(--text-muted)' }}>
              Report ID: NER-COG-2026-8819<br />
              Date: 4 September 2026
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12,
            marginTop: 14,
            background: 'var(--bg-accent)',
            padding: 12,
            borderRadius: 'var(--border-radius-sm)',
            fontSize: '0.9em'
          }}>
            <div><strong>Patient:</strong> Bhaben Gogoi</div>
            <div><strong>Age / Gender:</strong> 74 Yrs / Male</div>
            <div><strong>Location:</strong> Guwahati, Assam</div>
            <div><strong>Clinical Diagnosis:</strong> Early Alzheimer's (GDS-4)</div>
            <div><strong>Caregiver:</strong> Ananya Gogoi (Daughter)</div>
            <div><strong>Physician:</strong> Dr. B. Barua, GMCH</div>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h4 style={{ fontSize: '1.05em', fontWeight: 800, color: 'var(--ner-forest-deep)', marginBottom: 10 }}>
            1. Cognitive Domain Evaluation (MMSE-Equivalent: 22/30)
          </h4>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)', borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
                <th style={{ padding: '8px 12px' }}>Cognitive Domain</th>
                <th style={{ padding: '8px 12px' }}>Game / Exercise</th>
                <th style={{ padding: '8px 12px' }}>Score</th>
                <th style={{ padding: '8px 12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <td style={{ padding: '8px 12px' }}>Temporal Orientation</td>
                <td style={{ padding: '8px 12px' }}>Mera Din (Day Sequencer)</td>
                <td style={{ padding: '8px 12px' }}>4 / 5</td>
                <td style={{ padding: '8px 12px', color: 'var(--ner-forest)', fontWeight: 700 }}>Stable</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <td style={{ padding: '8px 12px' }}>Visual Pattern Recognition</td>
                <td style={{ padding: '8px 12px' }}>NER Smriti Match</td>
                <td style={{ padding: '8px 12px' }}>4 / 5</td>
                <td style={{ padding: '8px 12px', color: 'var(--ner-forest)', fontWeight: 700 }}>Good Retention</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <td style={{ padding: '8px 12px' }}>Sustained Attention & Reflex</td>
                <td style={{ padding: '8px 12px' }}>Tea Leaf Harvest</td>
                <td style={{ padding: '8px 12px' }}>5 / 5</td>
                <td style={{ padding: '8px 12px', color: 'var(--state-success)', fontWeight: 700 }}>Optimal</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <td style={{ padding: '8px 12px' }}>Reminiscence & Facial Recall</td>
                <td style={{ padding: '8px 12px' }}>Swa-Jana Familiar Faces</td>
                <td style={{ padding: '8px 12px' }}>5 / 5</td>
                <td style={{ padding: '8px 12px', color: 'var(--state-success)', fontWeight: 700 }}>High Emotional Engagement</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px' }}>Delayed Recall & Working Memory</td>
                <td style={{ padding: '8px 12px' }}>Adaptive Memory Deck L3</td>
                <td style={{ padding: '8px 12px' }}>4 / 5</td>
                <td style={{ padding: '8px 12px', color: 'var(--ner-muga-gold)', fontWeight: 700 }}>Mild Hesitation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h4 style={{ fontSize: '1.05em', fontWeight: 800, color: 'var(--ner-forest-deep)', marginBottom: 8 }}>
            2. Care Compliance & Behavioral Trends
          </h4>
          <div style={{
            background: 'var(--bg-accent)',
            padding: 12,
            borderRadius: 'var(--border-radius-sm)',
            fontSize: '0.88em',
            lineHeight: 1.6
          }}>
            • <strong>Medication Adherence:</strong> 94% (18/19 doses taken on schedule; Memantine & Donepezil well-tolerated).<br />
            • <strong>Hydration Metric:</strong> 6.8 glasses/day average (substantially lowers delirium & UTI risk).<br />
            • <strong>Sundowning Episodes:</strong> 1 mild dusk disorientation reported; settled after calming bamboo flute audio therapy within 10 minutes.
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(0,0,0,0.1)',
          paddingTop: 14,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          fontSize: '0.85em',
          color: 'var(--text-secondary)'
        }}>
          <div>
            Verified by: <strong>Aeterna AI Cognitive Engine v1.0</strong><br />
            Encrypted Health Post Hash: SHA256-NER-991A-BD82
          </div>
          <div style={{ textAlign: 'right' }}>
            ____________________________<br />
            <strong>Neurologist / PHC Medical Officer</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
