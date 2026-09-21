import React, { useState } from 'react';
import { 
  Search, 
  Coins, 
  Volume2, 
  VolumeX, 
  Heart, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown,
  Gift,
  Tv,
  Glasses,
  Flame,
  Check
} from 'lucide-react';
import { WaterWindLogo } from './WaterWindLogo';
import { UserState } from '../types';

interface HeaderProps {
  userState: UserState;
  onOpenTokenStore: () => void;
  onToggleSound: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  onToggleFavoritesView: () => void;
  showingFavorites: boolean;
  onLogoClick: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  userState,
  onOpenTokenStore,
  onToggleSound,
  searchQuery,
  onSearchChange,
  onSelectTag,
  onToggleFavoritesView,
  showingFavorites,
  onLogoClick,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const quickTags = ['latina', 'dance', 'cosplay', 'lovense', 'couples', 'men', 'trans', 'gamer', 'hd', 'vr'];

  return (
    <header className="sticky top-0 z-40 bg-[#12141a] border-b border-[#222632] shadow-xl select-none">
      {/* Top promotional bar */}
      <div className="bg-gradient-to-r from-[#9b111e] via-[#e51c38] to-[#9b111e] text-white text-xs py-1 px-4 flex items-center justify-between text-center font-medium tracking-wide">
        <div className="hidden sm:flex items-center gap-1.5 opacity-90">
          <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-pulse" />
          <span>¡OFERTA RELÁMPAGO DE FICHAS!</span>
        </div>
        <div className="flex-1 text-center font-semibold text-[11px] sm:text-xs">
          🎁 Obtén hasta un <span className="underline decoration-amber-300 font-extrabold text-amber-300">+48% de Fichas GRATIS</span> en recargas hoy
        </div>
        <button 
          id="claim-promo-btn"
          onClick={onOpenTokenStore}
          className="bg-amber-400 hover:bg-amber-300 text-black px-2.5 py-0.5 rounded text-[11px] font-bold shadow transition flex items-center gap-1 cursor-pointer"
        >
          <Gift className="w-3 h-3" />
          Reclamar Bono
        </button>
      </div>

      {/* Main navigation row */}
      <div className="max-w-[1720px] mx-auto px-3 sm:px-5 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Logo and Primary Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            id="site-logo"
            onClick={onLogoClick} 
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            title="singue Inicio"
          >
            <WaterWindLogo className="w-10 h-10 group-hover:scale-105 transition transform" />
            <div className="flex flex-col text-left leading-none">
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif] lowercase">
                  singue
                </span>
                <span className="text-cyan-400 text-xl sm:text-2xl font-black">.</span>
              </div>
              <span className="text-[9px] font-bold tracking-widest text-cyan-300/80 uppercase">
                AGUA & VIENTO • EN VIVO
              </span>
            </div>
          </button>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            <button 
              onClick={() => { onSelectCategory('all'); }}
              className="px-3 py-1.5 rounded-md text-white hover:bg-[#1f232d] transition flex items-center gap-1.5"
            >
              <Tv className="w-4 h-4 text-[#ff2a4b]" />
              Shows en Vivo
            </button>
            <button 
              onClick={() => { onSelectCategory('vr'); }}
              className="px-3 py-1.5 rounded-md text-[#9da5b4] hover:text-white hover:bg-[#1f232d] transition flex items-center gap-1.5"
            >
              <Glasses className="w-4 h-4 text-purple-400" />
              VR 360°
              <span className="bg-purple-600/30 text-purple-300 text-[10px] font-extrabold px-1.5 py-0.2 rounded border border-purple-500/40">
                3D
              </span>
            </button>
            <button 
              onClick={() => { onSelectCategory('interactive'); }}
              className="px-3 py-1.5 rounded-md text-[#9da5b4] hover:text-white hover:bg-[#1f232d] transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Juguetes Lovense
            </button>
          </nav>
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#757d8f]" />
            <input
              id="model-search-input"
              type="text"
              placeholder="Buscar modelos, etiquetas (#latina, #dance)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
              className="w-full bg-[#181b22] border border-[#2b303e] focus:border-[#ff2a4b] text-sm text-white placeholder-[#687082] rounded-full pl-9 pr-8 py-2 focus:outline-none transition shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#757d8f] hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick tags dropdown when search is focused */}
          {searchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#191c24] border border-[#2e3342] rounded-xl p-3 shadow-2xl z-50">
              <div className="text-[11px] font-bold text-[#838c9e] uppercase tracking-wider mb-2">
                Etiquetas populares en directo
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    onMouseDown={() => {
                      onSearchChange(tag);
                      onSelectTag(tag);
                    }}
                    className="bg-[#242936] hover:bg-[#ff2a4b] text-[#c2c8d5] hover:text-white px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Audio toggle button */}
          <button
            id="sound-toggle-btn"
            onClick={onToggleSound}
            title={userState.soundEnabled ? 'Silenciar sonidos de sala' : 'Activar efectos de sala'}
            className={`p-2 rounded-lg border transition cursor-pointer ${
              userState.soundEnabled 
                ? 'bg-[#1e232e] border-[#313747] text-white hover:bg-[#282e3d]' 
                : 'bg-[#181b22] border-transparent text-[#6d7587] hover:text-white'
            }`}
          >
            {userState.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Favorites filter toggle */}
          <button
            id="favorites-toggle-btn"
            onClick={onToggleFavoritesView}
            title="Mis Modelos Favoritas"
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border transition text-xs font-semibold cursor-pointer ${
              showingFavorites
                ? 'bg-rose-950/40 border-[#ff2a4b] text-[#ff2a4b]'
                : 'bg-[#181b22] border-[#2b303e] text-[#a1a9b8] hover:text-white hover:border-[#3d4457]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showingFavorites ? 'fill-[#ff2a4b] text-[#ff2a4b]' : ''}`} />
            <span className="hidden sm:inline">Favoritas</span>
            <span className="bg-[#2a303f] px-1.5 py-0.2 rounded-full text-[10px] text-white font-bold">
              {userState.favorites.length}
            </span>
          </button>

          {/* Token Balance & Buy Tokens button */}
          <div className="flex items-center">
            <button
              id="header-tokens-balance"
              onClick={onOpenTokenStore}
              className="flex items-center gap-1.5 bg-[#1a1e28] hover:bg-[#222734] border border-[#333a4d] px-2.5 sm:px-3 py-1.5 rounded-l-lg text-amber-400 font-bold text-xs sm:text-sm transition cursor-pointer"
              title="Tu saldo de fichas para propinas"
            >
              <Coins className="w-4 h-4 text-amber-400 fill-amber-400/30" />
              <span>{userState.tokens.toLocaleString()}</span>
              <span className="text-[10px] text-[#8e98aa] hidden sm:inline">Fichas</span>
            </button>

            <button
              id="header-buy-tokens-btn"
              onClick={onOpenTokenStore}
              className="bg-gradient-to-r from-[#ff2a4b] to-[#dc1836] hover:from-[#ff415f] hover:to-[#ee2140] text-white px-3 sm:px-3.5 py-1.5 rounded-r-lg text-xs font-extrabold flex items-center gap-1 shadow-md shadow-red-950/30 transition cursor-pointer"
            >
              <span>+ Comprar</span>
              <span className="bg-amber-300 text-black text-[9px] font-black px-1 rounded hidden md:inline animate-pulse">
                BONO
              </span>
            </button>
          </div>

          {/* User Profile Avatar with dropdown */}
          <div className="relative">
            <button
              id="user-profile-menu-btn"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-1.5 bg-[#1a1e27] border border-[#2e3444] hover:border-[#40495e] p-1.5 sm:px-2 sm:py-1 rounded-lg transition cursor-pointer"
            >
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white font-bold text-xs shadow">
                VIP
              </div>
              <span className="hidden xl:inline text-xs font-semibold text-[#c7cdd9]">
                {userState.username}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#737c8e] hidden sm:inline" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#181b23] border border-[#2e3343] rounded-xl shadow-2xl p-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-[#292e3c] mb-1">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>{userState.username}</span>
                    <span className="bg-amber-500/20 text-amber-300 font-extrabold text-[10px] px-1.5 py-0.5 rounded border border-amber-500/30">
                      VIP GOLD
                    </span>
                  </div>
                  <div className="text-[#7d8697] text-[11px] mt-0.5">
                    Saldo: <span className="text-amber-400 font-bold">{userState.tokens} fichas</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onOpenTokenStore();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#232835] text-amber-300 font-semibold flex items-center gap-2"
                >
                  <Coins className="w-4 h-4" />
                  Recargar Fichas (+Bonos)
                </button>

                <button
                  onClick={() => {
                    onToggleFavoritesView();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#232835] text-[#b4bccb] flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 text-[#ff2a4b]" />
                  Modelos Favoritas ({userState.favorites.length})
                </button>

                <div className="border-t border-[#292e3c] my-1"></div>

                <div className="px-3 py-1.5 text-[10px] text-[#6d7586]">
                  ID Miembro: #SC-98214-X
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#181b22] border border-[#2b303e] text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Collapse */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#161820] border-b border-[#292f3d] p-4 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => { onSelectCategory('all'); setMobileMenuOpen(false); }}
              className="flex-1 bg-[#222734] text-white py-2 px-3 rounded-lg text-xs font-semibold text-center"
            >
              En Vivo
            </button>
            <button 
              onClick={() => { onSelectCategory('vr'); setMobileMenuOpen(false); }}
              className="flex-1 bg-[#222734] text-purple-300 py-2 px-3 rounded-lg text-xs font-semibold text-center"
            >
              VR 360°
            </button>
            <button 
              onClick={() => { onSelectCategory('interactive'); setMobileMenuOpen(false); }}
              className="flex-1 bg-[#222734] text-amber-300 py-2 px-3 rounded-lg text-xs font-semibold text-center"
            >
              Juguetes
            </button>
          </div>

          <div className="border-t border-[#272c3a] pt-2 flex items-center justify-between text-xs text-[#8c96a7]">
            <span>Saldo: {userState.tokens} Fichas</span>
            <button 
              onClick={() => { onOpenTokenStore(); setMobileMenuOpen(false); }}
              className="text-[#ff2a4b] font-bold"
            >
              Comprar Fichas →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
