import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WEATHER_OPTIONS, ENERGY_LEVELS, NEEDS_OPTIONS } from '../data/weatherData';
import { getWeatherIllustration } from './WeatherIllustrations';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  History as HistoryIcon, 
  Trash2, 
  RotateCcw, 
  Filter, 
  Calendar, 
  Battery, 
  Coffee, 
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function History() {
  const { history, clearHistory, restoreDemoHistory, setActiveTab, showToast } = useApp();
  const [filterPeriod, setFilterPeriod] = useState('all'); // 'week', 'month', 'all'
  const [confirmClearModal, setConfirmClearModal] = useState(false);

  // Filter history based on period
  const now = new Date();
  const filteredHistory = history.filter((item) => {
    if (!item.date) return false;
    const itemDate = new Date(item.date);
    const diffTime = Math.abs(now - itemDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (filterPeriod === 'week') return diffDays <= 7;
    if (filterPeriod === 'month') return diffDays <= 30;
    return true;
  });

  // Prepare chart data chronologically (oldest to newest)
  const chartData = [...filteredHistory]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => {
      const weather = WEATHER_OPTIONS.find(w => w.id === item.weatherId) || WEATHER_OPTIONS[0];
      const energy = ENERGY_LEVELS.find(e => e.id === item.energyId) || ENERGY_LEVELS[2];
      const need = NEEDS_OPTIONS.find(n => n.id === item.needId) || NEEDS_OPTIONS[0];
      const dateObj = new Date(item.date);
      const shortDate = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

      return {
        date: shortDate,
        fullDate: item.dateFormatted || shortDate,
        humorScore: weather.score,
        humorName: weather.name,
        emoji: weather.emoji,
        energyPercent: energy.percent,
        energyLabel: energy.label,
        needLabel: need.label,
        notes: item.notes
      };
    });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3.5 rounded-2xl bg-white dark:bg-clima-dark border border-clima-lilac dark:border-clima-dark-border shadow-lg text-xs space-y-1">
          <p className="font-bold text-clima-purple dark:text-white border-b border-clima-lilac/40 pb-1">
            {data.fullDate}
          </p>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-lg">{data.emoji}</span>
            <span className="font-semibold text-clima-purple dark:text-clima-lavender">
              {data.humorName}
            </span>
          </div>
          <p className="text-clima-purple/80 dark:text-gray-300">
            ⚡ Disposição: <strong>{data.energyLabel} ({data.energyPercent}%)</strong>
          </p>
          <p className="text-clima-purple/80 dark:text-gray-300">
            🌱 Necessidade: <strong>{data.needLabel}</strong>
          </p>
          {data.notes && (
            <p className="italic text-gray-400 dark:text-gray-500 pt-1 border-t border-clima-lilac/30">
              "{data.notes}"
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-8 md:py-12 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clima-lilac/70 dark:bg-clima-dark-card border border-clima-lavender/50 text-xs font-semibold text-clima-purple dark:text-clima-lavender">
          <HistoryIcon className="w-3.5 h-3.5" />
          <span>Diário Meteorológico Pessoal</span>
        </div>
        <h2 className="font-title text-3xl sm:text-4xl font-bold text-clima-purple dark:text-white">
          Meu histórico emocional
        </h2>
        <p className="text-sm sm:text-base text-clima-purple/75 dark:text-gray-300">
          Acompanhe como o seu clima interno flutuou ao longo dos dias. Observe seus ciclos sem cobranças e aprenda a acolher cada estação.
        </p>
      </div>

      {/* Filter and Action Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Period Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-clima-lilac/50 dark:bg-clima-dark-card border border-clima-lavender/40 w-full sm:w-auto">
          <button
            onClick={() => setFilterPeriod('week')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterPeriod === 'week'
                ? 'bg-white dark:bg-clima-dark text-clima-purple dark:text-white shadow-xs'
                : 'text-clima-purple/70 dark:text-gray-300 hover:text-clima-purple'
            }`}
          >
            Últimos 7 dias
          </button>
          <button
            onClick={() => setFilterPeriod('month')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterPeriod === 'month'
                ? 'bg-white dark:bg-clima-dark text-clima-purple dark:text-white shadow-xs'
                : 'text-clima-purple/70 dark:text-gray-300 hover:text-clima-purple'
            }`}
          >
            Últimos 30 dias
          </button>
          <button
            onClick={() => setFilterPeriod('all')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterPeriod === 'all'
                ? 'bg-white dark:bg-clima-dark text-clima-purple dark:text-white shadow-xs'
                : 'text-clima-purple/70 dark:text-gray-300 hover:text-clima-purple'
            }`}
          >
            Todos os registros ({history.length})
          </button>
        </div>

        {/* Clear and Demo helpers */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          {history.length > 0 && (
            <button
              onClick={() => setConfirmClearModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar histórico</span>
            </button>
          )}

          {history.length === 0 && (
            <button
              onClick={restoreDemoHistory}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-clima-purple dark:text-clima-lavender bg-clima-lilac/50 dark:bg-clima-dark-card border border-clima-lavender/50 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Preencher com dados de exemplo</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Chart Card */}
      {chartData.length > 1 && (
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-clima-dark-card border border-clima-lilac dark:border-clima-dark-border shadow-soft">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-clima-lilac/40 dark:border-clima-dark-border">
            <div>
              <h3 className="font-title text-lg font-bold text-clima-purple dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-clima-purple dark:text-clima-lavender" />
                <span>Evolução do Clima e Disposição</span>
              </h3>
              <p className="text-xs text-clima-purple/60 dark:text-gray-400">
                Linha lilás: Clima Interior • Barra gradiente: Bateria e energia
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-xs text-clima-purple/70 dark:text-gray-300">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-clima-lavender" /> Clima
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-clima-yellow" /> Disposição
              </span>
            </div>
          </div>

          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="humorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8B6E2" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#EAE2F4" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAE2F4" opacity={0.6} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fill: '#6B5780' }} 
                  axisLine={{ stroke: '#C8B6E2', strokeWidth: 1 }} 
                  tickLine={false} 
                />
                <YAxis 
                  domain={[1, 5]} 
                  ticks={[1, 2, 3, 4, 5]}
                  tick={{ fontSize: 11, fill: '#6B5780' }}
                  tickFormatter={(val) => {
                    switch (val) {
                      case 5: return '☀️';
                      case 4: return '⛅';
                      case 3: return '☁️';
                      case 2: return '🌧️';
                      case 1: return '⛈️';
                      default: return '';
                    }
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="humorScore" 
                  stroke="#7E63A8" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#humorGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Records List / Table */}
      {filteredHistory.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white/60 dark:bg-clima-dark-card/50 border border-dashed border-clima-lilac dark:border-clima-dark-border p-8">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-clima-lilac/40 dark:bg-clima-dark flex items-center justify-center text-3xl">
            📅
          </div>
          <h4 className="font-title text-xl font-bold text-clima-purple dark:text-white mb-2">
            Nenhum registro encontrado neste período
          </h4>
          <p className="text-sm text-clima-purple/70 dark:text-gray-400 max-w-md mx-auto mb-6">
            Você pode realizar um check-in hoje ou restaurar os dados de demonstração para testar as visualizações.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('checkin')}
              className="px-6 py-2.5 rounded-2xl font-title text-sm font-bold bg-clima-purple dark:bg-clima-lavender text-white dark:text-clima-purple shadow-soft"
            >
              Fazer check-in ☁️
            </button>
            <button
              onClick={restoreDemoHistory}
              className="px-5 py-2.5 rounded-2xl font-title text-sm font-semibold bg-white dark:bg-clima-dark border border-clima-lavender text-clima-purple dark:text-clima-lavender"
            >
              Restaurar dados de exemplo
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="font-title text-lg font-bold text-clima-purple dark:text-white mb-3">
            Histórico Detalhado ({filteredHistory.length} registros)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHistory.map((item) => {
              const weather = WEATHER_OPTIONS.find(w => w.id === item.weatherId) || WEATHER_OPTIONS[0];
              const energy = ENERGY_LEVELS.find(e => e.id === item.energyId) || ENERGY_LEVELS[2];
              const need = NEEDS_OPTIONS.find(n => n.id === item.needId) || NEEDS_OPTIONS[0];

              return (
                <div
                  key={item.id || item.date}
                  className="p-5 rounded-3xl bg-white/90 dark:bg-clima-dark-card border border-clima-lilac dark:border-clima-dark-border shadow-soft flex flex-col justify-between"
                >
                  <div>
                    {/* Top Date & Weather Name */}
                    <div className="flex items-center justify-between pb-3 border-b border-clima-lilac/40 dark:border-clima-dark-border mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{weather.emoji}</span>
                        <div>
                          <h4 className="font-title text-base font-bold text-clima-purple dark:text-white">
                            {weather.name}
                          </h4>
                          <span className="text-[11px] font-medium text-clima-purple/60 dark:text-gray-400">
                            {item.dateFormatted || new Date(item.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-clima-lilac/50 dark:bg-clima-dark text-clima-purple dark:text-clima-lavender">
                        {weather.badge}
                      </span>
                    </div>

                    {/* Disposição & Necessidade pills */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="p-2.5 rounded-xl bg-clima-lilac/20 dark:bg-clima-dark flex items-center gap-2">
                        <Battery className="w-4 h-4 text-clima-purple dark:text-clima-lavender flex-shrink-0" />
                        <div>
                          <span className="text-[10px] text-gray-500 block">Disposição</span>
                          <span className="font-bold text-clima-purple dark:text-white">
                            {energy.label} ({energy.percent}%)
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-clima-lilac/20 dark:bg-clima-dark flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-clima-purple dark:text-clima-lavender flex-shrink-0" />
                        <div>
                          <span className="text-[10px] text-gray-500 block">Necessidade</span>
                          <span className="font-bold text-clima-purple dark:text-white truncate block">
                            {need.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Notes, if present */}
                    {item.notes && (
                      <p className="text-xs text-clima-purple/80 dark:text-gray-300 italic p-2.5 rounded-xl bg-white/70 dark:bg-clima-dark/60 border border-clima-lilac/30">
                        “{item.notes}”
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Confirmation Modal to Clear History */}
      {confirmClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-clima-purple/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-clima-dark-card border border-clima-lavender dark:border-clima-dark-border p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-title text-xl font-bold text-clima-purple dark:text-white">
              Deseja limpar todo o seu histórico?
            </h3>
            <p className="text-sm text-clima-purple/75 dark:text-gray-300">
              Esta ação apagará permanentemente todos os seus check-ins gravados no navegador.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmClearModal(false)}
                className="px-5 py-2.5 rounded-xl border border-clima-lilac text-sm font-semibold text-clima-purple dark:text-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  clearHistory();
                  setConfirmClearModal(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-sm font-bold text-white shadow-soft"
              >
                Sim, limpar histórico
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
