import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { SidebarFilters } from './components/SidebarFilters';
import { ModelCard } from './components/ModelCard';
import { LiveRoom } from './components/LiveRoom';
import { TokenStoreModal } from './components/TokenStoreModal';
import { PrivateShowModal } from './components/PrivateShowModal';
import { Footer } from './components/Footer';
import { INITIAL_MODELS } from './data/modelsData';
import { generateInitialBatch, generateMoreModels } from './utils/modelGenerator';
import { CategoryType, Model, UserState } from './types';
import { soundFX } from './utils/audio';
import confetti from 'canvas-confetti';
import { Flame, Sparkles, Heart, SearchX } from 'lucide-react';

export default function App() {
  // State for all models (initialized with initial batch for 6-column dense grid)
  const [models, setModels] = useState<Model[]>(() => [
    ...INITIAL_MODELS,
    ...generateInitialBatch(30),
  ]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  
  // Active Room state (when a model is clicked)
  const [activeModel, setActiveModel] = useState<Model | null>(null);

  // Category and sorting
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [sortBy, setSortBy] = useState<'viewers' | 'popular' | 'goal' | 'new'>('viewers');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterToyOnly, setFilterToyOnly] = useState(false);
  const [filterHDOnly, setFilterHDOnly] = useState(false);
  const [filterVROnly, setFilterVROnly] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedAgeRange, setSelectedAgeRange] = useState<string | null>(null);
  const [showingFavorites, setShowingFavorites] = useState(false);

  // User Wallet & Preferences
  const [userState, setUserState] = useState<UserState>({
    tokens: 350, // Preloaded with tokens for instant interactive testing!
    username: 'Miembro_VIP_77',
    isVip: true,
    favorites: ['camila-sweet', 'valentina-vip'],
    soundEnabled: true,
    language: 'es',
  });

  // Modal dialog states
  const [tokenStoreOpen, setTokenStoreOpen] = useState(false);
  const [privateShowModel, setPrivateShowModel] = useState<Model | null>(null);

  // Infinite scroll loader function: dynamically appends new live streams endlessly
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setModels((prev) => [...prev, ...generateMoreModels(18, selectedCategory)]);
      setIsLoadingMore(false);
    }, 300);
  }, [isLoadingMore, selectedCategory]);

  // Infinite scroll observer: triggers when user nears bottom
  useEffect(() => {
    const currentSentinel = sentinelRef.current;
    if (!currentSentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      {
        rootMargin: '600px',
        threshold: 0.05,
      }
    );

    observer.observe(currentSentinel);
    return () => observer.disconnect();
  }, [handleLoadMore]);

  // Window scroll fallback for reliable seamless infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (isLoadingMore) return;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 700) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleLoadMore, isLoadingMore]);

  // Periodic subtle viewer count fluctuation for realistic live stream feel
  useEffect(() => {
    const timer = setInterval(() => {
      setModels((prevModels) =>
        prevModels.map((m) => {
          const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
          return {
            ...m,
            viewers: Math.max(120, m.viewers + delta),
          };
        })
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Filter count helper
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filterToyOnly) count++;
    if (filterHDOnly) count++;
    if (filterVROnly) count++;
    if (selectedCountry) count++;
    if (selectedAgeRange) count++;
    if (selectedTag) count++;
    if (showingFavorites) count++;
    return count;
  }, [filterToyOnly, filterHDOnly, filterVROnly, selectedCountry, selectedAgeRange, selectedTag, showingFavorites]);

  // Reset all filters
  const handleResetFilters = () => {
    setFilterToyOnly(false);
    setFilterHDOnly(false);
    setFilterVROnly(false);
    setSelectedCountry(null);
    setSelectedAgeRange(null);
    setSelectedTag(null);
    setShowingFavorites(false);
    setSearchQuery('');
  };

  // Toggle Favorite for a model
  const handleToggleFavorite = (modelId: string) => {
    setUserState((prev) => {
      const isFav = prev.favorites.includes(modelId);
      const newFavs = isFav
        ? prev.favorites.filter((id) => id !== modelId)
        : [...prev.favorites, modelId];
      
      if (!isFav && prev.soundEnabled) {
        soundFX.playAlert();
      }

      return {
        ...prev,
        favorites: newFavs,
      };
    });
  };

  // Sound toggle
  const handleToggleSound = () => {
    setUserState((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  // Deduct tokens from wallet
  const handleDeductTokens = (amount: number): boolean => {
    if (userState.tokens < amount) {
      return false;
    }
    setUserState((prev) => ({
      ...prev,
      tokens: prev.tokens - amount,
    }));
    return true;
  };

  // Add tokens to wallet (from token store modal)
  const handleAddTokens = (amount: number) => {
    setUserState((prev) => ({
      ...prev,
      tokens: prev.tokens + amount,
    }));
  };

  // Quick Tip from card
  const handleQuickTip = (model: Model, amount: number) => {
    if (!handleDeductTokens(amount)) {
      setTokenStoreOpen(true);
      return;
    }

    soundFX.playCoinTip();
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#ff2a4b', '#f59e0b', '#fbbf24'],
      });
    } catch {
      // Confetti fallback
    }

    // Update model's goal
    setModels((prev) =>
      prev.map((m) =>
        m.id === model.id
          ? {
              ...m,
              currentGoal: {
                ...m.currentGoal,
                current: Math.min(m.currentGoal.target, m.currentGoal.current + amount),
              },
            }
          : m
      )
    );
  };

  // Category counts for badges
  const totalCounts = useMemo(() => {
    return {
      girls: models.filter((m) => m.category === 'girls').length,
      couples: models.filter((m) => m.category === 'couples').length,
      men: models.filter((m) => m.category === 'men').length,
      trans: models.filter((m) => m.category === 'trans').length,
    };
  }, [models]);

  // Filtered and sorted models
  const filteredModels = useMemo(() => {
    return models
      .filter((m) => {
        // Favorites filter
        if (showingFavorites && !userState.favorites.includes(m.id)) {
          return false;
        }

        // Category filter
        if (selectedCategory === 'girls' && m.category !== 'girls') return false;
        if (selectedCategory === 'couples' && m.category !== 'couples') return false;
        if (selectedCategory === 'men' && m.category !== 'men') return false;
        if (selectedCategory === 'trans' && m.category !== 'trans') return false;
        if (selectedCategory === 'interactive' && !m.hasToy) return false;
        if (selectedCategory === 'hd' && !m.isHD) return false;
        if (selectedCategory === 'vr' && !m.isVR) return false;

        // Features
        if (filterToyOnly && !m.hasToy) return false;
        if (filterHDOnly && !m.isHD) return false;
        if (filterVROnly && !m.isVR) return false;

        // Country
        if (selectedCountry && m.country !== selectedCountry) return false;

        // Age
        if (selectedAgeRange) {
          if (selectedAgeRange === '18-21' && (m.age < 18 || m.age > 21)) return false;
          if (selectedAgeRange === '22-25' && (m.age < 22 || m.age > 25)) return false;
          if (selectedAgeRange === '26-30' && (m.age < 26 || m.age > 30)) return false;
        }

        // Tag
        if (selectedTag && !m.tags.includes(selectedTag)) return false;

        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = m.name.toLowerCase().includes(q);
          const matchCountry = m.country.toLowerCase().includes(q);
          const matchTag = m.tags.some((t) => t.toLowerCase().includes(q.replace('#', '')));
          const matchStatus = m.statusMessage.toLowerCase().includes(q);
          if (!matchName && !matchCountry && !matchTag && !matchStatus) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'viewers') return b.viewers - a.viewers;
        if (sortBy === 'popular') return b.likes - a.likes;
        if (sortBy === 'goal') {
          const aRatio = a.currentGoal.current / a.currentGoal.target;
          const bRatio = b.currentGoal.current / b.currentGoal.target;
          return bRatio - aRatio;
        }
        if (sortBy === 'new') return b.age - a.age;
        return 0;
      });
  }, [
    models,
    selectedCategory,
    sortBy,
    searchQuery,
    selectedTag,
    filterToyOnly,
    filterHDOnly,
    filterVROnly,
    selectedCountry,
    selectedAgeRange,
    showingFavorites,
    userState.favorites,
  ]);

  return (
    <div className="min-h-screen bg-[#0e1015] text-[#e1e4ea] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Navbar */}
      <Header
        userState={userState}
        onOpenTokenStore={() => setTokenStoreOpen(true)}
        onToggleSound={handleToggleSound}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        onToggleFavoritesView={() => setShowingFavorites(!showingFavorites)}
        showingFavorites={showingFavorites}
        onLogoClick={() => {
          setActiveModel(null);
          setSelectedCategory('all');
          handleResetFilters();
        }}
        onSelectCategory={(cat) => {
          setActiveModel(null);
          setSelectedCategory(cat as CategoryType);
        }}
      />

      {/* If a Live Room is active, show the Live Room View */}
      {activeModel ? (
        <LiveRoom
          model={activeModel}
          onBack={() => setActiveModel(null)}
          userState={userState}
          onDeductTokens={handleDeductTokens}
          onOpenTokenStore={() => setTokenStoreOpen(true)}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={userState.favorites.includes(activeModel.id)}
          onOpenPrivateShow={(m) => setPrivateShowModel(m)}
        />
      ) : (
        /* Main Home / Directory View */
        <main className="flex-1 flex flex-col">
          
          {/* Sub-header Category navigation */}
          <CategoryNav
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            totalCounts={totalCounts}
          />

          {/* Active filter pills indicator */}
          {(activeFilterCount > 0 || searchQuery || showingFavorites) && (
            <div className="bg-[#13161f] border-b border-[#202534] px-4 py-2">
              <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap text-xs">
                  <span className="text-[#8792a5] font-bold">Filtros aplicados:</span>
                  
                  {showingFavorites && (
                    <span className="bg-rose-900/40 border border-rose-500/40 text-rose-300 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-rose-400" />
                      Solo Favoritas
                      <button onClick={() => setShowingFavorites(false)} className="hover:text-white">✕</button>
                    </span>
                  )}

                  {searchQuery && (
                    <span className="bg-[#1f2433] border border-[#31384e] text-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      Búsqueda: "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="hover:text-white">✕</button>
                    </span>
                  )}

                  {selectedTag && (
                    <span className="bg-[#ff2a4b]/20 border border-[#ff2a4b]/40 text-[#ff4260] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      #{selectedTag}
                      <button onClick={() => setSelectedTag(null)} className="hover:text-white">✕</button>
                    </span>
                  )}

                  {selectedCountry && (
                    <span className="bg-[#1f2433] border border-[#31384e] text-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      País: {selectedCountry}
                      <button onClick={() => setSelectedCountry(null)} className="hover:text-white">✕</button>
                    </span>
                  )}

                  {filterToyOnly && (
                    <span className="bg-purple-900/40 border border-purple-500/40 text-purple-300 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Con Juguete
                      <button onClick={() => setFilterToyOnly(false)} className="hover:text-white">✕</button>
                    </span>
                  )}
                </div>

                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#8792a5] hover:text-white underline cursor-pointer"
                >
                  Restablecer todos
                </button>
              </div>
            </div>
          )}

          {/* Body content with Sidebar and Grid */}
          <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-3 md:px-4 py-4 flex gap-3 sm:gap-4 flex-1">
            
            {/* Sidebar Filters */}
            <SidebarFilters
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              filterToyOnly={filterToyOnly}
              onToggleToyOnly={() => setFilterToyOnly(!filterToyOnly)}
              filterHDOnly={filterHDOnly}
              onToggleHDOnly={() => setFilterHDOnly(!filterHDOnly)}
              filterVROnly={filterVROnly}
              onToggleVROnly={() => setFilterVROnly(!filterVROnly)}
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
              selectedAgeRange={selectedAgeRange}
              onSelectAgeRange={setSelectedAgeRange}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
            />

            {/* Model Cards Grid */}
            <div className="flex-1 min-w-0">
              
              {/* Results stats header */}
              <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    {showingFavorites ? 'Mis Modelos Favoritas' : 'Salas de Transmisión en Directo'}
                    <span className="text-xs font-bold text-[#7e889b] bg-[#1a1e29] px-2 py-0.5 rounded-full border border-[#272d3e]">
                      {filteredModels.length} en línea
                    </span>
                  </h2>
                  <span className="text-[10px] font-black bg-[#ff2a4b]/20 text-[#ff4260] border border-[#ff2a4b]/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    6 Cuadros • Scroll Ilimitado
                  </span>
                </div>

                <div className="text-xs text-[#7e889b] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Transmisión en tiempo real 60fps</span>
                </div>
              </div>

              {/* Grid or Empty State */}
              {filteredModels.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3">
                    {filteredModels.map((model) => (
                      <ModelCard
                        key={model.id}
                        model={model}
                        isFavorite={userState.favorites.includes(model.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onSelectModel={(m) => {
                          setActiveModel(m);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        onQuickTip={handleQuickTip}
                        soundEnabled={userState.soundEnabled}
                      />
                    ))}
                  </div>

                  {/* Infinite Scroll Sentinel & Live Loader */}
                  <div
                    ref={sentinelRef}
                    className="py-12 flex flex-col items-center justify-center gap-2 select-none"
                  >
                    <div className="flex items-center gap-2.5 text-xs font-bold text-[#8c97aa] bg-[#141722] px-5 py-2.5 rounded-full border border-[#272d3e] shadow-xl">
                      <span className="w-4 h-4 border-2 border-[#ff2a4b] border-t-transparent rounded-full animate-spin" />
                      <span className="text-white">Cargando más transmisiones en vivo...</span>
                      <span className="bg-[#ff2a4b] text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                        ILIMITADO
                      </span>
                    </div>
                    <span className="text-[11px] text-[#555f72]">
                      Desplázate hacia abajo para explorar transmisiones ilimitadas
                    </span>
                  </div>
                </>
              ) : (
                <div className="bg-[#151722] border border-[#242938] rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3 my-8">
                  <SearchX className="w-12 h-12 text-[#5a6477]" />
                  <h3 className="text-base font-black text-white">
                    No se encontraron transmisiones con esos filtros
                  </h3>
                  <p className="text-xs text-[#848ea1] max-w-sm">
                    Intenta cambiar los términos de búsqueda o borrar algunos filtros para ver más modelos en directo.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-2 px-4 py-2 bg-[#ff2a4b] hover:bg-[#ff3d5c] text-white text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    Restablecer Filtros
                  </button>
                </div>
              )}

            </div>
          </div>

        </main>
      )}

      {/* Token Store Modal */}
      <TokenStoreModal
        isOpen={tokenStoreOpen}
        onClose={() => setTokenStoreOpen(false)}
        currentTokens={userState.tokens}
        onAddTokens={handleAddTokens}
      />

      {/* Private Show Modal */}
      <PrivateShowModal
        isOpen={privateShowModel !== null}
        onClose={() => setPrivateShowModel(null)}
        model={privateShowModel}
        userTokens={userState.tokens}
        onDeductTokens={handleDeductTokens}
        onOpenTokenStore={() => {
          setPrivateShowModel(null);
          setTokenStoreOpen(true);
        }}
      />

      {/* Site Footer */}
      <Footer />

    </div>
  );
}
