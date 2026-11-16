import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SELF_CARE_SUGGESTIONS } from '../data/weatherData';
import { 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Droplets, 
  Wind, 
  Timer, 
  Music, 
  Footprints, 
  PenTool, 
  HeartHandshake, 
  Activity, 
  Sun,
  Filter,
  Play
} from 'lucide-react';

export default function SelfCare() {
  const { 
    currentForecast, 
    completedSelfCare, 
    toggleSelfCareHabit,
    setIsBreathingModalOpen 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('recommended');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="w-5 h-5 text-sky-500" />;
      case 'Wind': return <Wind className="w-5 h-5 text-teal-500" />;
      case 'Timer': return <Timer className="w-5 h-5 text-amber-500" />;
      case 'Music': return <Music className="w-5 h-5 text-pink-500" />;
      case 'Footprints': return <Footprints className="w-5 h-5 text-emerald-500" />;
      case 'PenTool': return <PenTool className="w-5 h-5 text-purple-500" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-indigo-500" />;
      case 'Sun': return <Sun className="w-5 h-5 text-yellow-500" />;
      default: return <Sparkles className="w-5 h-5 text-purple-500" />;
    }
  };

  const currentWeatherId = currentForecast?.weather?.id || 'ensolarado';

  // Filter items
  const filteredSuggestions = SELF_CARE_SUGGESTIONS.filter((item) => {
    if (activeFilter === 'recommended') {
      return item.suitedFor.includes(currentWeatherId);
    }
    if (activeFilter === 'all') return true;
    return item.category.toLowerCase() === activeFilter.toLowerCase();
  });

  const completedCount = completedSelfCare.length;
  const totalCount = SELF_CARE_SUGGESTIONS.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalCount) * 100));

  return (
    <section className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Title & Concept Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clima-lilac/70 dark:bg-clima-dark-card border border-clima-lavender/50 text-xs font-semibold text-clima-purple dark:text-clima-lavender">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Autocuidado Gentil</span>
        </div>
        <h2 className="font-title text-3xl sm:text-4xl font-bold text-clima-purple dark:text-white">
          Pequenas atitudes, grandes mudanças.
        </h2>
        <p className="text-sm sm:text-base text-clima-purple/75 dark:text-gray-300">
          Você não precisa de uma rotina pesada de duas horas. Gestos de 2 a 5 minutos têm o poder de renovar sua atmosfera interna.
        </p>
      </div>

      {/* Daily Progress Banner */}
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-clima-lavender/40 via-clima-lilac/50 to-clima-yellow/40 dark:from-clima-dark-card dark:via-purple-950/30 dark:to-clima-dark-card border border-clima-lavender/60 dark:border-clima-dark-border shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <h3 className="font-title text-base sm:text-lg font-bold text-clima-purple dark:text-white">
              Seu cultivo de hoje
            </h3>
            <p className="text-xs text-clima-purple/70 dark:text-gray-300">
              {completedCount === 0 
                ? 'Nenhuma atitude marcada ainda. Comece com um copo de água!' 
                : `${completedCount} microatitude(s) concluída(s). Continue nutrindo seu bem-estar.`}
            </p>
          </div>
          <div className="text-right">
            <span className="font-title text-2xl font-extrabold text-clima-purple dark:text-clima-lavender">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-white/70 dark:bg-clima-dark rounded-full overflow-hidden p-0.5">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-clima-purple to-clima-pink dark:from-clima-lavender dark:to-clima-yellow transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-bold text-clima-purple/60 dark:text-gray-400 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Filtrar:</span>
        </span>
        <button
          onClick={() => setActiveFilter('recommended')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeFilter === 'recommended'
              ? 'bg-clima-purple text-white dark:bg-clima-lavender dark:text-clima-purple shadow-sm'
              : 'bg-white dark:bg-clima-dark-card text-clima-purple/80 dark:text-gray-300 border border-clima-lilac dark:border-clima-dark-border hover:bg-clima-lilac/30'
          }`}
        >
          Para seu clima atual ({currentForecast?.weather?.name || 'Ensolarado'})
        </button>
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeFilter === 'all'
              ? 'bg-clima-purple text-white dark:bg-clima-lavender dark:text-clima-purple shadow-sm'
              : 'bg-white dark:bg-clima-dark-card text-clima-purple/80 dark:text-gray-300 border border-clima-lilac dark:border-clima-dark-border hover:bg-clima-lilac/30'
          }`}
        >
          Todas ({totalCount})
        </button>
        {['Corpo', 'Mente', 'Descanso', 'Alma'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === cat
                ? 'bg-clima-purple text-white dark:bg-clima-lavender dark:text-clima-purple shadow-sm'
                : 'bg-white dark:bg-clima-dark-card text-clima-purple/80 dark:text-gray-300 border border-clima-lilac dark:border-clima-dark-border hover:bg-clima-lilac/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Suggestions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSuggestions.map((item) => {
          const isDone = completedSelfCare.includes(item.id);

          return (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border-2 transition-all duration-200 flex flex-col justify-between relative group ${
                isDone
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/40 shadow-xs'
                  : 'bg-white/80 dark:bg-clima-dark-card border-clima-lilac dark:border-clima-dark-border shadow-soft hover:shadow-soft-lg hover:border-clima-lavender'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-clima-lilac/50 dark:bg-clima-dark flex items-center justify-center">
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-clima-lilac/40 dark:bg-clima-dark text-clima-purple dark:text-clima-lavender">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-clima-purple/60 dark:text-gray-400">
                        ⏱️ {item.duration}
                      </span>
                    </div>
                    <h4 className={`font-title text-base sm:text-lg font-bold mt-1 ${
                      isDone 
                        ? 'line-through text-gray-400 dark:text-gray-500' 
                        : 'text-clima-purple dark:text-white'
                    }`}>
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* Checkbox Button */}
                <button
                  type="button"
                  onClick={() => toggleSelfCareHabit(item.id)}
                  className="p-1 text-clima-purple/60 hover:text-clima-purple dark:text-gray-400 dark:hover:text-white transition-transform active:scale-90"
                  title={isDone ? 'Marcar como não concluído' : 'Marcar como concluído'}
                  aria-label={item.title}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600 hover:text-clima-lavender" />
                  )}
                </button>
              </div>

              <p className="text-xs sm:text-sm text-clima-purple/80 dark:text-gray-300 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Special Interactive Trigger for Breathing exercise */}
              {item.hasInteractiveExercise && (
                <div className="pt-3 border-t border-clima-lilac/50 dark:border-clima-dark-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                    Exercício guiado disponível
                  </span>
                  <button
                    onClick={() => setIsBreathingModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl font-title text-xs font-bold bg-teal-500/15 hover:bg-teal-500/25 text-teal-700 dark:text-teal-300 flex items-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Iniciar Respiração Guiada</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}
