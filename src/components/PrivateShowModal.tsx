import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Video, 
  Mic, 
  Clock, 
  Coins, 
  ShieldAlert, 
  CheckCircle2 
} from 'lucide-react';
import { Model } from '../types';
import { soundFX } from '../utils/audio';

interface PrivateShowModalProps {
  isOpen: boolean;
  onClose: () => void;
  model: Model | null;
  userTokens: number;
  onDeductTokens: (amount: number) => boolean;
  onOpenTokenStore: () => void;
}

export const PrivateShowModal: React.FC<PrivateShowModalProps> = ({
  isOpen,
  onClose,
  model,
  userTokens,
  onDeductTokens,
  onOpenTokenStore,
}) => {
  const [camToCam, setCamToCam] = useState(true);
  const [twoWayAudio, setTwoWayAudio] = useState(true);
  const [recordShow, setRecordShow] = useState(false);
  const [inPrivateSession, setInPrivateSession] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  if (!isOpen || !model) return null;

  const ratePerMin = 60;

  const handleStartPrivate = () => {
    if (userTokens < ratePerMin) {
      onOpenTokenStore();
      return;
    }

    if (onDeductTokens(ratePerMin)) {
      soundFX.playCoinTip();
      setInPrivateSession(true);
      setElapsedSeconds(0);
    } else {
      onOpenTokenStore();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="bg-[#141722] border border-[#272d3e] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950/40 to-[#1e2230] p-4 border-b border-[#272d3e] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#ff2a4b]/20 border border-[#ff2a4b]/40 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#ff2a4b]" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                {inPrivateSession ? 'Show Privado 1-a-1 en Vivo' : `Solicitar Show Privado con ${model.name}`}
              </h3>
              <p className="text-xs text-[#8c97aa]">
                Sala privada y encriptada • Solo tú y {model.name}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setInPrivateSession(false);
              onClose();
            }}
            className="text-[#7a8496] hover:text-white p-1.5 rounded-lg hover:bg-[#202534] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!inPrivateSession ? (
          <div className="p-5 space-y-4 text-xs">
            {/* Model Card Header */}
            <div className="flex items-center gap-3 bg-[#1b1f2b] p-3 rounded-xl border border-[#2b3243]">
              <img
                src={model.imageUrl}
                alt={model.name}
                className="w-14 h-14 rounded-xl object-cover border border-[#ff2a4b]/40 shadow"
              />
              <div className="flex-1">
                <div className="text-sm font-black text-white flex items-center gap-1.5">
                  <span>{model.name}</span>
                  <span className="text-xs text-[#8e98aa]">({model.age})</span>
                  <span>{model.countryCode}</span>
                </div>
                <div className="text-amber-400 font-bold mt-0.5 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" />
                  <span>Tarifa: {ratePerMin} fichas por minuto</span>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2">
              <span className="font-bold text-[#8993a4] uppercase tracking-wider block text-[11px]">
                Configuración del Show Privado
              </span>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#1a1e29] border border-[#272d3e] cursor-pointer hover:bg-[#212635] transition">
                <div className="flex items-center gap-2.5">
                  <Video className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-bold text-white">Cámara a Cámara (C2C)</div>
                    <div className="text-[10px] text-[#7a8496]">Permite a {model.name} verte en directo</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={camToCam}
                  onChange={() => setCamToCam(!camToCam)}
                  className="accent-[#ff2a4b] w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#1a1e29] border border-[#272d3e] cursor-pointer hover:bg-[#212635] transition">
                <div className="flex items-center gap-2.5">
                  <Mic className="w-4 h-4 text-sky-400" />
                  <div>
                    <div className="font-bold text-white">Audio Bidireccional</div>
                    <div className="text-[10px] text-[#7a8496]">Habla directamente con tu voz</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={twoWayAudio}
                  onChange={() => setTwoWayAudio(!twoWayAudio)}
                  className="accent-[#ff2a4b] w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#1a1e29] border border-[#272d3e] cursor-pointer hover:bg-[#212635] transition">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="font-bold text-white">Grabación Privada HD</div>
                    <div className="text-[10px] text-[#7a8496]">Guarda el video completo en tu perfil</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={recordShow}
                  onChange={() => setRecordShow(!recordShow)}
                  className="accent-[#ff2a4b] w-4 h-4 cursor-pointer"
                />
              </label>
            </div>

            {/* Token check notice */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#a4adbe] block">Tu Saldo Disponible:</span>
                <span className="text-sm font-black text-amber-400">{userTokens} Fichas</span>
              </div>
              <span className="text-[11px] text-[#a4adbe]">
                Equivalente a: <strong className="text-white">{Math.floor(userTokens / ratePerMin)} min</strong>
              </span>
            </div>

            {/* Actions */}
            <div className="pt-2">
              <button
                id="confirm-private-start"
                onClick={handleStartPrivate}
                className="w-full py-3 bg-gradient-to-r from-[#ff2a4b] to-[#dc1836] hover:from-[#ff3f5d] hover:to-[#ee2242] text-white font-black rounded-xl text-sm shadow-xl shadow-red-950/50 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Iniciar Show Privado ({ratePerMin} tk/min)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active Private Session Simulation */
          <div className="p-5 space-y-4 text-center">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-emerald-500/40 shadow-2xl">
              <img
                src={model.imageUrl}
                alt={model.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                SALA PRIVADA 1-A-1
              </div>

              {camToCam && (
                <div className="absolute bottom-3 right-3 w-24 h-20 bg-[#161821] rounded-lg border-2 border-white/40 overflow-hidden flex items-center justify-center text-[10px] text-white/70 shadow-lg">
                  <div className="flex flex-col items-center">
                    <Video className="w-4 h-4 mb-0.5 text-emerald-400" />
                    <span>Tu Cámara</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#1b1f2b] p-3 rounded-xl border border-[#2a3142] flex items-center justify-around text-xs">
              <div>
                <span className="text-[#7d8799] block text-[10px]">TIEMPO PRIVADO</span>
                <span className="font-mono font-bold text-white text-sm">01:24</span>
              </div>
              <div className="h-6 w-px bg-[#2f3647]" />
              <div>
                <span className="text-[#7d8799] block text-[10px]">TARIFA ACTUAL</span>
                <span className="font-bold text-amber-400 text-sm">{ratePerMin} tk/min</span>
              </div>
              <div className="h-6 w-px bg-[#2f3647]" />
              <div>
                <span className="text-[#7d8799] block text-[10px]">ESTADO</span>
                <span className="font-bold text-emerald-400 text-sm">Conectado C2C</span>
              </div>
            </div>

            <button
              onClick={() => {
                setInPrivateSession(false);
                onClose();
              }}
              className="w-full py-2.5 bg-[#252a38] hover:bg-red-900/60 hover:text-white text-[#c2c8d5] font-bold rounded-xl text-xs transition border border-[#313748]"
            >
              Finalizar Show Privado y Volver a Sala Pública
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
