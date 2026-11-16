import React from 'react';
import { useApp } from './context/AppContext';
import confetti from 'canvas-confetti';

// Bind to window for global access
if (typeof window !== 'undefined') {
  window.confetti = confetti;
}

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import CheckIn from './components/CheckIn';
import ForecastResult from './components/ForecastResult';
import SelfCare from './components/SelfCare';
import WeekSummary from './components/WeekSummary';
import History from './components/History';
import BreathingExercise from './components/BreathingExercise';
import PlusModal from './components/PlusModal';
import ProfileModal from './components/ProfileModal';
import AboutModal from './components/AboutModal';
import Footer from './components/Footer';

// Icons
import { CheckCircle2, Info, AlertTriangle, Sparkles } from 'lucide-react';

export default function App() {
  const { activeTab, toast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-clima-white dark:bg-clima-dark text-clima-purple dark:text-gray-100 transition-colors duration-300">
      
      {/* Sticky Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero />
            <div className="border-t border-clima-lilac/40 dark:border-clima-dark-border">
              <WeekSummary />
            </div>
            <div className="border-t border-clima-lilac/40 dark:border-clima-dark-border">
              <SelfCare />
            </div>
          </>
        )}

        {activeTab === 'checkin' && <CheckIn />}
        {activeTab === 'forecast' && <ForecastResult />}
        {activeTab === 'selfcare' && <SelfCare />}
        {activeTab === 'week' && <WeekSummary />}
        {activeTab === 'history' && <History />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <BreathingExercise />
      <PlusModal />
      <ProfileModal />
      <AboutModal />

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div className="px-5 py-3.5 rounded-2xl bg-clima-purple text-white dark:bg-clima-lavender dark:text-clima-purple shadow-soft-lg flex items-center gap-3 border border-white/20 text-xs sm:text-sm font-semibold max-w-sm">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-700 flex-shrink-0" />
            ) : toast.type === 'alert' ? (
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            ) : (
              <Sparkles className="w-5 h-5 text-clima-yellow flex-shrink-0" />
            )}
            <span className="leading-snug">{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}
