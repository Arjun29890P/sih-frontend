import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Brain, TrendingUp, AlertTriangle, Clock, CheckCircle, ShieldAlert, Award, Calendar } from 'lucide-react';

export default function CognitiveAnalytics() {
  const { cognitiveHistory } = useLanguage();
  const [timeRange, setTimeRange] = useState('7d');

  const cognitiveHealthIndex = 76;
  const mmseScore = 22;
  const medicationCompliance = 94;
  const avgReactionTime = '3.8s';

  const scoreData = cognitiveHistory.length > 0
    ? cognitiveHistory
    : [
      { date: 'Aug 29', score: 72 },
      { date: 'Aug 30', score: 75 },
      { date: 'Aug 31', score: 71 },
      { date: 'Sep 1', score: 80 },
      { date: 'Sep 2', score: 78 },
      { date: 'Sep 3', score: 82 },
      { date: 'Sep 4', score: 86 }
    ];

  const chartWidth = 560;
  const chartHeight = 180;
  const padding = 35;

  const points = scoreData.map((d, i) => {
    const x = padding + (i * (chartWidth - 2 * padding)) / Math.max(scoreData.length - 1, 1);
    const y = chartHeight - padding - ((d.score - 50) * (chartHeight - 2 * padding)) / 50;
    return { x, y, score: d.score, date: d.date, game: d.game };
  });

  const pathD = points.length > 1
    ? points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '')
    : '';

  const areaD = points.length > 1
    ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`
    : '';

  return (
    <div>
      { }
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
        marginBottom: 24
      }}>
        { }
        <div className="elder-card" style={{ margin: 0, padding: 20, borderLeft: '6px solid var(--ner-forest)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>Cognitive Health Index</span>
            <Brain color="var(--ner-forest)" size={22} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--ner-forest-deep)', margin: '8px 0 4px' }}>
            {cognitiveHealthIndex} <span style={{ fontSize: '0.5em', color: 'var(--text-muted)' }}>/ 100</span>
          </div>
          <div style={{ fontSize: '0.85em', color: 'var(--state-success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
            <TrendingUp size={16} /> +4.2% Stability this month
          </div>
        </div>

        { }
        <div className="elder-card" style={{ margin: 0, padding: 20, borderLeft: '6px solid var(--ner-muga-gold)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>MMSE Equivalent</span>
            <Award color="var(--ner-muga-gold)" size={22} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--ner-forest-deep)', margin: '8px 0 4px' }}>
            {mmseScore} <span style={{ fontSize: '0.5em', color: 'var(--text-muted)' }}>/ 30</span>
          </div>
          <div style={{ fontSize: '0.85em', color: 'var(--ner-teal)', fontWeight: 600 }}>
            Mild Cognitive Impairment (GDS 4)
          </div>
        </div>

        { }
        <div className="elder-card" style={{ margin: 0, padding: 20, borderLeft: '6px solid var(--state-success)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>Medication Adherence</span>
            <CheckCircle color="var(--state-success)" size={22} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--ner-forest-deep)', margin: '8px 0 4px' }}>
            {medicationCompliance}%
          </div>
          <div style={{ fontSize: '0.85em', color: 'var(--state-success)', fontWeight: 600 }}>
            18 of 19 doses verified on schedule
          </div>
        </div>

        { }
        <div className="elder-card" style={{ margin: 0, padding: 20, borderLeft: '6px solid var(--ner-terracotta)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>Avg Reaction Latency</span>
            <Clock color="var(--ner-terracotta)" size={22} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--ner-forest-deep)', margin: '8px 0 4px' }}>
            {avgReactionTime}
          </div>
          <div style={{ fontSize: '0.85em', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Steady motor and visual tracking
          </div>
        </div>
      </div>

      { }
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20, marginBottom: 24 }}>
        { }
        <div className="elder-card" style={{ margin: 0, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: '1.2em', fontWeight: 800, color: 'var(--ner-forest-deep)' }}>
              Cognitive Performance Trajectory
            </h3>
            <div style={{ display: 'flex', gap: 6 }}>
              {['7d', '30d', '90d'].map(range => (
                <button
                  key={range}
                  className={`pill-btn ${timeRange === range ? 'active' : ''}`}
                  onClick={() => setTimeRange(range)}
                  style={{ minHeight: 32, padding: '4px 10px', fontSize: '0.8em' }}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: 'auto', minWidth: 320 }}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#236B73" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#236B73" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              { }
              {[60, 70, 80, 90, 100].map(val => {
                const y = chartHeight - padding - ((val - 50) * (chartHeight - 2 * padding)) / 50;
                return (
                  <g key={val}>
                    <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="rgba(0,0,0,0.06)" strokeDasharray="4" />
                    <text x={padding - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#888">{val}</text>
                  </g>
                );
              })}

              { }
              {areaD && <path d={areaD} fill="url(#scoreGradient)" />}

              { }
              {pathD && <path d={pathD} fill="none" stroke="#236B73" strokeWidth="3" strokeLinecap="round" />}

              { }
              {points.map((pt, idx) => (
                <g key={idx}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#C98A2C" stroke="#FFFFFF" strokeWidth="2" />
                  <text x={pt.x} y={chartHeight - 10} textAnchor="middle" fontSize="10" fill="#666">
                    {pt.date}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85em', color: 'var(--text-muted)', marginTop: 8 }}>
            <span>🟢 Baseline: Stable</span>
            <span>🎯 Peak: Sep 4 (95% Swa-Jana)</span>
          </div>
        </div>

        { }
        <div className="elder-card" style={{ margin: 0, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <ShieldAlert color="var(--ner-terracotta)" size={22} />
            <h3 style={{ fontSize: '1.2em', fontWeight: 800, color: 'var(--ner-forest-deep)' }}>
              Sundowning & Restlessness Risk
            </h3>
          </div>
          <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)', marginBottom: 16 }}>
            In dementia care, confusion and restlessness often peak between dusk (5:00 PM - 8:00 PM).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {[
              { time: '08:00 AM - 12:00 PM (Morning)', risk: 'Low', pct: 15, color: 'var(--state-success)' },
              { time: '12:00 PM - 05:00 PM (Afternoon)', risk: 'Low-Medium', pct: 30, color: 'var(--ner-teal)' },
              { time: '05:00 PM - 08:30 PM (Sundowning Dusk)', risk: 'Elevated (Watch)', pct: 68, color: 'var(--ner-terracotta)' },
              { time: '08:30 PM - 06:00 AM (Night)', risk: 'Moderate', pct: 35, color: 'var(--ner-muga-gold)' }
            ].map(slot => (
              <div key={slot.time}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85em', fontWeight: 700, marginBottom: 4 }}>
                  <span>{slot.time}</span>
                  <span style={{ color: slot.color }}>{slot.risk} ({slot.pct}%)</span>
                </div>
                <div style={{ width: '100%', height: 8, background: 'rgba(0,0,0,0.06)', borderRadius: 9999, overflow: 'hidden' }}>
                  <div style={{ width: `${slot.pct}%`, height: '100%', background: slot.color, borderRadius: 9999 }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'var(--ner-terracotta-light)',
            padding: '10px 14px',
            borderRadius: 'var(--border-radius-sm)',
            fontSize: '0.85em',
            color: 'var(--ner-terracotta)',
            fontWeight: 600
          }}>
            💡 <strong>Caregiver Recommendation:</strong> Trigger 'Khasi Flute Soundscape' and warm chamomile tea around 5:30 PM before twilight to prevent evening agitation.
          </div>
        </div>
      </div>

      { }
      <div className="elder-card" style={{ margin: 0, padding: 24 }}>
        <h3 style={{ fontSize: '1.2em', fontWeight: 800, color: 'var(--ner-forest-deep)', marginBottom: 16 }}>
          Recent Patient Activity & Clinical Observations
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              time: 'Today, 03:45 PM',
              title: 'Completed Swa-Jana Familiar Faces Game',
              detail: 'Recognized daughter Ananya and home in Jorhat on first attempt without needing hints. High emotional warmth observed.',
              type: 'positive'
            },
            {
              time: 'Today, 01:35 PM',
              title: 'Afternoon Prescription Verified',
              detail: 'Multivitamin B-Complex marked taken following lunch.',
              type: 'neutral'
            },
            {
              time: 'Yesterday, 06:10 PM',
              title: 'Minor Sundowning Confusion Averted',
              detail: 'Patient tapped "A little confused" mood. AI Voice Companion responded with reassuring home orientation, followed by 10 mins of Khasi Flute music.',
              type: 'alert'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                padding: '12px 16px',
                background: 'var(--bg-accent)',
                borderRadius: 'var(--border-radius-md)'
              }}
            >
              <div style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: item.type === 'positive' ? 'var(--state-success-bg)' : item.type === 'alert' ? 'var(--ner-terracotta-light)' : 'var(--ner-teal-light)',
                color: item.type === 'positive' ? 'var(--state-success)' : item.type === 'alert' ? 'var(--ner-terracotta)' : 'var(--ner-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '1.2rem'
              }}>
                {item.type === 'positive' ? '🌸' : item.type === 'alert' ? '⚠️' : '📋'}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: 'var(--ner-forest-deep)' }}>{item.title}</span>
                  <span style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>{item.time}</span>
                </div>
                <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)', marginTop: 2 }}>
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
