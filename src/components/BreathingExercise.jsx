import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { soundEffects } from '../utils/soundUtils';
import { X, Play, Pause, RotateCcw, Wind } from 'lucide-react';

export default function BreathingExercise() {
  const { isBreathingModalOpen, setIsBreathingModalOpen } = useApp();
  const [phase, setPhase] = useState('ready'); // ready, inhale, hold, exhale
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer = null;

    if (isActive) {
      if (secondsLeft > 1) {
        timer = setTimeout(() => {
          setSecondsLeft(prev => prev - 1);
        }, 1000);
      } else {
        // Switch phase
        if (phase === 'ready' || phase === 'exhale') {
          setPhase('inhale');
          setSecondsLeft(4);
          soundEffects.playBreathTone(true);
        } else if (phase === 'inhale') {
          setPhase('hold');
          setSecondsLeft(4);
        } else if (phase === 'hold') {
          setPhase('exhale');
          setSecondsLeft(6);
          soundEffects.playBreathTone(false);
          setCycleCount(c => c + 1);
        }
      }
    }

    return () => clearTimeout(timer);
  }, [isActive, secondsLeft, phase]);

  if (!isBreathingModalOpen) return null;

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setSecondsLeft(4);
    soundEffects.playBreathTone(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('ready');
    setSecondsLeft(4);
    setCycleCount(0);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Inspire pelo nariz... enchendo o peito de calma';
      case 'hold': return 'Segure o ar... sinta a quietude';
      case 'exhale': return 'Solte pela boca devagar... soltando qualquer tensão';
      default: return 'Pronto para relaxar? Clique em Iniciar.';
    }
  };

  const getCircleScale = () => {
    if (phase === 'inhale') return 'scale-125';
    if (phase === 'hold') return 'scale-125';
    if (phase === 'exhale') return 'scale-90';
    return 'scale-100';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-clima-purple/60 dark:bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-clima-dark-card border border-clima-lavender/60 dark:border-clima-dark-border shadow-2xl p-6 sm:p-8 text-center overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsActive(false);
            setIsBreathingModalOpen(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-xl text-clima-purple/60 hover:text-clima-purple dark:text-gray-400 dark:hover:text-white hover:bg-clima-lilac/30 dark:hover:bg-clima-dark transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-semibold mb-3">
          <Wind className="w-3.5 h-3.5" />
          <span>Exercício 4-4-6 de Respiração Consciente</span>
        </div>

        <h3 className="font-title text-2xl font-bold text-clima-purple dark:text-white mb-1">
          Pausa para Respirar
        </h3>
        <p className="text-xs sm:text-sm text-clima-purple/70 dark:text-gray-300 max-w-sm mx-auto mb-8">
          A respiração lenta desacelera os batimentos cardíacos e sinaliza segurança para o cérebro.
        </p>

        {/* Breathing Animation Canvas */}
        <div className="relative w-56 h-56 mx-auto mb-8 flex items-center justify-center">
          
          {/* Outer Pulsing Rings */}
          <div className={`absolute inset-0 rounded-full bg-clima-lavender/30 dark:bg-purple-900/20 blur-xl transition-all duration-[4000ms] ${getCircleScale()}`} />
          <div className={`absolute inset-4 rounded-full border-2 border-dashed border-teal-300/60 dark:border-teal-500/30 transition-all duration-[4000ms] ${getCircleScale()}`} />

          {/* Central Breathing Orb */}
          <div 
            className={`w-36 h-36 rounded-full bg-gradient-to-tr from-teal-200 via-clima-lilac to-clima-yellow dark:from-teal-900 dark:via-purple-900 dark:to-indigo-900 shadow-soft-lg flex flex-col items-center justify-center transition-all duration-[3500ms] ease-in-out ${getCircleScale()}`}
          >
            <span className="font-title text-4xl font-extrabold text-clima-purple dark:text-white">
              {phase === 'ready' ? '•' : secondsLeft}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-clima-purple/80 dark:text-clima-lavender mt-1">
              {phase === 'ready' ? 'Iniciar' : phase}
            </span>
          </div>

        </div>

        {/* Guidance Text */}
        <p className="text-sm font-semibold text-clima-purple dark:text-white min-h-[40px] flex items-center justify-center px-4">
          {getPhaseInstruction()}
        </p>

        <p className="text-xs text-clima-purple/60 dark:text-gray-400 mt-2 mb-6">
          Ciclos completados: <span className="font-bold text-clima-purple dark:text-white">{cycleCount}</span>
        </p>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="px-6 py-3 rounded-2xl font-title text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-soft flex items-center gap-2 transition-transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{phase === 'ready' ? 'Começar respiração' : 'Continuar'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-6 py-3 rounded-2xl font-title text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-soft flex items-center gap-2 transition-transform active:scale-95"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pausar</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-3 rounded-2xl border border-clima-lilac dark:border-clima-dark-border text-clima-purple/70 dark:text-gray-300 hover:bg-clima-lilac/30 transition-colors"
            title="Reiniciar"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
