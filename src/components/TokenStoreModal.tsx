import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Coins, 
  Check, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  Gift, 
  Zap, 
  Lock 
} from 'lucide-react';
import { TOKEN_PACKAGES } from '../data/modelsData';
import { soundFX } from '../utils/audio';

interface TokenStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTokens: number;
  onAddTokens: (amount: number) => void;
}

export const TokenStoreModal: React.FC<TokenStoreModalProps> = ({
  isOpen,
  onClose,
  currentTokens,
  onAddTokens,
}) => {
  const [selectedPackId, setSelectedPackId] = useState('pack-250');
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'crypto' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<number | null>(null);

  if (!isOpen) return null;

  const selectedPackage = TOKEN_PACKAGES.find((p) => p.id === selectedPackId) || TOKEN_PACKAGES[1];
  const totalTokens = selectedPackage.tokens + selectedPackage.bonusTokens;

  const handlePurchase = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onAddTokens(totalTokens);
      setPurchaseSuccess(totalTokens);
      soundFX.playCoinTip();

      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#fbbf24', '#ff2a4b', '#10b981'],
        });
      } catch {
        // Fallback
      }

      setTimeout(() => {
        setPurchaseSuccess(null);
        onClose();
      }, 1600);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none">
      <div className="bg-[#151822] border border-[#272d3e] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1b1f2b] to-[#252b3d] p-4 border-b border-[#293043] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Coins className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            </div>
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                Tienda Oficial de Fichas singue
                <span className="bg-[#ff2a4b] text-white text-[10px] font-black px-1.5 py-0.2 rounded">
                  OFERTA
                </span>
              </h3>
              <p className="text-xs text-[#8c97aa]">
                Tu saldo actual: <span className="text-amber-400 font-bold">{currentTokens} fichas</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#7d8799] hover:text-white p-1.5 rounded-lg hover:bg-[#202534] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert Banner if purchased */}
        {purchaseSuccess && (
          <div className="bg-emerald-600 text-white p-3 text-center text-xs font-black flex items-center justify-center gap-2 animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span>¡Recarga exitosa! Se han acreditado +{purchaseSuccess} fichas a tu cuenta.</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto max-h-[calc(85vh-140px)]">
          
          {/* Section: Select Package */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-white uppercase tracking-wider">
                1. Selecciona un Paquete de Fichas
              </span>
              <span className="text-[11px] text-amber-300 font-bold flex items-center gap-1">
                <Gift className="w-3.5 h-3.5" />
                Hasta +48% fichas gratis incluidas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TOKEN_PACKAGES.map((pkg) => {
                const isSelected = selectedPackId === pkg.id;
                const total = pkg.tokens + pkg.bonusTokens;

                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackId(pkg.id)}
                    className={`p-3.5 rounded-xl border transition text-left relative flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'bg-[#222838] border-amber-400 ring-2 ring-amber-400/30'
                        : 'bg-[#181c26] border-[#292f40] hover:border-[#3d455d]'
                    }`}
                  >
                    {/* Badge */}
                    {pkg.badge && (
                      <span className={`absolute -top-2.5 right-3 text-[9px] font-black px-2 py-0.5 rounded-full shadow ${
                        pkg.isPopular ? 'bg-[#ff2a4b] text-white' : 'bg-amber-400 text-black'
                      }`}>
                        {pkg.badge}
                      </span>
                    )}

                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                        isSelected ? 'bg-amber-400 text-black' : 'bg-[#262c3c] text-amber-400'
                      }`}>
                        <Coins className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="text-sm font-black text-white flex items-center gap-1.5">
                          <span>{total}</span>
                          <span className="text-xs text-[#8d97a9]">Fichas</span>
                        </div>
                        {pkg.bonusTokens > 0 && (
                          <div className="text-[10px] text-amber-400 font-bold">
                            +{pkg.bonusTokens} Gratis de Regalo
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-white">${pkg.price.toFixed(2)}</span>
                      <span className="block text-[10px] text-[#70798a]">Pago seguro</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Payment Method */}
          <div>
            <span className="text-xs font-black text-white uppercase tracking-wider block mb-2">
              2. Método de Pago Seguro
            </span>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedPayment('card')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                  selectedPayment === 'card'
                    ? 'bg-[#23293a] border-[#ff2a4b] text-white'
                    : 'bg-[#181c26] border-[#2a3042] text-[#8e99ab] hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#ff2a4b]" />
                <span>Tarjeta (Visa/MC)</span>
              </button>

              <button
                onClick={() => setSelectedPayment('crypto')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                  selectedPayment === 'crypto'
                    ? 'bg-[#23293a] border-amber-400 text-white'
                    : 'bg-[#181c26] border-[#2a3042] text-[#8e99ab] hover:text-white'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Criptomonedas</span>
              </button>

              <button
                onClick={() => setSelectedPayment('paypal')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                  selectedPayment === 'paypal'
                    ? 'bg-[#23293a] border-sky-400 text-white'
                    : 'bg-[#181c26] border-[#2a3042] text-[#8e99ab] hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>PayPal / Google Pay</span>
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-between text-[11px] text-[#717b8d] bg-[#12141c] p-2.5 rounded-xl border border-[#212635]">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transacción 100% Discreta y Cifrada SSL</span>
            </div>
            <span>No aparecerá "singue" en tu extracto</span>
          </div>

        </div>

        {/* Footer Checkout Button */}
        <div className="bg-[#181c26] border-t border-[#272d3e] p-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-[#788293] block uppercase tracking-wider">Total a pagar</span>
            <span className="text-xl font-black text-white">${selectedPackage.price.toFixed(2)} USD</span>
          </div>

          <button
            id="checkout-confirm-btn"
            onClick={handlePurchase}
            disabled={isProcessing || purchaseSuccess !== null}
            className="bg-gradient-to-r from-[#ff2a4b] to-[#dc1836] hover:from-[#ff3f5d] hover:to-[#ee2242] text-white px-6 py-3 rounded-xl font-black text-sm shadow-xl shadow-red-950/50 flex items-center gap-2 transition transform active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Procesando pago seguro...</span>
            ) : (
              <>
                <Coins className="w-4 h-4 text-amber-300" />
                <span>Recargar {totalTokens} Fichas Ahora</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
