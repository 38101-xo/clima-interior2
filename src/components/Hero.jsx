import React from 'react';
import { useApp } from '../context/AppContext';
import { HeroIllustration } from './WeatherIllustrations';
import { Sparkles, ArrowRight, Heart, ShieldCheck, SunDim, Smile } from 'lucide-react';

export default function Hero() {
  const { setActiveTab, user, currentForecast } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background soft ambient orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10">
        <div className="absolute top-0 right-10 w-72 h-72 rounded-full bg-clima-yellow/25 dark:bg-clima-yellow/10 blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-4 left-10 w-80 h-80 rounded-full bg-clima-lavender/30 dark:bg-clima-purple/20 blur-3xl" />
        <div className="absolute top-20 left-1/3 w-60 h-60 rounded-full bg-clima-pink/25 dark:bg-clima-pink/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Copy on left, Hero illustration on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-clima-lilac/70 dark:bg-clima-dark-card border border-clima-lavender/60 dark:border-clima-dark-border shadow-sm text-xs md:text-sm font-semibold text-clima-purple dark:text-clima-lavender">
              <span className="w-2 h-2 rounded-full bg-clima-yellow animate-ping" />
              <span>{getGreeting()}, {user?.name || 'viajante'}!</span>
              <span className="text-clima-purple/40 dark:text-gray-500">•</span>
              <span className="text-clima-purple/80 dark:text-gray-300">Boletim meteorológico da alma</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-clima-purple dark:text-white leading-[1.15]">
              Como está o tempo <br className="hidden sm:inline" />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-clima-purple via-[#765B96] to-[#BD6484] dark:from-clima-lavender dark:via-clima-pink dark:to-clima-yellow">
                aí dentro hoje?
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-clima-purple/80 dark:text-gray-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Descubra seu clima interior e comece o dia respeitando o seu próprio ritmo. 
              Assim como olhamos a previsão lá fora para levar um guarda-chuva ou óculos escuros, entender seu mundo interno transforma sua jornada.
            </p>

            {/* Slogan highlight */}
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-clima-dark-card/60 border border-clima-lilac dark:border-clima-dark-border max-w-xl mx-auto lg:mx-0 backdrop-blur-sm shadow-soft">
              <p className="text-sm italic font-medium text-clima-purple/90 dark:text-clima-lilac">
                “Antes de enfrentar o mundo, confira como está o seu mundo interior.”
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => setActiveTab('checkin')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-title text-lg font-bold bg-clima-purple dark:bg-clima-lavender text-clima-white dark:text-clima-purple shadow-soft-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                <span>Consultar meu clima</span>
                <span className="text-2xl group-hover:rotate-12 transition-transform">☁️</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {currentForecast && (
                <button
                  onClick={() => setActiveTab('forecast')}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl font-title text-base font-semibold bg-white/80 dark:bg-clima-dark-card border border-clima-lavender/60 dark:border-clima-dark-border text-clima-purple dark:text-clima-lavender hover:bg-clima-lilac/40 transition-all flex items-center justify-center gap-2"
                >
                  <span>Ver última previsão ({currentForecast.weather?.emoji})</span>
                </button>
              )}
            </div>

            {/* Trust mini stats */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-clima-purple/70 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Privado e Seguro</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Lúdico & Acolhedor</span>
              </div>
              <div className="flex items-center gap-1.5">
                <SunDim className="w-4 h-4 text-amber-500" />
                <span>Sem diagnósticos clínicos</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Weather Illustration Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/90 via-clima-lilac/30 to-white/60 dark:from-clima-dark-card dark:via-clima-dark-card/90 dark:to-clima-dark-card/60 border border-clima-lilac dark:border-clima-dark-border shadow-soft-lg backdrop-blur-md">
              
              {/* Header inside illustration card */}
              <div className="flex items-center justify-between pb-4 border-b border-clima-lilac/50 dark:border-clima-dark-border">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-clima-purple/60 dark:text-gray-400 uppercase tracking-wider">
                  Radar do Dia
                </span>
              </div>

              {/* Big Illustration */}
              <div className="py-6 flex items-center justify-center">
                <HeroIllustration className="w-56 h-56 sm:w-64 sm:h-64" />
              </div>

              {/* Floating micro status cards */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-white/90 dark:bg-clima-dark/70 border border-clima-lilac/70 dark:border-clima-dark-border flex items-center justify-between text-xs">
                  <span className="font-medium text-clima-purple/80 dark:text-gray-300">Tempo estimado de check-in:</span>
                  <span className="font-bold text-clima-purple dark:text-clima-lavender bg-clima-lilac/50 dark:bg-clima-dark-card px-2.5 py-0.5 rounded-full">
                    ~ 60 segundos
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/90 dark:bg-clima-dark/70 border border-clima-lilac/70 dark:border-clima-dark-border flex items-center justify-between text-xs">
                  <span className="font-medium text-clima-purple/80 dark:text-gray-300">Lembrete carinhoso:</span>
                  <span className="font-semibold text-[#8B5E83] dark:text-clima-pink">
                    Seu ritmo é o ritmo certo
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 3 Pillar Cards below hero */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-clima-dark-card border border-clima-lilac/60 dark:border-clima-dark-border shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-clima-yellow/40 dark:bg-clima-yellow/20 flex items-center justify-center text-2xl mb-4">
              ☀️
            </div>
            <h3 className="font-title text-lg font-bold text-clima-purple dark:text-white mb-2">
              Previsão sem julgamento
            </h3>
            <p className="text-sm text-clima-purple/75 dark:text-gray-300 leading-relaxed">
              Todos os climas têm um papel. Ninguém precisa estar ensolarado 365 dias por ano. Aqui acolhemos cada nuvem.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 dark:bg-clima-dark-card border border-clima-lilac/60 dark:border-clima-dark-border shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-clima-lavender/40 dark:bg-clima-lavender/20 flex items-center justify-center text-2xl mb-4">
              🌱
            </div>
            <h3 className="font-title text-lg font-bold text-clima-purple dark:text-white mb-2">
              Microatitudes sob medida
            </h3>
            <p className="text-sm text-clima-purple/75 dark:text-gray-300 leading-relaxed">
              Sugestões gentis de autocuidado conectadas ao seu estado de espírito e ao nível real da sua bateria hoje.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 dark:bg-clima-dark-card border border-clima-lilac/60 dark:border-clima-dark-border shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-clima-blue/40 dark:bg-clima-blue/20 flex items-center justify-center text-2xl mb-4">
              📊
            </div>
            <h3 className="font-title text-lg font-bold text-clima-purple dark:text-white mb-2">
              Sua bússola ao longo do tempo
            </h3>
            <p className="text-sm text-clima-purple/75 dark:text-gray-300 leading-relaxed">
              Visualize os padrões da sua semana e mês em gráficos limpos, entendendo quais estações você atravessou.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
