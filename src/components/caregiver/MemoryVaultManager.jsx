import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { soundEngine } from '../../utils/soundEngine';
import { voiceAssistant } from '../../utils/voiceAssistant';
import { Heart, Plus, Trash2, Volume2, Image, Sparkles, Check } from 'lucide-react';

export default function MemoryVaultManager() {
  const { familyVault, addFamilyMember, removeFamilyMember, currentLang } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [hint, setHint] = useState('');
  const [photo, setPhoto] = useState('');
  const [audioHint, setAudioHint] = useState('');

  const samplePhotos = [
    'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80'
  ];

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    soundEngine.playSuccess();
    addFamilyMember({
      name: name.trim(),
      relation: relation.trim() || 'Family Loved One',
      hint: hint.trim() || `This is your beloved ${name}.`,
      photo: photo.trim() || samplePhotos[Math.floor(Math.random() * samplePhotos.length)],
      audioHint: audioHint.trim() || hint.trim()
    });

    setName('');
    setRelation('');
    setHint('');
    setPhoto('');
    setAudioHint('');
    setShowAddModal(false);
  };

  const handleTestAudio = (hintText) => {
    soundEngine.playFluteTone(440, 0.3);
    voiceAssistant.speak(hintText, currentLang);
  };

  return (
    <div>
      {}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div>
          <h2 style={{ fontSize: '1.4em', fontWeight: 800, color: 'var(--ner-forest-deep)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Heart color="var(--ner-terracotta)" fill="var(--ner-terracotta)" size={24} />
            Personalized Reminiscence Vault
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em', marginTop: 4 }}>
            Photos and memory cards here directly power the elder's "Swa-Jana Familiar Faces" cognitive game.
          </p>
        </div>

        <button
          className="btn-tactile btn-primary"
          onClick={() => setShowAddModal(true)}
          style={{ minHeight: 46, padding: '10px 20px', fontSize: '0.95em' }}
        >
          <Plus size={18} />
          Add Loved One / Memory
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
        {familyVault.map((item) => (
          <div
            key={item.id}
            className="elder-card"
            style={{
              margin: 0,
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >

            <div style={{ position: 'relative', width: '100%', height: 180, background: '#DDD' }}>
              <img
                src={item.photo}
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = samplePhotos[0];
                }}
              />
              <span style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(26,64,49,0.85)',
                color: '#FFF',
                fontSize: '0.75em',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 'var(--border-radius-full)'
              }}>
                Active in Game
              </span>
            </div>

            <div style={{ padding: 18, flex: 1 }}>
              <h3 style={{ fontSize: '1.2em', fontWeight: 800, color: 'var(--ner-forest-deep)' }}>
                {item.name}
              </h3>
              <div style={{ color: 'var(--ner-teal)', fontWeight: 700, fontSize: '0.9em', marginBottom: 8 }}>
                {item.relation}
              </div>
              <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                💡 {item.hint}
              </p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 16px',
              background: 'var(--bg-accent)',
              borderTop: '1px solid rgba(0,0,0,0.06)'
            }}>
              <button
                className="pill-btn"
                onClick={() => handleTestAudio(item.hint)}
                style={{ minHeight: 32, padding: '4px 10px', fontSize: '0.8em' }}
              >
                <Volume2 size={14} />
                Preview Voice Clue
              </button>

              {familyVault.length > 2 && (
                <button
                  onClick={() => removeFamilyMember(item.id)}
                  style={{ color: 'var(--state-danger)', padding: 6 }}
                  title="Remove from vault"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <h3 style={{ fontSize: '1.3em', fontWeight: 800, color: 'var(--ner-forest-deep)', marginBottom: 16 }}>
              Add Family Member or Childhood Home
            </h3>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9em', marginBottom: 4 }}>
                  Full Name / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya, Grandson Rohit, Kamakhya Mandir"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--border-radius-sm)',
                    border: '2px solid rgba(0,0,0,0.15)',
                    fontSize: '1em'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9em', marginBottom: 4 }}>
                  Relationship to Patient *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eldest Daughter, Favorite Dog, Hometown"
                  value={relation}
                  onChange={e => setRelation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--border-radius-sm)',
                    border: '2px solid rgba(0,0,0,0.15)',
                    fontSize: '1em'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9em', marginBottom: 4 }}>
                  Loving Voice Hint (Speaks when elder is hesitant) *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. She lives with you in Guwahati and brings your morning tea every dawn."
                  value={hint}
                  onChange={e => setHint(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--border-radius-sm)',
                    border: '2px solid rgba(0,0,0,0.15)',
                    fontSize: '0.95em'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9em', marginBottom: 4 }}>
                  Photo URL (or choose sample below)
                </label>
                <input
                  type="url"
                  placeholder="https://... (or click sample photo)"
                  value={photo}
                  onChange={e => setPhoto(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--border-radius-sm)',
                    border: '2px solid rgba(0,0,0,0.15)',
                    fontSize: '0.95em',
                    marginBottom: 8
                  }}
                />

                <div style={{ display: 'flex', gap: 8 }}>
                  {samplePhotos.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="sample"
                      onClick={() => setPhoto(url)}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 8,
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: photo === url ? '3px solid var(--ner-muga-gold)' : '2px solid #ccc'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 12 }}>
                <button
                  type="button"
                  className="btn-tactile btn-secondary"
                  onClick={() => setShowAddModal(false)}
                  style={{ minHeight: 44, padding: '8px 18px', fontSize: '0.95em' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-tactile btn-primary"
                  style={{ minHeight: 44, padding: '8px 24px', fontSize: '0.95em' }}
                >
                  <Check size={18} />
                  Save to Memory Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
