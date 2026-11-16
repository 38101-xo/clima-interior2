import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WEATHER_OPTIONS, ENERGY_LEVELS, NEEDS_OPTIONS } from '../data/weatherData';
import { getWeatherIllustration } from './WeatherIllustrations';
import { 
  Calendar, 
  Sparkles, 
  CheckCircle, 
  HelpCircle, 
  Battery, 
  Compass, 
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';

export default function WeekSummary() {
  const { history, setActiveTab } = useApp();
  const [selectedDayRecord, setSelectedDayRecord] = useState(null);

  // Generate the last 7 calendar days ending today
  const today = new Date();
  const daysArray = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Look for matching real record in history
    const match = history.find(h => {
      if (!h.date) return false;
      const hDate = new Date(h.date).toISOString().split('T')[0];
      return hDate === dateStr;
    });

    const isToday = i === 0;

    daysArray.push({
      dateObj: d,
      dateStr,
      dayNumber: d.getDate(),
      dayName: d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').toUpperCase(),
      fullDateStr: d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', weekday: 'long' }),
      isToday,
      record: match || null
    });
  }

  // Calculate real week statistics
  const recordedDays = daysArray.filter(d => d.record !== null);
  const totalRecorded = recordedDays.length;

  let predominantWeather = null;
  let averageEnergyPercent = 0;
  let topNeed = null;

  if (totalRecorded > 0) {
    // Count weather frequencies
    const weatherCounts = {};
    let totalEnergyScore = 0;
    const needCounts = {};

    recordedDays.forEach(({ record }) => {
      weatherCounts[record.weatherId] = (weatherCounts[record.weatherId] || 0) + 1;
      const energyObj = ENERGY_LEVELS.find(e => e.id === record.energyId);
      if (energyObj) {
        totalEnergyScore += energyObj.percent;
      }
      needCounts[record.needId] = (needCounts[record.needId] || 0) + 1;
    });

    // Top weather
    let maxWeatherCount = 0;
    let topWeatherId = null;
    Object.entries(weatherCounts).forEach(([wid, cnt]) => {
      if (cnt > maxWeatherCount) {
        maxWeatherCount = cnt;
        topWeatherId = wid;
      }
    });
    predominantWeather = WEATHER_OPTIONS.find(w => w.id === topWeatherId);

    // Avg energy
    averageEnergyPercent = Math.round(totalEnergyScore / totalRecorded);

    // Top need
    let maxNeedCount = 0;
    let topNeedId = null;
    Object.entries(needCounts).forEach(([nid, cnt]) => {
      if (cnt > maxNeedCount) {
        maxNeedCount = cnt;
        topNeedId = nid;
      }
    });
    topNeed = NEEDS_OPTIONS.find(n => n.id === topNeedId);
  }

  return (
    <section className="py-8 md:py-12 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clima-lilac/70 dark:bg-clima-dark-card border border-clima-lavender/50 text-xs font-semibold text-clima-purple dark:text-clima-lavender">
          <Calendar className="w-3.5 h-3.5" />
          <span>Panorama Semanal</span>
        </div>
        <h2 className="font-title text-3xl sm:text-4xl font-bold text-clima-purple dark:text-white">
          Sua semana por dentro
        </h2>
        <p className="text-sm sm:text-base text-clima-purple/75 dark:text-gray-300">
          Acompanhe o mapa do tempo dos últimos sete dias. Olhar para trás com ternura ajuda a reconhecer padrões e valorizar seus ciclos.
        </p>
      </div>

      {/* 7 Days Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
        {daysArray.map((day) => {
          const hasRecord = !!day.record;
          const weatherObj = hasRecord ? (WEATHER_OPTIONS.find(w => w.id === day.record.weatherId) || WEATHER_OPTIONS[0]) : null;
          const isSelected = selectedDayRecord && selectedDayRecord.dateStr === day.dateStr;

          return (
            <div
              key={day.dateStr}
              onClick={() => hasRecord && setSelectedDayRecord(day)}
              className={`p-4 rounded-3xl border-2 flex flex-col justify-between transition-all duration-200 text-center ${
                hasRecord
                  ? `cursor-pointer hover:scale-105 hover:shadow-soft-lg ${
                      isSelected 
                        ? 'border-clima-purple dark:border-clima-lavender ring-2 ring-clima-lavender/50 bg-clima-lilac/50 dark:bg-clima-dark-card-hover' 
                        : 'bg-white/90 dark:bg-clima-dark-card border-clima-lilac/80 dark:border-clima-dark-border'
                    }`
                  : 'bg-clima-white/40 dark:bg-clima-dark/30 border-dashed border-clima-lilac/60 dark:border-clima-dark-border opacity-70'
              }`}
            >
              {/* Day header */}
              <div className="pb-2 border-b border-clima-lilac/40 dark:border-clima-dark-border">
                <span className={`text-[11px] font-extrabold uppercase tracking-wider block ${
                  day.isToday ? 'text-clima-purple dark:text-clima-yellow font-black' : 'text-clima-purple/60 dark:text-gray-400'
                }`}>
                  {day.dayName} {day.isToday && '• HOJE'}
                </span>
                <span className="text-sm font-title font-bold text-clima-purple dark:text-white">
                  {day.dayNumber}
                </span>
              </div>

              {/* Weather icon or empty placeholder */}
              <div className="py-4 flex flex-col items-center justify-center min-h-[90px]">
                {hasRecord ? (
                  <>
                    <div className="w-12 h-12 flex items-center justify-center mb-1">
                      {getWeatherIllustration(weatherObj.id, { className: 'w-12 h-12', animated: false })}
                    </div>
                    <span className="font-title text-xs font-bold text-clima-purple dark:text-white truncate max-w-full">
                      {weatherObj.name}
                    </span>
                  </>
                ) : (
                  <div className="space-y-1.5">
                    <span className="text-xl opacity-40">〰️</span>
                    <span className="text-[11px] text-clima-purple/50 dark:text-gray-500 block leading-tight">
                      Sem registro
                    </span>
                    {day.isToday && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTab('checkin');
                        }}
                        className="mt-1 px-2 py-0.5 rounded-lg bg-clima-lavender text-[10px] font-bold text-clima-purple hover:bg-clima-lilac transition-colors"
                      >
                        Fazer
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom tag */}
              <div className="pt-2 border-t border-clima-lilac/40 dark:border-clima-dark-border">
                {hasRecord ? (
                  <span className="text-[10px] font-semibold text-clima-purple/70 dark:text-gray-300 block truncate">
                    {day.record.energyId ? `Bateria ${ENERGY_LEVELS.find(e => e.id === day.record.energyId)?.percent}%` : 'Concluído'}
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-400 block">—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Day Quick Inspector (if clicked) */}
      {selectedDayRecord && selectedDayRecord.record && (
        <div className="mb-10 p-6 rounded-3xl bg-white/95 dark:bg-clima-dark-card border border-clima-lavender dark:border-clima-dark-border shadow-soft-lg animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-clima-lilac dark:border-clima-dark-border">
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {WEATHER_OPTIONS.find(w => w.id === selectedDayRecord.record.weatherId)?.emoji}
              </span>
              <div>
                <span className="text-xs font-semibold text-clima-purple/60 dark:text-clima-lavender">
                  {selectedDayRecord.fullDateStr}
                </span>
                <h3 className="font-title text-xl font-bold text-clima-purple dark:text-white">
                  {WEATHER_OPTIONS.find(w => w.id === selectedDayRecord.record.weatherId)?.name}
                </h3>
              </div>
            </div>
            <button
              onClick={() => setSelectedDayRecord(null)}
              className="text-xs font-semibold text-clima-purple/60 hover:text-clima-purple dark:text-gray-400"
            >
              Fechar detalhe ✕
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="p-3 rounded-2xl bg-clima-lilac/30 dark:bg-clima-dark">
              <span className="text-xs text-clima-purple/60 dark:text-gray-400 block">Disposição:</span>
              <span className="font-bold text-clima-purple dark:text-white">
                {ENERGY_LEVELS.find(e => e.id === selectedDayRecord.record.energyId)?.label}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-clima-lilac/30 dark:bg-clima-dark">
              <span className="text-xs text-clima-purple/60 dark:text-gray-400 block">Necessidade:</span>
              <span className="font-bold text-clima-purple dark:text-white">
                {NEEDS_OPTIONS.find(n => n.id === selectedDayRecord.record.needId)?.label}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-clima-lilac/30 dark:bg-clima-dark">
              <span className="text-xs text-clima-purple/60 dark:text-gray-400 block">Anotação:</span>
              <span className="italic text-clima-purple/80 dark:text-gray-300">
                {selectedDayRecord.record.notes || 'Sem anotações no dia'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Real Insights Summary Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/90 via-clima-lilac/30 to-white/70 dark:from-clima-dark-card dark:via-clima-dark-card/80 dark:to-clima-dark-card/50 border border-clima-lilac dark:border-clima-dark-border shadow-soft">
        
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-clima-purple dark:text-clima-lavender" />
          <h3 className="font-title text-xl font-bold text-clima-purple dark:text-white">
            Síntese dos últimos 7 dias
          </h3>
        </div>

        {totalRecorded === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-clima-purple/70 dark:text-gray-300 mb-4">
              Ainda não há registros nos últimos 7 dias. Faça seu check-in diário para começar a construir seu mapa meteorológico!
            </p>
            <button
              onClick={() => setActiveTab('checkin')}
              className="px-6 py-2.5 rounded-2xl font-title text-sm font-bold bg-clima-purple dark:bg-clima-lavender text-white dark:text-clima-purple"
            >
              Fazer primeiro check-in ☁️
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Predominant Weather */}
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-clima-dark border border-clima-lilac/70 dark:border-clima-dark-border">
              <span className="text-xs uppercase tracking-wider font-bold text-clima-purple/60 dark:text-gray-400 block mb-1">
                Clima Predominante
              </span>
              <div className="flex items-center gap-2.5 mt-2">
                <span className="text-3xl">{predominantWeather?.emoji || '🌤️'}</span>
                <div>
                  <h4 className="font-title text-lg font-bold text-clima-purple dark:text-white">
                    {predominantWeather?.name || 'Variação suave'}
                  </h4>
                  <span className="text-xs text-clima-purple/70 dark:text-gray-400">
                    {totalRecorded} dia(s) registrados
                  </span>
                </div>
              </div>
            </div>

            {/* Average Battery */}
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-clima-dark border border-clima-lilac/70 dark:border-clima-dark-border">
              <span className="text-xs uppercase tracking-wider font-bold text-clima-purple/60 dark:text-gray-400 block mb-1">
                Média de Energia
              </span>
              <div className="flex items-center gap-2.5 mt-2">
                <div className="p-2.5 rounded-xl bg-clima-lilac/50 dark:bg-clima-dark-card text-clima-purple dark:text-clima-lavender">
                  <Battery className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-title text-lg font-bold text-clima-purple dark:text-white">
                    {averageEnergyPercent}%
                  </h4>
                  <span className="text-xs text-clima-purple/70 dark:text-gray-400">
                    {averageEnergyPercent >= 60 ? 'Ritmo energizado' : 'Ritmo que pede gentileza'}
                  </span>
                </div>
              </div>
            </div>

            {/* Top Need */}
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-clima-dark border border-clima-lilac/70 dark:border-clima-dark-border">
              <span className="text-xs uppercase tracking-wider font-bold text-clima-purple/60 dark:text-gray-400 block mb-1">
                Necessidade Recorrente
              </span>
              <div className="flex items-center gap-2.5 mt-2">
                <div className="p-2.5 rounded-xl bg-clima-pink/50 dark:bg-clima-dark-card text-clima-purple dark:text-clima-pink">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-title text-lg font-bold text-clima-purple dark:text-white">
                    {topNeed?.label || 'Descansar'}
                  </h4>
                  <span className="text-xs text-clima-purple/70 dark:text-gray-400">
                    Seu corpo pedindo escuta
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

    </section>
  );
}
