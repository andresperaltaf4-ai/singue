import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Heart, 
  Crown, 
  Tv, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Camera, 
  Coins, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Info, 
  Lock, 
  Eye, 
  Smile, 
  Gift, 
  Radio, 
  Flame, 
  CheckCircle2,
  Share2
} from 'lucide-react';
import { Model, ChatMessage, UserState } from '../types';
import { soundFX } from '../utils/audio';
import { RANDOM_CHAT_MESSAGES } from '../data/modelsData';

interface LiveRoomProps {
  model: Model;
  onBack: () => void;
  userState: UserState;
  onDeductTokens: (amount: number) => boolean;
  onOpenTokenStore: () => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
  onOpenPrivateShow: (model: Model) => void;
}

export const LiveRoom: React.FC<LiveRoomProps> = ({
  model,
  onBack,
  userState,
  onDeductTokens,
  onOpenTokenStore,
  onToggleFavorite,
  isFavorite,
  onOpenPrivateShow,
}) => {
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Model Goal State
  const [currentGoalProgress, setCurrentGoalProgress] = useState(model.currentGoal.current);
  const goalTarget = model.currentGoal.target;

  // Video Player state
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(!userState.soundEnabled);
  const [volume, setVolume] = useState(80);
  const [quality, setQuality] = useState('1080p60');
  const [theaterMode, setTheaterMode] = useState(false);
  const [toyBuzzing, setToyBuzzing] = useState(false);
  const [snapshotTaken, setSnapshotTaken] = useState(false);

  // Active tab under player
  const [activeTab, setActiveTab] = useState<'tipMenu' | 'about' | 'gallery' | 'toy'>('tipMenu');

  // Custom tip input
  const [customTip, setCustomTip] = useState('');

  // Floating heart / tip animations
  const [floatingIcons, setFloatingIcons] = useState<{ id: number; icon: string; x: number }[]>([]);

  // Initial welcome message and simulate periodic live chat
  useEffect(() => {
    const initialMsgs: ChatMessage[] = [
      {
        id: 'welcome',
        username: 'Sistema singue',
        text: `¡Bienvenido a la sala oficial de ${model.name}! Recuerda ser respetuoso en el chat.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: 'model-pin',
        username: model.name,
        isModel: true,
        text: `Hola a todos los que van entrando ❤️ ¡Meta actual: ${model.currentGoal.title}! Cada ficha activa mi juguete ${model.toyName || 'Lovense'} 🔥`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: 'msg-1',
        username: 'Carlos_VIP',
        userBadge: 'vip',
        text: '¡Hola hermosa! Qué lindo te queda ese top 💋',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: 'msg-2',
        username: 'Knight_Red',
        userBadge: 'knight',
        isTip: true,
        tipAmount: 25,
        text: '¡Envié 25 fichas para la meta! Saludos!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setMessages(initialMsgs);

    // Auto-chat simulator
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        const randomText = RANDOM_CHAT_MESSAGES[Math.floor(Math.random() * RANDOM_CHAT_MESSAGES.length)];
        const randomUser = `User_${Math.floor(1000 + Math.random() * 9000)}`;
        const hasTip = Math.random() > 0.7;
        const tipVal = hasTip ? [5, 10, 25, 50][Math.floor(Math.random() * 4)] : undefined;

        if (hasTip && tipVal) {
          setCurrentGoalProgress((prev) => Math.min(goalTarget, prev + tipVal));
        }

        const newMsg: ChatMessage = {
          id: `sim-${Date.now()}-${Math.random()}`,
          username: randomUser,
          text: hasTip ? `¡Ha enviado ${tipVal} fichas! ${randomText}` : randomText,
          isTip: hasTip,
          tipAmount: tipVal,
          userBadge: hasTip ? 'fan' : 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev.slice(-40), newMsg]);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [model.name, model.currentGoal.title, model.toyName, goalTarget]);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Send Tip Handler
  const handleSendTip = (amount: number, note?: string) => {
    if (amount <= 0) return;

    // Check if user has enough tokens
    const success = onDeductTokens(amount);
    if (!success) {
      onOpenTokenStore();
      return;
    }

    // Play sound FX
    soundFX.playCoinTip();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ff2a4b', '#f59e0b', '#fbbf24', '#ffffff'],
      });
    } catch {
      // Confetti fallback
    }

    // Trigger floating coin animation
    triggerFloatingIcon('🪙');

    // Trigger toy buzz if model has toy
    if (model.hasToy) {
      setToyBuzzing(true);
      soundFX.playToyPulse();
      setTimeout(() => setToyBuzzing(false), 2500);
    }

    // Update goal
    setCurrentGoalProgress((prev) => Math.min(goalTarget, prev + amount));

    // Add tip message to chat
    const tipMsg: ChatMessage = {
      id: `user-tip-${Date.now()}`,
      username: userState.username,
      userBadge: 'vip',
      isTip: true,
      tipAmount: amount,
      text: note || `¡Ha enviado una generosa propina de ${amount} fichas! 🎉`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, tipMsg]);

    // Simulated model response after 1.5 seconds
    setTimeout(() => {
      const modelReplies = [
        `¡Muchísimas gracias @${userState.username} por esas ${amount} fichas! Me encanta cómo me consientes ❤️`,
        `¡Woooow @${userState.username}! ¡Esa propina de ${amount} fichas hizo vibrar fuerte mi juguete! ⚡💋`,
        `¡Gracias mi rey @${userState.username}! ¡Ya casi completamos la meta de hoy! 🔥`,
      ];
      const replyText = modelReplies[Math.floor(Math.random() * modelReplies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: `model-reply-${Date.now()}`,
          username: model.name,
          isModel: true,
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      soundFX.playAlert();
    }, 1400);
  };

  // Chat message submit
  const handleSendChatMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-msg-${Date.now()}`,
      username: userState.username,
      userBadge: userState.isVip ? 'vip' : 'user',
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');
  };

  const triggerFloatingIcon = (icon: string) => {
    const newIcon = {
      id: Date.now() + Math.random(),
      icon,
      x: 30 + Math.random() * 40,
    };
    setFloatingIcons((prev) => [...prev, newIcon]);
    setTimeout(() => {
      setFloatingIcons((prev) => prev.filter((i) => i.id !== newIcon.id));
    }, 2000);
  };

  const takeSnapshot = () => {
    setSnapshotTaken(true);
    soundFX.playAlert();
    setTimeout(() => setSnapshotTaken(false), 2200);
  };

  const goalPercentage = Math.min(100, Math.round((currentGoalProgress / goalTarget) * 100));

  return (
    <div className="bg-[#0f1117] min-h-screen text-white flex flex-col pb-16">
      
      {/* Top Bar of the Live Room */}
      <div className="bg-[#141720] border-b border-[#232837] px-4 py-2.5 flex items-center justify-between gap-4 sticky top-0 z-40">
        
        {/* Left: Back button & Model identity */}
        <div className="flex items-center gap-3">
          <button
            id="room-back-btn"
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e2330] hover:bg-[#282f40] text-xs font-bold text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#ff2a4b]" />
            <span className="hidden sm:inline">Explorar Shows</span>
          </button>

          <div className="h-5 w-px bg-[#2a3040] hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2a4b] animate-ping" />
            <h1 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5">
              {model.name}
              <span className="text-xs font-medium text-[#848d9f]">({model.age})</span>
              <span className="text-sm">{model.countryCode}</span>
            </h1>
          </div>
        </div>

        {/* Center: Live Specs */}
        <div className="hidden md:flex items-center gap-2 text-xs font-bold">
          <span className="bg-red-600/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30 flex items-center gap-1">
            <Radio className="w-3 h-3 text-red-500 animate-pulse" />
            EN VIVO • {model.viewers.toLocaleString()} espectadores
          </span>
          <span className="bg-sky-600/20 text-sky-400 px-2 py-0.5 rounded border border-sky-500/30">
            {quality}
          </span>
          {model.hasToy && (
            <span className="bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded border border-purple-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" />
              {model.toyName || 'Lovense'}
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Follow / Favorite button */}
          <button
            id="room-follow-btn"
            onClick={() => onToggleFavorite(model.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isFavorite
                ? 'bg-rose-600 text-white'
                : 'bg-[#1e2330] hover:bg-[#282f40] text-[#abb5c5] hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? 'Siguiendo' : 'Seguir'}</span>
          </button>

          {/* Tokens balance quick indicator */}
          <button
            onClick={onOpenTokenStore}
            className="bg-[#1e2330] hover:bg-[#282f40] border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Coins className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <span>{userState.tokens}</span>
            <span className="text-[#848d9f] hidden sm:inline">Fichas</span>
            <span className="bg-[#ff2a4b] text-white text-[10px] font-black px-1.5 py-0.2 rounded ml-1">
              +
            </span>
          </button>
        </div>

      </div>

      {/* Main Room Layout: Two columns (Video + Left Actions | Live Chat) */}
      <div className={`max-w-[1780px] mx-auto w-full p-2 sm:p-4 grid gap-4 ${
        theaterMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
      }`}>
        
        {/* Left Column: Video Broadcast & Controls & Tabs (lg: 8 or 9 cols) */}
        <div className={`flex flex-col gap-3 ${theaterMode ? 'lg:col-span-12' : 'lg:col-span-8 xl:col-span-9'}`}>
          
          {/* Video Player Box */}
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#232837] aspect-video w-full flex items-center justify-center select-none group">
            
            {/* Live Model Stream Image Simulation */}
            <img
              src={model.imageUrl}
              alt={model.name}
              className={`w-full h-full object-cover object-center transition duration-700 ${
                isPlaying ? 'filter-none scale-100' : 'brightness-50'
              } ${toyBuzzing ? 'animate-bounce' : ''}`}
            />

            {/* Subtle camera scanline overlay & ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* Toy Vibration Ripple Effect when activated */}
            {toyBuzzing && (
              <div className="absolute inset-0 bg-purple-600/20 border-4 border-purple-500 animate-pulse flex items-center justify-center pointer-events-none z-30">
                <div className="bg-black/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-purple-500 text-purple-300 font-extrabold flex items-center gap-2 shadow-2xl animate-bounce text-sm sm:text-base">
                  <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />
                  <span>¡JUGUETE VIBRANDO A MÁXIMA VELOCIDAD! ⚡</span>
                </div>
              </div>
            )}

            {/* Snapshot saved feedback */}
            {snapshotTaken && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 border border-emerald-500 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 z-40">
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Captura de pantalla guardada en tu galería!</span>
              </div>
            )}

            {/* Floating Emojis / Coins on tipping */}
            {floatingIcons.map((item) => (
              <div
                key={item.id}
                className="absolute bottom-16 text-3xl pointer-events-none animate-float-up z-40 transition"
                style={{ left: `${item.x}%` }}
              >
                {item.icon}
              </div>
            ))}

            {/* Top Overlay: Tip Goal Progress Banner */}
            <div className="absolute top-3 left-3 right-3 z-20">
              <div className="bg-black/75 backdrop-blur-md border border-white/10 rounded-xl p-2.5 sm:p-3 shadow-xl flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-black">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="bg-[#ff2a4b] text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                      META
                    </span>
                    <span className="truncate text-white">
                      {model.currentGoal.title}
                    </span>
                  </div>
                  <div className="text-amber-400 font-black shrink-0 flex items-center gap-1">
                    <span>{currentGoalProgress}</span>
                    <span className="text-white/60">/</span>
                    <span>{goalTarget} Fichas</span>
                    <span className="text-[11px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded ml-1 font-bold">
                      {goalPercentage}%
                    </span>
                  </div>
                </div>

                {/* Animated Goal Progress Bar */}
                <div className="w-full bg-[#202534] h-2.5 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-[#ff2a4b] to-rose-500 rounded-full transition-all duration-700 shadow-lg shadow-red-500/50"
                    style={{ width: `${goalPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#9ca5b7]">
                  <span>Faltan {Math.max(0, goalTarget - currentGoalProgress)} fichas para completar el show especial</span>
                  <button 
                    onClick={() => handleSendTip(25)}
                    className="text-amber-400 hover:text-amber-300 font-extrabold hover:underline"
                  >
                    + Contribuir con 25 tk
                  </button>
                </div>
              </div>
            </div>

            {/* Video Controls Bar at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-center justify-between gap-3 text-white z-20 opacity-90 group-hover:opacity-100 transition">
              
              {/* Left Controls: Volume & Sound */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-[#ff2a4b] transition cursor-pointer"
                  title={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
                </button>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    if (isMuted) setIsMuted(false);
                  }}
                  className="w-16 sm:w-24 accent-[#ff2a4b] h-1.5 bg-[#313749] rounded-lg cursor-pointer"
                />

                <span className="text-[11px] font-bold text-[#8c96a8] hidden sm:inline">
                  REC 01:42:08
                </span>
              </div>

              {/* Right Controls: Quality, Snapshot, Theater, Fullscreen */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs">
                
                {/* Snapshot button */}
                <button
                  onClick={takeSnapshot}
                  className="p-1.5 rounded-lg bg-black/50 hover:bg-black/90 text-white transition cursor-pointer"
                  title="Tomar captura de pantalla de la cámara"
                >
                  <Camera className="w-4 h-4" />
                </button>

                {/* Quality selector */}
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="bg-black/60 border border-[#313749] rounded px-2 py-1 text-[11px] font-bold text-[#d1d7e2] focus:outline-none cursor-pointer"
                >
                  <option value="1080p60">1080p 60fps</option>
                  <option value="720p">720p</option>
                  <option value="480p">480p</option>
                  <option value="Auto">Auto</option>
                </select>

                {/* Theater mode */}
                <button
                  onClick={() => setTheaterMode(!theaterMode)}
                  className="p-1.5 rounded-lg bg-black/50 hover:bg-black/90 text-white transition hidden sm:inline cursor-pointer"
                  title="Modo Cine"
                >
                  <Tv className="w-4 h-4" />
                </button>

                {/* Fullscreen button */}
                <button
                  onClick={() => {
                    const el = document.documentElement;
                    if (!document.fullscreenElement) {
                      el.requestFullscreen?.();
                    } else {
                      document.exitFullscreen?.();
                    }
                  }}
                  className="p-1.5 rounded-lg bg-black/50 hover:bg-black/90 text-white transition cursor-pointer"
                  title="Pantalla Completa"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

              </div>
            </div>

          </div>

          {/* Interactive Quick Tip Action Ribbon (Directly Below Video) */}
          <div className="bg-[#151822] border border-[#252b3b] rounded-xl p-3 shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white whitespace-nowrap flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                <span>Propina Rápida:</span>
              </span>

              {/* Quick tip buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {[1, 5, 25, 50, 100].map((amt) => (
                  <button
                    key={amt}
                    id={`quick-tip-${amt}`}
                    onClick={() => handleSendTip(amt)}
                    className="bg-[#212634] hover:bg-amber-500 hover:text-black text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-lg text-xs font-black transition transform active:scale-95 cursor-pointer shrink-0"
                  >
                    {amt} tk
                  </button>
                ))}
              </div>
            </div>

            {/* Custom tip input */}
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <input
                  type="number"
                  placeholder="Otra cant."
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  className="w-24 bg-[#1b1f2b] border border-[#2f3647] rounded-lg px-2.5 py-1 text-xs text-white placeholder-[#687082] focus:outline-none focus:border-amber-400 font-bold"
                />
              </div>
              <button
                onClick={() => {
                  const amt = parseInt(customTip, 10);
                  if (amt > 0) {
                    handleSendTip(amt);
                    setCustomTip('');
                  }
                }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs px-3 py-1 rounded-lg transition shadow cursor-pointer shrink-0"
              >
                Mandar
              </button>
            </div>

          </div>

          {/* Action Callout Bar: Private Show & Lovense Toy */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            
            {/* Start Private Show */}
            <button
              id="start-private-show-btn"
              onClick={() => onOpenPrivateShow(model)}
              className="bg-gradient-to-r from-[#ff2a4b] to-[#c70f2c] hover:from-[#ff3d5c] hover:to-[#db1736] text-white p-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 transition transform active:scale-98 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Iniciar Show Privado</span>
              <span className="bg-black/30 text-white text-[10px] px-1.5 py-0.5 rounded font-black">
                60 tk/min
              </span>
            </button>

            {/* Spy Show */}
            <button
              onClick={() => {
                if (onDeductTokens(18)) {
                  soundFX.playCoinTip();
                  alert(`Has entrado a espiar el show de ${model.name} por 18 fichas/min.`);
                } else {
                  onOpenTokenStore();
                }
              }}
              className="bg-[#1d212d] hover:bg-[#252b3b] border border-[#31374a] text-[#d6dbe5] p-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Eye className="w-4 h-4 text-sky-400" />
              <span>Espiar Privado</span>
              <span className="bg-[#2b3243] text-sky-300 text-[10px] px-1.5 py-0.5 rounded font-black">
                18 tk/min
              </span>
            </button>

            {/* Lovense Toy Trigger */}
            <button
              id="vibrate-toy-btn"
              onClick={() => handleSendTip(20, '¡Vibración sorpresa del juguete interactivo! ⚡')}
              className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 hover:from-purple-800/80 hover:to-indigo-800/80 border border-purple-500/40 text-purple-200 p-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
              <span>Hacer Vibrar Juguete</span>
              <span className="bg-purple-500/30 text-purple-200 text-[10px] px-1.5 py-0.5 rounded font-black">
                20 tk
              </span>
            </button>

          </div>

          {/* Detailed Info Tabs below video */}
          <div className="bg-[#141721] border border-[#252a3a] rounded-xl overflow-hidden shadow-lg mt-1">
            
            {/* Tab navigation headers */}
            <div className="flex border-b border-[#252a3a] bg-[#10121a] overflow-x-auto no-scrollbar">
              <button
                id="tab-tip-menu"
                onClick={() => setActiveTab('tipMenu')}
                className={`px-4 py-2.5 text-xs font-black transition border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'tipMenu'
                    ? 'border-[#ff2a4b] text-white bg-[#171b26]'
                    : 'border-transparent text-[#8b95a7] hover:text-white'
                }`}
              >
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                <span>Menú de Propinas</span>
                <span className="bg-amber-400/20 text-amber-400 text-[10px] px-1 rounded">
                  {model.tipMenu.length}
                </span>
              </button>

              <button
                id="tab-about-me"
                onClick={() => setActiveTab('about')}
                className={`px-4 py-2.5 text-xs font-black transition border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'about'
                    ? 'border-[#ff2a4b] text-white bg-[#171b26]'
                    : 'border-transparent text-[#8b95a7] hover:text-white'
                }`}
              >
                <Info className="w-3.5 h-3.5 text-sky-400" />
                <span>Sobre Mí</span>
              </button>

              <button
                id="tab-gallery"
                onClick={() => setActiveTab('gallery')}
                className={`px-4 py-2.5 text-xs font-black transition border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'gallery'
                    ? 'border-[#ff2a4b] text-white bg-[#171b26]'
                    : 'border-transparent text-[#8b95a7] hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fotos & Galería</span>
              </button>

              <button
                id="tab-toy"
                onClick={() => setActiveTab('toy')}
                className={`px-4 py-2.5 text-xs font-black transition border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'toy'
                    ? 'border-[#ff2a4b] text-white bg-[#171b26]'
                    : 'border-transparent text-[#8b95a7] hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Juguete Lovense</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
              </button>
            </div>

            {/* Tab 1: Interactive Tip Menu */}
            {activeTab === 'tipMenu' && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-black text-white">Menú de Acciones y Propinas</h4>
                    <p className="text-xs text-[#848d9f]">
                      Haz clic en cualquier acción para enviar la propina y activar el pedido en directo.
                    </p>
                  </div>
                  <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                    Tu Saldo: {userState.tokens} tk
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {model.tipMenu.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSendTip(item.tokens, `Solicitó del menú: ${item.name} ${item.icon || ''}`)}
                      className="bg-[#1b1f2b] hover:bg-[#252b3b] border border-[#2a3142] hover:border-amber-400/50 rounded-xl p-3 flex items-center justify-between transition text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-2xl">{item.icon || '✨'}</span>
                        <div className="truncate">
                          <div className="text-xs font-bold text-white group-hover:text-amber-300 transition truncate">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-[#7d8697]">
                            Acción instantánea
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-500/20 text-amber-300 font-black text-xs px-2.5 py-1 rounded-lg border border-amber-500/30 shrink-0 group-hover:bg-amber-400 group-hover:text-black transition">
                        {item.tokens} tk
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: About Me & Bio */}
            {activeTab === 'about' && (
              <div className="p-4 space-y-4 text-xs">
                <div>
                  <h4 className="text-sm font-black text-white mb-1">Biografía Oficial</h4>
                  <p className="text-[#a5afbf] leading-relaxed">
                    {model.bio}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#11131a] p-3 rounded-xl border border-[#232734]">
                  <div>
                    <span className="text-[#717a8c] block text-[10px]">Edad</span>
                    <span className="font-bold text-white text-sm">{model.age} años</span>
                  </div>
                  <div>
                    <span className="text-[#717a8c] block text-[10px]">Ubicación</span>
                    <span className="font-bold text-white text-sm">{model.country} {model.countryCode}</span>
                  </div>
                  <div>
                    <span className="text-[#717a8c] block text-[10px]">Idiomas</span>
                    <span className="font-bold text-white text-sm">{model.languages.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-[#717a8c] block text-[10px]">Juguete Oficial</span>
                    <span className="font-bold text-purple-400 text-sm">{model.toyName || 'Lovense'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#717a8c] block text-[11px] mb-1.5 font-bold uppercase tracking-wider">
                    Etiquetas de la Sala
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {model.tags.map((t) => (
                      <span key={t} className="bg-[#1f2432] text-[#9ba4b6] px-2.5 py-1 rounded-lg font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Photo Gallery */}
            {activeTab === 'gallery' && (
              <div className="p-4">
                <h4 className="text-sm font-black text-white mb-2">Galería Exclusiva de {model.name}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {model.gallery.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-[#10121a] border border-[#282d3d] group">
                      <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <button
                          onClick={() => alert('Vista previa en alta definición')}
                          className="bg-[#ff2a4b] text-white text-xs font-bold px-3 py-1 rounded-lg"
                        >
                          Ver Foto HD
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Lovense Toy Interactive Panel */}
            {activeTab === 'toy' && (
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between bg-purple-950/30 border border-purple-500/30 p-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                        {model.toyName || 'Lovense Lush 3'}
                        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.2 rounded border border-emerald-500/40">
                          ONLINE
                        </span>
                      </h4>
                      <p className="text-xs text-[#9ea7b8]">
                        Conectado vía Bluetooth a la transmisión de {model.name}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#868f9f] block">Nivel actual</span>
                    <span className="text-sm font-black text-purple-300">Nivel 4 / 10</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-white block">
                    Niveles de Intensidad Predefinidos:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { name: 'Cosquillas (Suave)', tokens: 10, level: 'Bajo' },
                      { name: 'Vibración Media', tokens: 25, level: 'Medio' },
                      { name: 'Vibración Fuerte', tokens: 50, level: 'Alto' },
                      { name: 'Vibración Extrema (60s)', tokens: 100, level: 'Máximo' },
                    ].map((lvl, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendTip(lvl.tokens, `¡Activó el juguete en modo ${lvl.name}! ⚡`)}
                        className="bg-[#1a1e2a] hover:bg-purple-900/40 border border-[#2b3141] hover:border-purple-500/50 p-3 rounded-xl text-left transition group cursor-pointer"
                      >
                        <div className="text-xs font-black text-white group-hover:text-purple-300">
                          {lvl.name}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] text-[#798394]">{lvl.level}</span>
                          <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                            {lvl.tokens} tk
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Dynamic Live Chat (lg: 4 or 3 cols) */}
        {!theaterMode && (
          <div className="lg:col-span-4 xl:col-span-3 bg-[#13151e] border border-[#232837] rounded-2xl flex flex-col h-[650px] lg:h-[820px] shadow-2xl overflow-hidden sticky top-20">
            
            {/* Chat Room Header */}
            <div className="bg-[#171a25] border-b border-[#232837] p-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-black text-white uppercase tracking-wider">
                  Chat de la Sala
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-[#8993a4]">
                <span>{model.viewers.toLocaleString()} en línea</span>
              </div>
            </div>

            {/* Pinned Goal Reminder in Chat */}
            <div className="bg-[#1c202d] border-b border-[#2a3040] p-2.5 flex items-center justify-between text-xs shrink-0">
              <div className="flex items-center gap-1.5 truncate pr-2">
                <Flame className="w-3.5 h-3.5 text-[#ff2a4b] shrink-0" />
                <span className="text-[#a6b0c2] truncate">
                  Meta: {model.currentGoal.title}
                </span>
              </div>
              <button
                onClick={() => handleSendTip(10)}
                className="bg-amber-400 hover:bg-amber-300 text-black px-2 py-0.5 rounded text-[10px] font-black shrink-0 transition"
              >
                +10 tk
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div
              ref={chatScrollRef}
              className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs select-text scroll-smooth"
            >
              {messages.map((msg) => {
                if (msg.isTip) {
                  return (
                    <div
                      key={msg.id}
                      className="bg-gradient-to-r from-amber-500/20 via-[#ff2a4b]/20 to-amber-500/10 border border-amber-500/40 rounded-xl p-2.5 shadow-md"
                    >
                      <div className="flex items-center justify-between text-[11px] font-black text-amber-300 mb-1">
                        <span className="flex items-center gap-1">
                          <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          {msg.username}
                        </span>
                        <span className="bg-amber-400 text-black px-1.5 py-0.2 rounded font-black text-[10px]">
                          +{msg.tipAmount} FICHAS
                        </span>
                      </div>
                      <p className="text-white font-medium">{msg.text}</p>
                    </div>
                  );
                }

                if (msg.isModel) {
                  return (
                    <div
                      key={msg.id}
                      className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-2.5"
                    >
                      <div className="flex items-center justify-between text-[11px] font-black text-rose-300 mb-1">
                        <span className="flex items-center gap-1">
                          <span className="bg-[#ff2a4b] text-white text-[9px] px-1 rounded font-black">
                            MODELO
                          </span>
                          {msg.username}
                        </span>
                        <span className="text-[10px] text-rose-400/80">{msg.timestamp}</span>
                      </div>
                      <p className="text-white/95 font-medium leading-relaxed">{msg.text}</p>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className="leading-snug">
                    <div className="flex items-baseline gap-1.5">
                      {msg.userBadge === 'vip' && (
                        <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[9px] font-extrabold px-1 rounded">
                          VIP
                        </span>
                      )}
                      {msg.userBadge === 'knight' && (
                        <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[9px] font-extrabold px-1 rounded">
                          CABALLERO
                        </span>
                      )}
                      <span className="font-bold text-[#8994a5] hover:text-white cursor-pointer transition">
                        {msg.username}:
                      </span>
                      <span className="text-white/90 break-words flex-1">{msg.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Emoji Reaction Bar */}
            <div className="bg-[#11131a] border-t border-[#232837] px-3 py-1.5 flex items-center justify-between text-base shrink-0">
              {['❤️', '🔥', '💋', '👑', '😍', '👏', '🍒', '✨'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    setChatInput((prev) => prev + emoji);
                    triggerFloatingIcon(emoji);
                  }}
                  className="hover:scale-125 transition transform cursor-pointer p-0.5"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Chat Input Box */}
            <form onSubmit={handleSendChatMessage} className="p-2.5 bg-[#171a25] border-t border-[#232837] shrink-0">
              <div className="flex items-center gap-1.5 bg-[#1f2330] border border-[#313749] focus-within:border-[#ff2a4b] rounded-xl px-2.5 py-1.5 transition">
                <input
                  id="room-chat-input"
                  type="text"
                  placeholder="Escribe un mensaje en el chat..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-[#687183] focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => handleSendTip(5, '¡Propina desde el chat! 🪙')}
                  title="Mandar 5 fichas con mensaje"
                  className="text-amber-400 hover:text-amber-300 p-1 hover:bg-[#2a3040] rounded transition cursor-pointer"
                >
                  <Coins className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className={`p-1.5 rounded-lg text-white transition ${
                    chatInput.trim()
                      ? 'bg-[#ff2a4b] hover:bg-[#ff3f5d] cursor-pointer'
                      : 'bg-[#292f3d] text-[#636c7e] cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
