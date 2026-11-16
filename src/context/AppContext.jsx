import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_HISTORY, WEATHER_OPTIONS, ENERGY_LEVELS, NEEDS_OPTIONS } from '../data/weatherData';
import { soundEffects } from '../utils/soundUtils';

const AppContext = createContext();

const STORAGE_KEYS = {
  THEME: 'clima_interior_theme',
  HISTORY: 'clima_interior_history',
  CURRENT: 'clima_interior_current_forecast',
  USER: 'clima_interior_user',
  SELFCARE: 'clima_interior_completed_selfcare',
  SOUND: 'clima_interior_sound'
};

export function AppProvider({ children }) {
  // Theme (light / dark)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Active view tab
  const [activeTab, setActiveTab] = useState('home');

  // Sound toggle
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.SOUND);
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  // User profile
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return {
      name: 'Viajante Interior',
      streakDays: 4,
      bio: 'Cultivando meu equilíbrio um clima por vez ⛅'
    };
  });

  // Emotional History
  const [history, setHistory] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    // Default to demonstration records so graphs and weekly review look alive immediately
    return DEMO_HISTORY;
  });

  // Current active forecast (either in progress or just generated)
  const [currentForecast, setCurrentForecast] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return null;
  });

  // Completed self-care micro-habits today
  const [completedSelfCare, setCompletedSelfCare] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.SELFCARE);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return ['agua'];
  });

  // Modals state
  const [isPlusModalOpen, setIsPlusModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState(false);

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Sync theme to HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Sync sound settings
  useEffect(() => {
    soundEffects.enabled = soundEnabled;
    localStorage.setItem(STORAGE_KEYS.SOUND, JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Sync history to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  }, [history]);

  // Sync user profile
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  // Sync current forecast
  useEffect(() => {
    if (currentForecast) {
      localStorage.setItem(STORAGE_KEYS.CURRENT, JSON.stringify(currentForecast));
    }
  }, [currentForecast]);

  // Sync completed self care
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELFCARE, JSON.stringify(completedSelfCare));
  }, [completedSelfCare]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    soundEffects.playChime('gentle');
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  // Generate & set new forecast
  const generateForecast = ({ weatherId, energyId, needId, notes }) => {
    const weather = WEATHER_OPTIONS.find(w => w.id === weatherId) || WEATHER_OPTIONS[0];
    const energy = ENERGY_LEVELS.find(e => e.id === energyId) || ENERGY_LEVELS[2];
    const need = NEEDS_OPTIONS.find(n => n.id === needId) || NEEDS_OPTIONS[0];

    const now = new Date();
    const newForecast = {
      id: 'fc-' + Date.now(),
      date: now.toISOString(),
      dateFormatted: now.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' }),
      weatherId,
      energyId,
      needId,
      notes: notes || '',
      weather,
      energy,
      need,
      saved: false
    };

    setCurrentForecast(newForecast);
    setActiveTab('forecast');
    soundEffects.playChime('success');
    return newForecast;
  };

  // Save current forecast to history
  const saveCurrentForecast = () => {
    if (!currentForecast) return;

    // Check if an entry with same day already exists; update it or append
    const todayStr = new Date(currentForecast.date).toDateString();
    const existingIndex = history.findIndex(h => new Date(h.date).toDateString() === todayStr);

    let updatedHistory;
    if (existingIndex >= 0) {
      updatedHistory = [...history];
      updatedHistory[existingIndex] = { ...currentForecast, saved: true };
    } else {
      updatedHistory = [{ ...currentForecast, saved: true }, ...history];
    }

    setHistory(updatedHistory);
    setCurrentForecast(prev => ({ ...prev, saved: true }));
    showToast('✨ Sua previsão interior foi salva com sucesso no histórico!', 'success');
    soundEffects.playChime('success');

    // Trigger celebration confetti
    if (typeof window !== 'undefined' && window.confetti) {
      window.confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Toggle self-care check
  const toggleSelfCareHabit = (id) => {
    setCompletedSelfCare(prev => {
      const exists = prev.includes(id);
      let next;
      if (exists) {
        next = prev.filter(item => item !== id);
      } else {
        next = [...prev, id];
        soundEffects.playChime('gentle');
        showToast('🌱 Que ótimo! Cuidar de você faz toda a diferença.', 'success');
      }
      return next;
    });
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    showToast('Histórico reiniciado.', 'info');
  };

  // Restore demo history
  const restoreDemoHistory = () => {
    setHistory(DEMO_HISTORY);
    showToast('Dados de demonstração restaurados.', 'info');
  };

  // Update user profile
  const updateUserProfile = (fields) => {
    setUser(prev => ({ ...prev, ...fields }));
    showToast('Perfil atualizado com sucesso!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        soundEnabled,
        toggleSound,
        user,
        updateUserProfile,
        history,
        clearHistory,
        restoreDemoHistory,
        currentForecast,
        setCurrentForecast,
        generateForecast,
        saveCurrentForecast,
        completedSelfCare,
        toggleSelfCareHabit,
        isPlusModalOpen,
        setIsPlusModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isAboutModalOpen,
        setIsAboutModalOpen,
        isBreathingModalOpen,
        setIsBreathingModalOpen,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
