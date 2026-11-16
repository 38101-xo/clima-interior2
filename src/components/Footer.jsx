import React from 'react';
import { useApp } from '../context/AppContext';
import { CloudSun, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const { setActiveTab, setIsAboutModalOpen, setIsPlusModalOpen } = useApp();

  return (
    <footer className="mt-20 border-t border-clima-lilac/70 dark:border-clima-dark-border bg-white/60 dark:bg-clima-dark/60 backdrop-blur-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-clima-lavender via-clima-lilac to-clima-yellow flex items-center justify-center shadow-soft">
                <CloudSun className="w-5 h-5 text-clima-purple" />
              </div>
              <span className="font-title text-xl font-bold tracking-tight text-clima-purple dark:text-white">
                CLIMA INTERIOR
              </span>
            </div>

            <p className="text-sm font-medium text-clima-purple/80 dark:text-gray-300 max-w-md italic">
              “Antes de enfrentar o mundo, confira como está o seu mundo interior.”
            </p>

            <p className="text-xs text-clima-purple/70 dark:text-gray-400 max-w-lg leading-relaxed">
              O Clima Interior nasceu de uma pergunta simples: e se pudéssemos consultar como estamos nos sentindo da mesma forma que consultamos a previsão do tempo? Uma plataforma leve, sem julgamentos e feita para acolher você.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-title text-xs font-bold uppercase tracking-wider text-clima-purple dark:text-clima-lavender">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs font-medium text-clima-purple/80 dark:text-gray-300">
              <li>
                <button 
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-clima-purple dark:hover:text-white transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('checkin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-clima-purple dark:hover:text-white transition-colors"
                >
                  Fazer Check-in Emocional
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('selfcare'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-clima-purple dark:hover:text-white transition-colors"
                >
                  Pequenas atitudes (Autocuidado)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('week'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-clima-purple dark:hover:text-white transition-colors"
                >
                  Sua semana por dentro
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('history'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-clima-purple dark:hover:text-white transition-colors"
                >
                  Histórico & Gráfico
                </button>
              </li>
            </ul>
          </div>

          {/* Premium & About */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-title text-xs font-bold uppercase tracking-wider text-clima-purple dark:text-clima-lavender">
              Comunidade & Projeto
            </h4>
            <ul className="space-y-2 text-xs font-medium text-clima-purple/80 dark:text-gray-300">
              <li>
                <button 
                  onClick={() => setIsAboutModalOpen(true)}
                  className="hover:text-clima-purple dark:hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Sobre o conceito</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsPlusModalOpen(true)}
                  className="hover:text-clima-purple dark:hover:text-white transition-colors flex items-center gap-1.5 text-clima-purple dark:text-clima-yellow font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Clima Interior PLUS</span>
                </button>
              </li>
              <li className="text-gray-400 pt-2 text-[11px] leading-tight">
                Design editorial acolhedor • Desenvolvido com React, Vite & Tailwind CSS.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Banner with Slogan & Disclaimer */}
        <div className="mt-12 pt-8 border-t border-clima-lilac/50 dark:border-clima-dark-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-clima-purple/70 dark:text-gray-400">
          
          <p className="font-title font-semibold text-center sm:text-left text-clima-purple dark:text-clima-lavender">
            “Nem todo dia precisa ser ensolarado. Todos os seus climas merecem espaço.”
          </p>

          <p className="text-center sm:text-right">
            CLIMA INTERIOR — Descubra sua previsão. Respeite seu ritmo.
          </p>

        </div>

      </div>
    </footer>
  );
}
