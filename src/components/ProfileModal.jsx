import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WEATHER_OPTIONS } from '../data/weatherData';
import { 
  User, 
  X, 
  Flame, 
  Calendar, 
  Download, 
  Save, 
  Sparkles, 
  Heart,
  Check
} from 'lucide-react';

export default function ProfileModal() {
  const { 
    isProfileModalOpen, 
    setIsProfileModalOpen, 
    user, 
    updateUserProfile, 
    history,
    showToast 
  } = useApp();

  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || '');

  if (!isProfileModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({ name, bio });
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      user,
      history,
      exportedAt: new Date().toISOString()
    }, null, 2));

    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `clima-interior-dados-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Dados exportados em arquivo JSON!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-clima-purple/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-clima-dark-card border border-clima-lavender dark:border-clima-dark-border shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsProfileModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-clima-purple/60 hover:text-clima-purple dark:text-gray-400 dark:hover:text-white hover:bg-clima-lilac/30 dark:hover:bg-clima-dark transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Avatar */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-clima-lilac/60 dark:border-clima-dark-border">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-clima-lavender to-clima-yellow flex items-center justify-center text-3xl shadow-soft">
            ⛅
          </div>
          <div>
            <h3 className="font-title text-xl font-bold text-clima-purple dark:text-white">
              {user.name}
            </h3>
            <span className="text-xs text-clima-purple/60 dark:text-gray-400">
              Cultivando autocuidado diário
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-clima-lilac/30 dark:bg-clima-dark border border-clima-lilac/50 dark:border-clima-dark-border flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Ofensiva</span>
              <span className="font-title text-base font-extrabold text-clima-purple dark:text-white">
                {user.streakDays || 4} dias
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-clima-lilac/30 dark:bg-clima-dark border border-clima-lilac/50 dark:border-clima-dark-border flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Check-ins</span>
              <span className="font-title text-base font-extrabold text-clima-purple dark:text-white">
                {history.length} feitos
              </span>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleSave} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-clima-purple/70 dark:text-clima-lavender mb-1 uppercase tracking-wider">
              Como gostaria de ser chamado:
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-clima-white dark:bg-clima-dark border border-clima-lilac dark:border-clima-dark-border text-sm text-clima-purple dark:text-white focus:outline-none focus:ring-2 focus:ring-clima-lavender"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-clima-purple/70 dark:text-clima-lavender mb-1 uppercase tracking-wider">
              Lema pessoal ou intenção:
            </label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-clima-white dark:bg-clima-dark border border-clima-lilac dark:border-clima-dark-border text-sm text-clima-purple dark:text-white focus:outline-none focus:ring-2 focus:ring-clima-lavender"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl font-title text-xs font-bold bg-clima-purple hover:bg-[#3D2E4D] dark:bg-clima-lavender dark:text-clima-purple text-white shadow-soft transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Salvar alterações</span>
          </button>
        </form>

        {/* Export Data */}
        <div className="pt-4 border-t border-clima-lilac/40 dark:border-clima-dark-border">
          <button
            type="button"
            onClick={handleExportData}
            className="w-full py-2 rounded-xl text-xs font-semibold text-clima-purple/75 dark:text-gray-300 hover:text-clima-purple dark:hover:text-white hover:bg-clima-lilac/30 dark:hover:bg-clima-dark flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Exportar meus registros (JSON)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
