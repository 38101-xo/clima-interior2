import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CloudSun, Heart, Sparkles, ShieldCheck } from 'lucide-react';

export default function AboutModal() {
  const { isAboutModalOpen, setIsAboutModalOpen } = useApp();

  if (!isAboutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-clima-purple/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 rounded-3xl bg-white dark:bg-clima-dark-card border border-clima-lavender dark:border-clima-dark-border shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAboutModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-clima-purple/60 hover:text-clima-purple dark:text-gray-400 dark:hover:text-white hover:bg-clima-lilac/30 dark:hover:bg-clima-dark transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-clima-lavender to-clima-yellow flex items-center justify-center text-clima-purple shadow-soft">
            <CloudSun className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-title text-xl font-bold text-clima-purple dark:text-white">
              Sobre o Clima Interior
            </h3>
            <span className="text-xs text-clima-purple/60 dark:text-gray-400">
              O manifesto da nossa previsão
            </span>
          </div>
        </div>

        {/* Concept Story */}
        <div className="space-y-4 text-sm text-clima-purple/85 dark:text-gray-300 leading-relaxed">
          <p className="font-medium text-base text-clima-purple dark:text-white">
            “O Clima Interior nasceu de uma pergunta simples: e se pudéssemos consultar como estamos nos sentindo da mesma forma que consultamos a previsão do tempo?”
          </p>

          <p>
            Diariamente abrimos aplicativos de clima para saber se precisamos de agasalho, se vai chover ou se o sol estará forte. No entanto, muitas vezes saímos para a correria do mundo sem ao menos perguntar como está o tempo dentro do próprio peito.
          </p>

          <p>
            O <strong>Clima Interior</strong> existe para transformar essa reflexão em um hábito leve, descomplicado e acolhedor. Nossa plataforma não julga suas emoções nem tenta forçar um positivismo tóxico: aqui, dias chuvosos, nublados ou de tempestade são tão válidos e necessários quanto manhãs ensolaradas.
          </p>

          <div className="p-4 rounded-2xl bg-clima-lilac/40 dark:bg-clima-dark border border-clima-lavender/40 my-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-clima-purple dark:text-clima-lavender uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Compromisso Ético & Lúdico</span>
            </div>
            <p className="text-xs text-clima-purple/80 dark:text-gray-300 leading-normal">
              Esta é uma experiência lúdica e afetuosa para incentivar o autoconhecimento e o autocuidado diário. Não pretendemos medir clinicamente estados de saúde nem diagnosticar quadros psicológicos. Respeite sempre seus limites e procure apoio profissional especializado quando necessário.
            </p>
          </div>

          <div className="pt-2 text-center border-t border-clima-lilac/40 dark:border-clima-dark-border">
            <p className="font-title text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-clima-purple via-[#7A5B96] to-[#BD6484] dark:from-clima-lavender dark:to-clima-yellow italic">
              “Nem todo dia precisa ser ensolarado. Todos os seus climas merecem espaço.”
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
