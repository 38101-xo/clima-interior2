import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getWeatherIllustration } from './WeatherIllustrations';
import { 
  Bookmark, 
  RotateCcw, 
  Share2, 
  Sparkles, 
  Check, 
  Heart, 
  Battery, 
  Coffee, 
  Info,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function ForecastResult() {
  const { currentForecast, saveCurrentForecast, setActiveTab, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!currentForecast) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-clima-lilac dark:bg-clima-dark-card flex items-center justify-center text-3xl">
          ☁️
        </div>
        <h3 className="font-title text-2xl font-bold text-clima-purple dark:text-white mb-2">
          Nenhuma previsão gerada ainda
        </h3>
        <p className="text-sm text-clima-purple/70 dark:text-gray-300 mb-6">
          Faça seu check-in de 1 minuto para descobrir o tempo do seu mundo interior.
        </p>
        <button
          onClick={() => setActiveTab('checkin')}
          className="px-6 py-3 rounded-2xl font-title font-bold bg-clima-purple dark:bg-clima-lavender text-white dark:text-clima-purple shadow-soft"
        >
          Fazer check-in agora ☁️
        </button>
      </div>
    );
  }

  const { weather, energy, need, notes, saved, dateFormatted } = currentForecast;

  // Personalized Advice combination based on weather and need
  const getTailoredAdvice = () => {
    switch (need?.id) {
      case 'descansar':
        return 'Sua prioridade hoje é descansar: feche os olhos por 10 minutos, desligue as notificações e solte o peso dos ombros sem culpa.';
      case 'organizar':
        return 'Sua prioridade hoje é se organizar: anote em um papel as três coisas essenciais para hoje e descarte a urgência do restante.';
      case 'distrair':
        return 'Sua prioridade hoje é se distrair: escute seu podcast favorito, assista a um vídeo divertido ou dê uma volta relaxante.';
      case 'conversar':
        return 'Sua prioridade hoje é conversar: mande uma mensagem curta para alguém que você ama ou compartilhe como está seu dia.';
      case 'momento-meu':
        return 'Sua prioridade hoje é um momento só seu: prepare uma bebida quente, coloque fones de ouvido e aproveite a sua própria companhia.';
      default:
        return 'Reserve pequenas pausas no decorrer do dia para beber água e respirar fundo.';
    }
  };

  const handleShare = () => {
    const text = `Meu boletim no Clima Interior de hoje: ${weather.emoji} ${weather.name} | Disposição: ${energy.label} | Foco: ${need.label}. "Antes de enfrentar o mundo, confira como está o seu mundo interior." ☁️`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      showToast('Boletim copiado para a área de transferência!', 'success');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Top Banner Tag */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-clima-lilac/70 dark:bg-clima-dark-card border border-clima-lavender/60 text-xs font-semibold text-clima-purple dark:text-clima-lavender shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Boletim do Dia • {dateFormatted || 'Hoje'}</span>
        </div>
      </div>

      {/* Main Forecast Card */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-10 border-2 bg-gradient-to-b ${weather.lightBg} dark:${weather.darkBg} ${weather.borderColor} shadow-soft-lg transition-all`}>
        
        {/* Subtle decorative circles */}
        <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-white/40 dark:bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-clima-lavender/30 dark:bg-purple-900/20 blur-2xl pointer-events-none" />

        {/* Card Header & Status */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-clima-purple/10 dark:border-white/10 relative z-10">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-clima-purple/60 dark:text-gray-400">
              Previsão Emocional
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-3xl">{weather.emoji}</span>
              <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-clima-purple dark:text-white">
                {weather.name}
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              saved 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300' 
                : 'bg-clima-yellow/60 text-clima-purple dark:bg-yellow-950/60 dark:text-yellow-200 border border-amber-300'
            }`}>
              {saved ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Salvo no Histórico</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3 h-3" />
                  <span>Não salvo</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Central Display: Illustration + Message */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          
          {/* Weather Illustration */}
          <div className="md:col-span-4 flex items-center justify-center">
            <div className="p-4 rounded-3xl bg-white/60 dark:bg-clima-dark/60 backdrop-blur-sm border border-white/60 dark:border-white/10 shadow-soft">
              {getWeatherIllustration(weather.id, { className: 'w-40 h-40 sm:w-48 sm:h-48', animated: true })}
            </div>
          </div>

          {/* Headline & Forecast Message */}
          <div className="md:col-span-8 space-y-4">
            <h3 className="font-title text-xl sm:text-2xl font-bold text-clima-purple dark:text-white leading-tight">
              {weather.headline}
            </h3>

            <p className="text-base sm:text-lg text-clima-purple/90 dark:text-gray-200 leading-relaxed font-normal">
              {weather.forecastTemplate}
            </p>

            {/* User personal note, if entered */}
            {notes && (
              <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-clima-dark/60 border border-clima-purple/10 dark:border-white/10 text-xs sm:text-sm text-clima-purple/80 dark:text-gray-300 italic">
                <span className="font-semibold not-italic">Sua anotação: </span>
                “{notes}”
              </div>
            )}
          </div>

        </div>

        {/* Gauge & Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-clima-purple/10 dark:border-white/10 relative z-10">
          
          {/* Energy Level Gauge */}
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-clima-dark/70 border border-white/60 dark:border-white/10 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-clima-purple/70 dark:text-gray-300 flex items-center gap-1.5">
                <Battery className="w-4 h-4 text-clima-purple dark:text-clima-lavender" />
                <span>Nível de Disposição</span>
              </span>
              <span className="font-extrabold text-clima-purple dark:text-white">
                {energy.label} ({energy.percent}%)
              </span>
            </div>

            <div className="w-full h-3 bg-clima-lilac/60 dark:bg-clima-dark rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-clima-pink via-clima-yellow to-clima-lavender transition-all duration-700"
                style={{ width: `${energy.percent}%` }}
              />
            </div>
            <p className="text-[11px] text-clima-purple/70 dark:text-gray-400">
              {energy.percent <= 40 ? 'Bateria baixa: reduza o ritmo e conserve sua energia.' : 'Bateria boa: canalize seu fluxo respeitando seus limites.'}
            </p>
          </div>

          {/* Core Need Box */}
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-clima-dark/70 border border-white/60 dark:border-white/10 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-clima-purple/70 dark:text-gray-300 flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-clima-purple dark:text-clima-lavender" />
                <span>Necessidade do Momento</span>
              </span>
              <span className="font-extrabold text-clima-purple dark:text-white">
                {need.label}
              </span>
            </div>
            <p className="text-xs text-clima-purple/80 dark:text-gray-300 leading-snug">
              {need.description}
            </p>
          </div>

        </div>

        {/* Tailored Self-Care Tip Card */}
        <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-clima-lavender/30 via-white/80 to-clima-pink/30 dark:from-purple-950/40 dark:via-clima-dark/80 dark:to-pink-950/30 border border-clima-lavender/60 dark:border-purple-800/40 relative z-10">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-clima-purple text-white dark:bg-clima-lavender dark:text-clima-purple flex-shrink-0 mt-0.5">
              <Heart className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="font-title text-sm font-bold text-clima-purple dark:text-white">
                Sugestão de Autocuidado para o seu céu de hoje:
              </h4>
              <p className="text-xs sm:text-sm text-clima-purple/85 dark:text-gray-200 leading-relaxed">
                {getTailoredAdvice()}
              </p>
            </div>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="mt-8 pt-6 border-t border-clima-purple/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10">
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!saved ? (
              <button
                onClick={saveCurrentForecast}
                className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl font-title text-sm sm:text-base font-bold bg-clima-purple dark:bg-clima-lavender text-white dark:text-clima-purple shadow-soft hover:shadow-soft-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                <span>Salvar minha previsão</span>
              </button>
            ) : (
              <button
                disabled
                className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl font-title text-sm sm:text-base font-bold bg-emerald-600 text-white shadow-soft flex items-center justify-center gap-2 cursor-default"
              >
                <Check className="w-4 h-4" />
                <span>Previsão salva!</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="p-3.5 rounded-2xl bg-white/80 dark:bg-clima-dark/80 border border-clima-lilac dark:border-clima-dark-border text-clima-purple dark:text-white hover:bg-clima-lilac/40 transition-colors shadow-xs"
              title="Copiar boletim para compartilhar"
              aria-label="Compartilhar previsão"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => setActiveTab('checkin')}
              className="text-xs sm:text-sm font-semibold text-clima-purple/75 dark:text-gray-300 hover:text-clima-purple dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Refazer check-in</span>
            </button>

            <button
              onClick={() => setActiveTab('selfcare')}
              className="px-5 py-3 rounded-2xl font-title text-xs sm:text-sm font-bold bg-white/90 dark:bg-clima-dark-card border border-clima-lavender text-clima-purple dark:text-clima-lavender hover:bg-clima-lilac/30 transition-all flex items-center gap-2"
            >
              <span>Ver práticas de autocuidado</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Ethical Disclaimer Warning */}
      <div className="mt-6 p-4 rounded-2xl bg-clima-lilac/40 dark:bg-clima-dark-card/50 border border-clima-lavender/40 dark:border-clima-dark-border flex items-start gap-3 text-xs text-clima-purple/75 dark:text-gray-400">
        <ShieldAlert className="w-4 h-4 text-clima-purple/60 dark:text-clima-lavender flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-clima-purple dark:text-gray-200">Aviso importante:</strong> O Clima Interior é uma experiência lúdica e afetuosa de reflexão e autocuidado diário. Não constitui diagnóstico psicológico ou médico e não substitui a escuta de profissionais de saúde mental.
        </p>
      </div>

    </section>
  );
}
