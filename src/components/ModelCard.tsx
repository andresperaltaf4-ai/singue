import React, { useState } from 'react';
import { 
  Heart, 
  Tv, 
  Glasses, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Coins, 
  Play, 
  Maximize2 
} from 'lucide-react';
import { Model } from '../types';

interface ModelCardProps {
  model: Model;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectModel: (model: Model) => void;
  onQuickTip: (model: Model, amount: number) => void;
  soundEnabled: boolean;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  model,
  isFavorite,
  onToggleFavorite,
  onSelectModel,
  onQuickTip,
  soundEnabled,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewSound, setPreviewSound] = useState(false);

  const goalPercentage = Math.min(100, Math.round((model.currentGoal.current / model.currentGoal.target) * 100));

  return (
    <div 
      id={`model-card-${model.id}`}
      className="group bg-[#161821] hover:bg-[#1c202a] border border-[#242938] hover:border-[#3a4258] rounded-xl overflow-hidden shadow-lg transition duration-200 flex flex-col cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPreviewSound(false);
      }}
      onClick={() => onSelectModel(model)}
    >
      {/* Video / Thumbnail Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0d0f14]">
        
        {/* Stream Image / Preview */}
        <img
          src={isHovered && model.secondaryImageUrl ? model.secondaryImageUrl : model.imageUrl}
          alt={model.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Live Stream Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

        {/* Top-Left: LIVE Badge & Viewers */}
        <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
          <span className="bg-[#ff2a4b] text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-sm flex items-center gap-1 shadow-md uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            EN VIVO
          </span>
          <span className="bg-black/70 backdrop-blur-xs text-white/90 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
            👁 {model.viewers.toLocaleString()}
          </span>
        </div>

        {/* Top-Right: Feature Badges (HD, VR, Toy) */}
        <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
          {model.hasToy && (
            <span 
              title={`Juguete interactivo conectado (${model.toyName || 'Lovense'})`}
              className="bg-purple-600/90 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow animate-pulse"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>VIBRA</span>
            </span>
          )}
          {model.isHD && (
            <span className="bg-sky-600/90 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
              HD
            </span>
          )}
          {model.isVR && (
            <span className="bg-indigo-600/90 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
              VR
            </span>
          )}
        </div>

        {/* Hover Quick Action Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center gap-3 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200 z-20 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Big Play / Enter Room Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectModel(model);
            }}
            className="w-12 h-12 rounded-full bg-[#ff2a4b] hover:bg-[#ff3d5c] text-white flex items-center justify-center shadow-xl shadow-red-950/60 transform hover:scale-110 transition cursor-pointer"
            title="Entrar a la Sala en Vivo"
          >
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </button>

          {/* Quick Sound preview button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPreviewSound(!previewSound);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition cursor-pointer ${
              previewSound ? 'bg-emerald-500 text-white' : 'bg-black/70 hover:bg-black text-white'
            }`}
            title={previewSound ? 'Silenciar preview' : 'Escuchar audio de la sala'}
          >
            {previewSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Favorite Toggle button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(model.id);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition cursor-pointer ${
              isFavorite ? 'bg-rose-600 text-white' : 'bg-black/70 hover:bg-black text-white hover:text-rose-400'
            }`}
            title={isFavorite ? 'Quitar de favoritas' : 'Añadir a favoritas'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom of thumbnail: CURRENT GOAL PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 right-0 p-2 z-10 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-1.5 border border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-[10px] font-bold text-white/95 mb-1 leading-none">
              <span className="truncate pr-1">
                🎯 {model.currentGoal.title}
              </span>
              <span className="text-amber-400 shrink-0 font-extrabold">
                {model.currentGoal.current} / {model.currentGoal.target} tk
              </span>
            </div>
            
            {/* Progress Track */}
            <div className="w-full bg-[#272b38] h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-[#ff2a4b] rounded-full transition-all duration-500"
                style={{ width: `${goalPercentage}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Model Info Section below video */}
      <div className="p-2 sm:p-2.5 flex flex-col gap-1 flex-1 justify-between">
        <div>
          {/* Name, Age, Country Flag & Favorite Heart */}
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1 min-w-0">
              <h3 className="text-xs sm:text-sm font-black text-white truncate group-hover:text-[#ff2a4b] transition">
                {model.name}
              </h3>
              <span className="text-[11px] font-semibold text-[#8e98aa]">
                {model.age}
              </span>
              <span title={model.country} className="text-xs shrink-0">
                {model.countryCode}
              </span>
            </div>

            {/* Quick Tip Pill */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickTip(model, 1);
              }}
              title="Mandar 1 Ficha rápida"
              className="bg-[#242938] hover:bg-amber-500 hover:text-black text-amber-400 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-extrabold flex items-center gap-0.5 transition shrink-0 cursor-pointer"
            >
              <Coins className="w-2.5 h-2.5 text-amber-400 group-hover/btn:text-black" />
              <span>1 tk</span>
            </button>
          </div>

          {/* Model status line */}
          <p className="text-[11px] text-[#9aa4b6] line-clamp-1 mt-0.5">
            {model.statusMessage}
          </p>
        </div>

        {/* Tags row */}
        <div className="flex items-center gap-1 overflow-hidden pt-0.5">
          {model.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="text-[9px] text-[#717b8f] bg-[#1d212b] px-1 py-0.2 rounded font-medium truncate"
            >
              #{tag}
            </span>
          ))}
          {model.tags.length > 3 && (
            <span className="text-[9px] text-[#555d6e]">
              +{model.tags.length - 3}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
