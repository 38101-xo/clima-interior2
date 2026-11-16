import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WEATHER_OPTIONS, ENERGY_LEVELS, NEEDS_OPTIONS } from '../data/weatherData';
import { getWeatherIllustration } from './WeatherIllustrations';
import { 
  Sparkles, 
  BatteryLow, 
  BatteryMedium, 
  Battery, 
  BatteryCharging, 
  Zap, 
  CheckCircle2, 
  Moon, 
  ListChecks, 
  MessageCircle, 
  Coffee,
  HelpCircle,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export default function CheckIn() {
  const { generateForecast, currentForecast, setActiveTab } = useApp();

  const [selectedWeather, setSelectedWeather] = useState(currentForecast?.weatherId || 'ensolarado');
  const [selectedEnergy, setSelectedEnergy] = useState(currentForecast?.energyId || 'media');
  const [selectedNeed, setSelectedNeed] = useState(currentForecast?.needId || 'descansar');
  const [notes, setNotes] = useState(currentForecast?.notes || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingMessage, setGeneratingMessage] = useState('Analisando o céu interior...');

  const getEnergyIcon = (id) => {
    switch (id) {
      case 'muito-baixa': return <BatteryLow className="w-5 h-5 text-rose-500" />;
      case 'baixa': return <BatteryMedium className="w-5 h-5 text-amber-500" />;
      case 'media': return <Battery className="w-5 h-5 text-yellow-500" />;
      case 'alta': return <BatteryCharging className="w-5 h-5 text-emerald-500" />;
      case 'muito-alta': return <Zap className="w-5 h-5 text-emerald-600 animate-pulse" />;
      default: return <Battery className="w-5 h-5" />;
    }
  };

  const getNeedIcon = (id) => {
    switch (id) {
      case 'descansar': return <Moon className="w-5 h-5 text-purple-400" />;
      case 'organizar': return <ListChecks className="w-5 h-5 text-blue-400" />;
      case 'distrair': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'conversar': return <MessageCircle className="w-5 h-5 text-pink-400" />;
      case 'momento-meu': return <Coffee className="w-5 h-5 text-teal-400" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    const messages = [
      'Mapeando correntes e ventos internos...',
      'Calibrando o barômetro emocional...',
      'Consultando o radar do autocuidado...',
      'Tudo pronto para você!'
    ];

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < messages.length) {
        setGeneratingMessage(messages[step]);
      } else {
        clearInterval(interval);
        generateForecast({
          weatherId: selectedWeather,
          energyId: selectedEnergy,
          needId: selectedNeed,
          notes
        });
        setIsGenerating(false);
      }
    }, 450);
  };

  // Quick reset
  const handleReset = () => {
    setSelectedWeather('ensolarado');
    setSelectedEnergy('media');
    setSelectedNeed('descansar');
    setNotes('');
  };

  return (
    <section className="py-8 md:py-12 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clima-lilac/70 dark:bg-clima-dark-card border border-clima-lavender/50 text-xs font-semibold text-clima-purple dark:text-clima-lavender">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Check-in Emocional Diário</span>
        </div>
        <h2 className="font-title text-3xl sm:text-4xl font-bold text-clima-purple dark:text-white">
          Como está o seu tempo hoje?
        </h2>
        <p className="text-sm sm:text-base text-clima-purple/75 dark:text-gray-300">
          Tire 1 minuto para se escutar com gentileza. Não existe resposta certa ou errada — apenas o seu momento presente.
        </p>
      </div>

      {/* Main Check-in Form */}
      <form onSubmit={handleSubmit} className="space-y-12">
        
        {/* PERGUNTA 1: Clima Emocional */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-clima-dark-card border border-clima-lilac dark:border-clima-dark-border shadow-soft">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-clima-lilac/50 dark:border-clima-dark-border pb-4">
            <div>
              <span className="text-xs font-bold text-clima-purple/60 dark:text-clima-lavender tracking-wider uppercase">
                Passo 1 de 3
              </span>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-clima-purple dark:text-white">
                Se seu humor fosse uma previsão do tempo, como estaria hoje?
              </h3>
            </div>
            <span className="text-xs text-clima-purple/60 dark:text-gray-400 self-start sm:self-center">
              Escolha uma opção
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WEATHER_OPTIONS.map((item) => {
              const isSelected = selectedWeather === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedWeather(item.id)}
                  className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 flex flex-col justify-between relative group ${
                    isSelected
                      ? `bg-gradient-to-br ${item.lightBg} dark:${item.darkBg} ${item.borderColor} shadow-soft-lg scale-[1.02] ring-2 ring-clima-lavender/50`
                      : 'bg-clima-white dark:bg-clima-dark/60 border-clima-lilac/80 dark:border-clima-dark-border hover:border-clima-lavender hover:bg-clima-lilac/20 dark:hover:bg-clima-dark-card-hover'
                  }`}
                >
                  {/* Selected checkmark indicator */}
                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 text-clima-purple dark:text-clima-yellow">
                      <CheckCircle2 className="w-5 h-5 fill-current text-white dark:text-clima-purple" />
                    </div>
                  )}

                  {/* Header inside card */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {getWeatherIllustration(item.id, { className: 'w-12 h-12', animated: isSelected })}
                    </div>
                    <div>
                      <span className="text-2xl mr-1 sm:hidden">{item.emoji}</span>
                      <h4 className="font-title text-base sm:text-lg font-bold text-clima-purple dark:text-white">
                        {item.name}
                      </h4>
                      <span className="text-xs font-medium text-clima-purple/60 dark:text-gray-400">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-clima-purple/80 dark:text-gray-300 leading-snug">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* PERGUNTA 2: Disposição */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-clima-dark-card border border-clima-lilac dark:border-clima-dark-border shadow-soft">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-clima-lilac/50 dark:border-clima-dark-border pb-4">
            <div>
              <span className="text-xs font-bold text-clima-purple/60 dark:text-clima-lavender tracking-wider uppercase">
                Passo 2 de 3
              </span>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-clima-purple dark:text-white">
                Como está sua disposição hoje?
              </h3>
            </div>
            <span className="text-xs text-clima-purple/60 dark:text-gray-400">
              Nível de energia
            </span>
          </div>

          {/* Interactive Energy Selector */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {ENERGY_LEVELS.map((lvl) => {
                const isSelected = selectedEnergy === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSelectedEnergy(lvl.id)}
                    className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 group ${
                      isSelected
                        ? 'border-clima-purple dark:border-clima-lavender bg-clima-lilac/60 dark:bg-clima-dark-card-hover shadow-sm scale-105'
                        : 'border-clima-lilac dark:border-clima-dark-border bg-white dark:bg-clima-dark/50 hover:bg-clima-lilac/20'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-white dark:bg-clima-dark shadow-xs group-hover:scale-110 transition-transform">
                      {getEnergyIcon(lvl.id)}
                    </div>
                    <span className="font-title text-sm font-bold text-clima-purple dark:text-white">
                      {lvl.label}
                    </span>
                    <span className="text-xs font-semibold text-clima-purple/70 dark:text-gray-300">
                      {lvl.percent}%
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Visual Battery Bar */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-clima-purple/60 dark:text-gray-400 mb-1">
                <span>Indicador de Bateria Interna</span>
                <span>
                  {ENERGY_LEVELS.find(l => l.id === selectedEnergy)?.label} (
                  {ENERGY_LEVELS.find(l => l.id === selectedEnergy)?.percent}%)
                </span>
              </div>
              <div className="w-full h-3.5 bg-clima-lilac/50 dark:bg-clima-dark rounded-full overflow-hidden p-0.5 border border-clima-lavender/30">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-clima-pink via-clima-yellow to-clima-lavender transition-all duration-500"
                  style={{
                    width: `${ENERGY_LEVELS.find(l => l.id === selectedEnergy)?.percent || 50}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* PERGUNTA 3: Necessidade do Momento */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-clima-dark-card border border-clima-lilac dark:border-clima-dark-border shadow-soft">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-clima-lilac/50 dark:border-clima-dark-border pb-4">
            <div>
              <span className="text-xs font-bold text-clima-purple/60 dark:text-clima-lavender tracking-wider uppercase">
                Passo 3 de 3
              </span>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-clima-purple dark:text-white">
                O que você mais precisa neste momento?
              </h3>
            </div>
            <span className="text-xs text-clima-purple/60 dark:text-gray-400">
              Sua prioridade de cuidado
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {NEEDS_OPTIONS.map((need) => {
              const isSelected = selectedNeed === need.id;
              return (
                <button
                  key={need.id}
                  type="button"
                  onClick={() => setSelectedNeed(need.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-clima-purple dark:border-clima-lavender bg-clima-lilac/70 dark:bg-clima-dark-card-hover shadow-soft scale-[1.02]'
                      : 'border-clima-lilac dark:border-clima-dark-border bg-white dark:bg-clima-dark/50 hover:bg-clima-lilac/20'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-clima-white dark:bg-clima-dark shadow-xs flex-shrink-0">
                    {getNeedIcon(need.id)}
                  </div>
                  <div>
                    <h4 className="font-title text-sm font-bold text-clima-purple dark:text-white mb-0.5">
                      {need.label}
                    </h4>
                    <p className="text-xs text-clima-purple/70 dark:text-gray-300 leading-snug">
                      {need.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Optional Quick Note */}
          <div className="mt-6 pt-6 border-t border-clima-lilac/40 dark:border-clima-dark-border">
            <label className="block text-xs font-bold text-clima-purple/70 dark:text-clima-lavender mb-2 uppercase tracking-wider">
              Anotação rápida para você mesmo (Opcional):
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Dormi tarde ontem, mas empolgado para o lançamento..."
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-clima-dark border border-clima-lilac dark:border-clima-dark-border text-sm text-clima-purple dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-clima-lavender transition-all"
              maxLength={140}
            />
            <span className="text-[11px] text-gray-400 mt-1 block text-right">
              {notes.length}/140 caracteres
            </span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs sm:text-sm font-medium text-clima-purple/60 dark:text-gray-400 hover:text-clima-purple dark:hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Redefinir escolhas</span>
          </button>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl font-title text-lg font-bold bg-gradient-to-r from-clima-purple to-[#684C82] hover:from-[#3E304D] hover:to-[#553C6D] dark:from-clima-lavender dark:to-clima-pink text-white dark:text-clima-purple shadow-soft-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>{generatingMessage}</span>
              </>
            ) : (
              <>
                <span>Gerar minha previsão</span>
                <span className="text-xl">✨</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </form>
    </section>
  );
}
