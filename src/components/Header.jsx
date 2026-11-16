import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CloudSun, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  User, 
  Menu, 
  X, 
  Calendar, 
  History, 
  HeartHandshake, 
  Info,
  Compass
} from 'lucide-react';

export default function Header() {
  const { 
    theme, 
    toggleTheme, 
    activeTab, 
    setActiveTab, 
    soundEnabled, 
    toggleSound, 
    user,
    currentForecast,
    setIsPlusModalOpen,
    setIsProfileModalOpen,
    setIsAboutModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Início', icon: Compass },
    { id: 'checkin', label: 'Check-in', icon: CloudSun },
    { id: 'forecast', label: 'Minha Previsão', icon: Sun, requiresForecast: true },
    { id: 'selfcare', label: 'Autocuidado', icon: HeartHandshake },
    { id: 'week', label: 'Semana', icon: Calendar },
    { id: 'history', label: 'Histórico', icon: History },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-clima-white/80 dark:bg-clima-dark/85 border-b border-clima-lilac/70 dark:border-clima-dark-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-clima-lavender rounded-xl p-1"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-clima-lavender via-clima-lilac to-clima-yellow flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform duration-200">
            <CloudSun className="w-6 h-6 text-clima-purple" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-title text-xl font-bold tracking-tight text-clima-purple dark:text-white">
                CLIMA INTERIOR
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-clima-yellow/40 dark:bg-clima-yellow/20 text-clima-purple dark:text-clima-yellow">
                beta
              </span>
            </div>
            <p className="text-xs text-clima-purple/70 dark:text-gray-300 hidden sm:block font-medium">
              Previsão emocional e autocuidado
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isDisabled = item.requiresForecast && !currentForecast;

            return (
              <button
                key={item.id}
                onClick={() => !isDisabled && handleNavClick(item.id)}
                disabled={isDisabled}
                className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive 
                    ? 'text-clima-purple dark:text-white bg-clima-lilac/60 dark:bg-clima-dark-card shadow-sm'
                    : isDisabled 
                      ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60' 
                      : 'text-clima-purple/80 dark:text-gray-200 hover:text-clima-purple dark:hover:text-white hover:bg-clima-lilac/30 dark:hover:bg-clima-dark-card/50'
                }`}
                title={isDisabled ? 'Faça seu check-in para ver sua previsão' : item.label}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-clima-purple dark:text-clima-lavender' : ''}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-clima-purple dark:bg-clima-lavender rounded-full" />
                )}
              </button>
            );
          })}

          <button
            onClick={() => setIsAboutModalOpen(true)}
            className="px-3 py-2 rounded-xl text-sm font-medium text-clima-purple/80 dark:text-gray-200 hover:text-clima-purple dark:hover:text-white hover:bg-clima-lilac/30 dark:hover:bg-clima-dark-card/50 transition-all flex items-center gap-1.5"
          >
            <Info className="w-4 h-4" />
            <span>Sobre</span>
          </button>
        </nav>

        {/* Right Action Icons & Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Clima Interior PLUS Button */}
          <button
            onClick={() => setIsPlusModalOpen(true)}
            className="relative px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-title text-xs sm:text-sm font-bold bg-gradient-to-r from-clima-lavender to-clima-pink text-clima-purple shadow-soft hover:shadow-soft-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 border border-white/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-clima-purple animate-pulse" />
            <span className="hidden sm:inline">CLIMA INTERIOR</span>
            <span>PLUS</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-clima-purple/80 dark:text-gray-200 hover:bg-clima-lilac/40 dark:hover:bg-clima-dark-card transition-colors"
            title={soundEnabled ? 'Silenciar efeitos sonoros' : 'Ativar efeitos sonoros suaves'}
            aria-label="Controle de Som"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-clima-purple dark:text-clima-lavender" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-clima-purple/80 dark:text-gray-200 hover:bg-clima-lilac/40 dark:hover:bg-clima-dark-card transition-colors"
            title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
            aria-label="Alternar tema claro/escuro"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-clima-yellow" />
            ) : (
              <Moon className="w-4 h-4 text-clima-purple" />
            )}
          </button>

          {/* Profile Button */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="w-10 h-10 rounded-xl bg-clima-lilac/50 dark:bg-clima-dark-card border border-clima-lavender/40 dark:border-clima-dark-border flex items-center justify-center text-clima-purple dark:text-clima-lavender hover:ring-2 hover:ring-clima-lavender transition-all"
            title="Meu Perfil"
            aria-label="Abrir Perfil"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-clima-purple dark:text-gray-200 hover:bg-clima-lilac/40 dark:hover:bg-clima-dark-card transition-colors"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-clima-white/95 dark:bg-clima-dark/95 border-b border-clima-lilac/70 dark:border-clima-dark-border px-4 py-4 space-y-1.5 shadow-xl animate-fade-in backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isDisabled = item.requiresForecast && !currentForecast;

            return (
              <button
                key={item.id}
                onClick={() => !isDisabled && handleNavClick(item.id)}
                disabled={isDisabled}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${
                  isActive 
                    ? 'bg-clima-lilac text-clima-purple dark:bg-clima-dark-card dark:text-white font-semibold' 
                    : isDisabled 
                      ? 'text-gray-400 dark:text-gray-600 opacity-60' 
                      : 'text-clima-purple/90 dark:text-gray-200 hover:bg-clima-lilac/30 dark:hover:bg-clima-dark-card'
                }`}
              >
                <Icon className="w-5 h-5 text-clima-purple dark:text-clima-lavender" />
                <span>{item.label}</span>
                {isDisabled && <span className="text-xs text-gray-400 ml-auto">(faça o check-in)</span>}
              </button>
            );
          })}
          
          <button
            onClick={() => {
              setIsAboutModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium text-clima-purple/90 dark:text-gray-200 hover:bg-clima-lilac/30 dark:hover:bg-clima-dark-card"
          >
            <Info className="w-5 h-5 text-clima-purple dark:text-clima-lavender" />
            <span>Sobre o Clima Interior</span>
          </button>
        </div>
      )}
    </header>
  );
}
