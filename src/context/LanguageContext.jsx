import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, languages } from '../data/translations';
import { soundEngine } from '../utils/soundEngine';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    const saved = localStorage.getItem('smriti_lang');
    if (!saved || saved === 'as') {
      return 'en';
    }
    return saved;
  });

  const [fontScale, setFontScale] = useState(() => {
    return parseFloat(localStorage.getItem('smriti_font_scale')) || 1.1; 
  });

  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('smriti_high_contrast') === 'true';
  });

  const [calmMode, setCalmMode] = useState(() => {
    return localStorage.getItem('smriti_calm_mode') === 'true';
  });

  const [soundMuted, setSoundMuted] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('smriti_auth') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('smriti_user');
    if (saved) { try { return JSON.parse(saved); } catch (e) {} }
    return null;
  });

  const [portalMode, setPortalMode] = useState(() => {
    const savedUser = localStorage.getItem('smriti_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        return parsed.role || 'elder';
      } catch (e) {}
    }
    return 'elder';
  });
  const [activeTab, setActiveTab] = useState('games');

  const [waterCount, setWaterCount] = useState(() => {
    const saved = localStorage.getItem('smriti_water');
    return saved ? parseInt(saved, 10) : 3;
  });

  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem('smriti_meds');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'm1', time: 'morning', name: 'Memantine (10mg)', detail: '1 yellow tablet after breakfast', taken: true, timeStr: '08:30 AM', color: '#FBC02D' },
      { id: 'm2', time: 'afternoon', name: 'Multivitamin B-Complex', detail: '1 red capsule after lunch', taken: true, timeStr: '01:30 PM', color: '#E53935' },
      { id: 'm3', time: 'evening', name: 'Donepezil (5mg)', detail: '1 white tablet with water', taken: false, timeStr: '07:00 PM', color: '#1E88E5' },
      { id: 'm4', time: 'bedtime', name: 'Melatonin (3mg)', detail: '1 small blue tablet before sleep', taken: false, timeStr: '09:30 PM', color: '#8E24AA' }
    ];
  });

  const [familyVault, setFamilyVault] = useState(() => {
    const saved = localStorage.getItem('smriti_family_vault');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'f1',
        name: 'Ananya Gogoi',
        relation: 'Loving Daughter',
        hint: 'She lives with you in Guwahati and brings you morning tea.',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
        audioHint: 'She is your daughter who works at the Gauhati Medical College.'
      },
      {
        id: 'f2',
        name: 'Rohit',
        relation: 'Grandson (Daughter\'s Son)',
        hint: 'He loves hearing your Bihu stories and playing carrom.',
        photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=80',
        audioHint: 'Your bright grandson studying engineering in Tezpur.'
      },
      {
        id: 'f3',
        name: 'Jorhat Ancestral House',
        relation: 'Your Beloved Home Town',
        hint: 'The garden where you grew fragrant Assam tea bushes and betel nut palms.',
        photo: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=500&auto=format&fit=crop&q=80',
        audioHint: 'Your sweet wooden house with the green tea garden.'
      },
      {
        id: 'f4',
        name: 'Tutu',
        relation: 'Loyal Pet Dog',
        hint: 'The golden retriever who wags his tail whenever you walk in the verandah.',
        photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop&q=80',
        audioHint: 'Your loyal golden companion who sits by your rocking chair.'
      }
    ];
  });

  const [cognitiveHistory, setCognitiveHistory] = useState(() => {
    const saved = localStorage.getItem('smriti_cognitive_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { date: 'Sep 1', game: 'NER Smriti Match', score: 85, timeTakenSec: 42, mistakes: 2 },
      { date: 'Sep 2', game: 'Tea Leaf Harvest', score: 90, timeTakenSec: 35, mistakes: 1 },
      { date: 'Sep 3', game: 'Mera Din Sequencer', score: 80, timeTakenSec: 48, mistakes: 2 },
      { date: 'Sep 4', game: 'Swa-Jana Faces', score: 95, timeTakenSec: 28, mistakes: 0 }
    ];
  });

  const [isOffline, setIsOffline] = useState(false);
  const [syncQueue, setSyncQueue] = useState([]);
  const [lastSyncTime, setLastSyncTime] = useState('Today at 04:15 PM');

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', fontScale);
    localStorage.setItem('smriti_font_scale', fontScale);
  }, [fontScale]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('smriti_high_contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    if (calmMode) {
      document.body.classList.add('calm-mode');
    } else {
      document.body.classList.remove('calm-mode');
    }
    localStorage.setItem('smriti_calm_mode', calmMode);
  }, [calmMode]);

  useEffect(() => {
    localStorage.setItem('smriti_lang', currentLang);
  }, [currentLang]);

  useEffect(() => {
    soundEngine.setMuted(soundMuted);
  }, [soundMuted]);

  useEffect(() => {
    localStorage.setItem('smriti_water', waterCount);
  }, [waterCount]);

  useEffect(() => {
    localStorage.setItem('smriti_meds', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('smriti_family_vault', JSON.stringify(familyVault));
  }, [familyVault]);

  useEffect(() => {
    localStorage.setItem('smriti_cognitive_history', JSON.stringify(cognitiveHistory));
  }, [cognitiveHistory]);

  const t = (key) => {
    const langObj = translations[currentLang] || translations.en;
    return langObj[key] || translations.en[key] || key;
  };

  const incrementWater = () => {
    soundEngine.playWaterChime();
    setWaterCount((prev) => {
      const next = Math.min(prev + 1, 12);
      if (isOffline) {
        setSyncQueue(q => [...q, { type: 'WATER_LOG', timestamp: new Date().toISOString(), value: next }]);
      }
      return next;
    });
  };

  const toggleMedication = (id) => {
    soundEngine.playTap();
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id === id) {
          const updated = !med.taken;
          if (updated) soundEngine.playSuccess();
          if (isOffline) {
            setSyncQueue(q => [...q, { type: 'MED_TOGGLE', medId: id, taken: updated, timestamp: new Date().toISOString() }]);
          }
          return { ...med, taken: updated };
        }
        return med;
      })
    );
  };

  const recordScore = (gameName, score, timeTakenSec, mistakes) => {
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const newRecord = { date: today, game: gameName, score, timeTakenSec, mistakes };
    setCognitiveHistory(prev => [...prev.slice(-9), newRecord]); 
    if (isOffline) {
      setSyncQueue(q => [...q, { type: 'COGNITIVE_RECORD', data: newRecord }]);
    }
  };

  const addFamilyMember = (newMember) => {
    const memberWithId = { ...newMember, id: 'f_' + Date.now() };
    setFamilyVault(prev => [...prev, memberWithId]);
  };

  const removeFamilyMember = (id) => {
    setFamilyVault(prev => prev.filter(m => m.id !== id));
  };

  const triggerSync = () => {
    soundEngine.playSuccess();
    setSyncQueue([]);
    setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const login = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setPortalMode(user.role || 'elder');
    localStorage.setItem('smriti_auth', 'true');
    localStorage.setItem('smriti_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('smriti_auth');
    localStorage.removeItem('smriti_user');
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setCurrentLang,
        languages,
        t,
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
        activeTab,
        setActiveTab,
        waterCount,
        incrementWater,
        medications,
        toggleMedication,
        familyVault,
        addFamilyMember,
        removeFamilyMember,
        cognitiveHistory,
        recordScore,
        isOffline,
        setIsOffline,
        syncQueue,
        lastSyncTime,
        triggerSync,
        isAuthenticated,
        currentUser,
        login,
        logout
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
