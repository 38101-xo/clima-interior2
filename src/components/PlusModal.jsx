import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  X, 
  Check, 
  FileText, 
  Palette, 
  Headphones, 
  ShieldCheck, 
  Ban, 
  Heart,
  Crown,
  Zap
} from 'lucide-react';

export default function PlusModal() {
  const { isPlusModalOpen, setIsPlusModalOpen, showToast } = useApp();
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' or 'annual'
  const [interestSubmitted, setInterestSubmitted] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  if (!isPlusModalOpen) return null;

  const handleInterestSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setInterestSubmitted(true);
      showToast('🎉 Parabéns! Você está na lista de espera VIP do Clima Interior Plus.', 'success');
    }
  };

  const premiumFeatures = [
    {
      icon: FileText,
      title: 'Relatórios mensais personalizados',
      description: 'Receba mensalmente um mapa aprofundado dos seus ciclos emocionais com correlações e insights de autocuidado.'
    },
    {
      icon: Palette,
      title: 'Temas e atmosferas exclusivas',
      description: 'Desbloqueie paletas visuais exclusivas como Aurora Boreal, Céu Estrelado Ártico e Pôr do Sol Dourado.'
    },
    {
      icon: Headphones,
      title: 'Sons imersivos da natureza',
      description: 'Gerador sonoro com chuva em folhagens, ventos serenos de outono e lareira crepitante para focar ou dormir.'
    },
    {
      icon: Heart,
      title: 'Ferramentas avançadas de reflexão',
      description: 'Mais de 30 meditações curtas guiadas, diário de gratidão e exercícios somáticos para soltar a sobrecarga.'
    },
    {
      icon: Ban,
      title: 'Experiência 100% pura e sem anúncios',
      description: 'Um refúgio digital silencioso, sem qualquer distração comercial para sua paz mental.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-clima-purple/70 dark:bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-white dark:bg-clima-dark-card border-2 border-clima-lavender dark:border-clima-dark-border shadow-2xl p-6 sm:p-10 overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-clima-yellow/40 via-clima-pink/30 to-clima-lavender/40 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsPlusModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-clima-purple/60 hover:text-clima-purple dark:text-gray-400 dark:hover:text-white hover:bg-clima-lilac/30 dark:hover:bg-clima-dark transition-colors z-10"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badge */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-clima-lavender to-clima-pink text-clima-purple text-xs font-black uppercase tracking-wider shadow-xs">
            <Crown className="w-3.5 h-3.5" />
            <span>Versão Premium em Prévia</span>
          </div>

          <h2 className="font-title text-3xl sm:text-4xl font-extrabold text-clima-purple dark:text-white">
            CLIMA INTERIOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BD6484] to-[#7E63A8] dark:from-clima-pink dark:to-clima-yellow">PLUS</span>
          </h2>

          <p className="text-sm sm:text-base text-clima-purple/80 dark:text-gray-300 max-w-md mx-auto">
            Aprofunde seu autoconhecimento diário com relatórios meteorológicos avançados e experiências exclusivas.
          </p>
        </div>

        {/* Billing Switch */}
        <div className="flex items-center justify-center mb-8">
          <div className="p-1 rounded-2xl bg-clima-lilac/50 dark:bg-clima-dark border border-clima-lavender/50 flex items-center text-xs font-bold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-clima-dark-card text-clima-purple dark:text-white shadow-xs'
                  : 'text-clima-purple/70 dark:text-gray-400'
              }`}
            >
              Plano Mensal (R$ 14,90/mês)
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white dark:bg-clima-dark-card text-clima-purple dark:text-white shadow-xs'
                  : 'text-clima-purple/70 dark:text-gray-400'
              }`}
            >
              <span>Plano Anual (R$ 9,90/mês)</span>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px]">
                33% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Features Showcase List */}
        <div className="space-y-3 mb-8">
          {premiumFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="p-3.5 rounded-2xl bg-white/70 dark:bg-clima-dark/60 border border-clima-lilac/70 dark:border-clima-dark-border flex items-start gap-3.5 shadow-xs"
              >
                <div className="p-2 rounded-xl bg-gradient-to-tr from-clima-lilac to-clima-lavender dark:from-purple-950 dark:to-indigo-950 text-clima-purple dark:text-clima-lavender flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-title text-sm font-bold text-clima-purple dark:text-white">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-clima-purple/75 dark:text-gray-300 leading-snug">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Waitlist / Preview Action */}
        {!interestSubmitted ? (
          <form onSubmit={handleInterestSubmit} className="space-y-3">
            <div className="p-4 rounded-2xl bg-clima-lilac/40 dark:bg-clima-dark/80 border border-clima-lavender/50 text-center">
              <span className="text-xs font-bold text-clima-purple dark:text-clima-lavender block mb-1">
                Gostaria de testar antecipadamente?
              </span>
              <p className="text-xs text-clima-purple/70 dark:text-gray-400 mb-3">
                Deixe seu e-mail para receber 30 dias de acesso gratuito assim que a versão Plus for liberada:
              </p>

              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-clima-dark border border-clima-lilac dark:border-clima-dark-border text-xs text-clima-purple dark:text-white focus:outline-none focus:ring-2 focus:ring-clima-lavender"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-title text-xs font-bold bg-clima-purple hover:bg-[#392C48] dark:bg-clima-lavender dark:text-clima-purple text-white shadow-soft transition-all"
                >
                  Entrar na lista VIP ✨
                </button>
              </div>
            </div>

            <p className="text-[11px] text-center text-clima-purple/60 dark:text-gray-400">
              * Sem cobranças reais neste protótipo. Apresentação conceitual para parceiros e investidores.
            </p>
          </form>
        ) : (
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-1">
            <span className="text-2xl">🌱</span>
            <h4 className="font-title text-sm font-bold text-emerald-800 dark:text-emerald-300">
              Você está na lista prioritária!
            </h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Avisaremos você em primeira mão com 30 dias de cortesia.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
