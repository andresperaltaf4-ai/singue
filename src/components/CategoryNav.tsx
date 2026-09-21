import React from 'react';
import { 
  Users, 
  Flame, 
  Sparkles, 
  Tv, 
  Glasses, 
  SlidersHorizontal, 
  ArrowUpDown,
  User,
  HeartHandshake
} from 'lucide-react';
import { CategoryType } from '../types';

interface CategoryNavProps {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  sortBy: 'viewers' | 'popular' | 'goal' | 'new';
  onSortChange: (sort: 'viewers' | 'popular' | 'goal' | 'new') => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  totalCounts: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  sidebarOpen,
  onToggleSidebar,
  totalCounts,
}) => {
  const categories: { id: CategoryType; label: string; icon?: React.ReactNode; badge?: string }[] = [
    { id: 'all', label: 'Todos los Shows', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'girls', label: 'Chicas', icon: <User className="w-3.5 h-3.5" />, badge: `${totalCounts.girls || 7}` },
    { id: 'couples', label: 'Parejas', icon: <HeartHandshake className="w-3.5 h-3.5" />, badge: `${totalCounts.couples || 2}` },
    { id: 'men', label: 'Hombres', icon: <User className="w-3.5 h-3.5" />, badge: `${totalCounts.men || 2}` },
    { id: 'trans', label: 'Trans', icon: <Users className="w-3.5 h-3.5" />, badge: `${totalCounts.trans || 2}` },
    { id: 'popular', label: 'Más Populares', icon: <Flame className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'interactive', label: 'Juguetes Lovense', icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" />, badge: 'Vibra' },
    { id: 'hd', label: 'HD 1080p', icon: <Tv className="w-3.5 h-3.5 text-sky-400" /> },
    { id: 'vr', label: 'VR 360°', icon: <Glasses className="w-3.5 h-3.5 text-indigo-400" /> },
  ];

  return (
    <div className="bg-[#151820] border-b border-[#232835] sticky top-16 z-30 shadow-md">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-5 py-2 flex items-center justify-between gap-3">
        
        {/* Sidebar Toggle for Desktop / Mobile */}
        <button
          id="toggle-filters-btn"
          onClick={onToggleSidebar}
          className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
            sidebarOpen
              ? 'bg-[#ff2a4b]/15 border-[#ff2a4b] text-[#ff2a4b]'
              : 'bg-[#1b1f2a] border-[#2e3444] text-[#a4adbc] hover:text-white hover:border-[#424b61]'
          }`}
          title="Abrir / Cerrar panel de filtros detallados"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Filtros</span>
        </button>

        {/* Categories scrollable list */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#ff2a4b] text-white shadow-md shadow-red-950/40 ring-1 ring-red-400/50'
                    : 'bg-[#1b1f29] text-[#9ba4b4] hover:text-white hover:bg-[#232835]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                {cat.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isActive ? 'bg-black/30 text-white' : 'bg-[#292f3e] text-[#b3bccc]'
                  }`}>
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="relative flex items-center bg-[#1b1f2a] border border-[#2e3444] rounded-lg px-2 py-1">
            <ArrowUpDown className="w-3 h-3 text-[#7b8496] mr-1" />
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'viewers' | 'popular' | 'goal' | 'new')}
              className="bg-transparent text-xs text-[#c0c6d4] font-semibold focus:outline-none cursor-pointer pr-1"
            >
              <option value="viewers" className="bg-[#1b1f2a] text-white">Más Espectadores</option>
              <option value="popular" className="bg-[#1b1f2a] text-white">Más Populares</option>
              <option value="goal" className="bg-[#1b1f2a] text-white">Meta Próxima</option>
              <option value="new" className="bg-[#1b1f2a] text-white">Novedades</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};
