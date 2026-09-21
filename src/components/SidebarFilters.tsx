import React from 'react';
import { 
  X, 
  Sparkles, 
  Tv, 
  Glasses, 
  MapPin, 
  Tag, 
  RotateCcw,
  Volume2
} from 'lucide-react';

interface SidebarFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filterToyOnly: boolean;
  onToggleToyOnly: () => void;
  filterHDOnly: boolean;
  onToggleHDOnly: () => void;
  filterVROnly: boolean;
  onToggleVROnly: () => void;
  selectedCountry: string | null;
  onSelectCountry: (country: string | null) => void;
  selectedAgeRange: string | null;
  onSelectAgeRange: (range: string | null) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  isOpen,
  onClose,
  filterToyOnly,
  onToggleToyOnly,
  filterHDOnly,
  onToggleHDOnly,
  filterVROnly,
  onToggleVROnly,
  selectedCountry,
  onSelectCountry,
  selectedAgeRange,
  onSelectAgeRange,
  selectedTag,
  onSelectTag,
  onResetFilters,
  activeFilterCount,
}) => {
  if (!isOpen) return null;

  const countries = [
    { code: 'all', name: 'Todos los Países', flag: '🌍' },
    { code: 'Colombia', name: 'Colombia', flag: '🇨🇴' },
    { code: 'España', name: 'España', flag: '🇪🇸' },
    { code: 'México', name: 'México', flag: '🇲🇽' },
    { code: 'Brasil', name: 'Brasil', flag: '🇧🇷' },
    { code: 'Argentina', name: 'Argentina', flag: '🇦🇷' },
    { code: 'Ucrania', name: 'Ucrania', flag: '🇺🇦' },
    { code: 'Francia', name: 'Francia', flag: '🇫🇷' },
  ];

  const ageRanges = [
    { id: '18-21', label: '18 - 21 años' },
    { id: '22-25', label: '22 - 25 años' },
    { id: '26-30', label: '26 - 30 años' },
  ];

  const tags = [
    'latina', 'dance', 'cosplay', 'gamer', 'blonde', 'tattoo', 'fitness', 'abs', 'shemale', 'oil', 'feet'
  ];

  return (
    <aside className="w-64 bg-[#14171f] border-r border-[#232836] p-4 shrink-0 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-120px)] sticky top-28 z-20">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#232835]">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm text-white">Filtros de Búsqueda</span>
          {activeFilterCount > 0 && (
            <span className="bg-[#ff2a4b] text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              title="Restablecer filtros"
              className="text-[#848d9e] hover:text-white p-1 text-xs flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[#848d9e] hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold text-[#848e9f] uppercase tracking-wider">
          Características
        </span>
        
        {/* Interactive Toys */}
        <label className="flex items-center justify-between p-2 rounded-lg bg-[#1a1e27] hover:bg-[#202532] cursor-pointer transition">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Juguete Interactivo</span>
          </div>
          <input
            type="checkbox"
            checked={filterToyOnly}
            onChange={onToggleToyOnly}
            className="accent-[#ff2a4b] w-4 h-4 cursor-pointer"
          />
        </label>

        {/* HD Stream */}
        <label className="flex items-center justify-between p-2 rounded-lg bg-[#1a1e27] hover:bg-[#202532] cursor-pointer transition">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Tv className="w-3.5 h-3.5 text-sky-400" />
            <span>Solo Transmisión HD</span>
          </div>
          <input
            type="checkbox"
            checked={filterHDOnly}
            onChange={onToggleHDOnly}
            className="accent-[#ff2a4b] w-4 h-4 cursor-pointer"
          />
        </label>

        {/* VR 360 */}
        <label className="flex items-center justify-between p-2 rounded-lg bg-[#1a1e27] hover:bg-[#202532] cursor-pointer transition">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Glasses className="w-3.5 h-3.5 text-indigo-400" />
            <span>Soporte VR 360°</span>
          </div>
          <input
            type="checkbox"
            checked={filterVROnly}
            onChange={onToggleVROnly}
            className="accent-[#ff2a4b] w-4 h-4 cursor-pointer"
          />
        </label>
      </div>

      {/* Country / Region */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold text-[#848e9f] uppercase tracking-wider flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          País / Región
        </span>
        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto pr-1">
          {countries.map((c) => {
            const isSelected = (c.code === 'all' && selectedCountry === null) || selectedCountry === c.code;
            return (
              <button
                key={c.code}
                onClick={() => onSelectCountry(c.code === 'all' ? null : c.code)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#ff2a4b]/20 text-[#ff4361] font-bold border border-[#ff2a4b]/40'
                    : 'text-[#9ea7b7] hover:bg-[#1f2430] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </div>
                {isSelected && <span className="text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Age Ranges */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold text-[#848e9f] uppercase tracking-wider">
          Rango de Edad
        </span>
        <div className="grid grid-cols-1 gap-1">
          {ageRanges.map((range) => {
            const isSelected = selectedAgeRange === range.id;
            return (
              <button
                key={range.id}
                onClick={() => onSelectAgeRange(isSelected ? null : range.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#ff2a4b] text-white font-bold'
                    : 'bg-[#1a1e27] text-[#9fa8b8] hover:bg-[#212634] hover:text-white'
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold text-[#848e9f] uppercase tracking-wider flex items-center gap-1">
          <Tag className="w-3.5 h-3.5" />
          Etiquetas Populares
        </span>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => onSelectTag(isSelected ? null : tag)}
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#ff2a4b] text-white font-bold'
                    : 'bg-[#1d212b] text-[#939cae] hover:text-white hover:bg-[#272d3b]'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset button if active filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={onResetFilters}
          className="mt-2 w-full py-2 bg-[#212634] hover:bg-[#2c3245] text-white text-xs font-bold rounded-lg transition border border-[#303749] flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Limpiar Todos los Filtros ({activeFilterCount})
        </button>
      )}

    </aside>
  );
};
