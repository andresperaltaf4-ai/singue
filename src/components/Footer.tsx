import React from 'react';
import { Shield, Lock, Globe, Heart } from 'lucide-react';
import { WaterWindLogo } from './WaterWindLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b0d12] border-t border-[#1d222e] text-[#717b8c] text-xs py-10 px-4 select-none">
      <div className="max-w-[1720px] mx-auto space-y-8">
        
        {/* Brand identity & Compliance */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1b202c]">
          <div className="flex items-center gap-3">
            <WaterWindLogo className="w-10 h-10" />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-white font-black text-base tracking-tight lowercase font-['Plus_Jakarta_Sans',sans-serif]">singue</span>
                <span className="text-cyan-400 font-black text-base">.</span>
              </div>
              <p className="text-[11px] text-[#788295]">
                Flujo constante de transmisiones en vivo con energía de agua y viento.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 font-black text-sm">
              18+
            </span>
            <div>
              <div className="text-white font-bold text-xs">
                Contenido Exclusivo para Mayores de Edad
              </div>
              <div className="text-[11px] text-[#636c7e]">
                Cumplimiento estricto con los requisitos de mantenimiento de registros 18 U.S.C. 2257.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1 text-emerald-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Conexión 256-Bit SSL Segura</span>
            </div>
            <div className="flex items-center gap-1 text-sky-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Privacidad Garantizada</span>
            </div>
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 text-[11px]">
          <div>
            <h5 className="text-white font-black text-xs uppercase tracking-wider mb-2.5">
              Explorar Shows
            </h5>
            <ul className="space-y-1.5">
              <li><a href="#chicas" className="hover:text-white transition">Chicas en Vivo</a></li>
              <li><a href="#parejas" className="hover:text-white transition">Parejas Reales</a></li>
              <li><a href="#hombres" className="hover:text-white transition">Hombres & Fitness</a></li>
              <li><a href="#trans" className="hover:text-white transition">Modelos Trans</a></li>
              <li><a href="#vr" className="hover:text-white transition">Experiencia VR 360°</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-black text-xs uppercase tracking-wider mb-2.5">
              Fichas & Pagos
            </h5>
            <ul className="space-y-1.5">
              <li><a href="#comprar" className="hover:text-white transition">Comprar Fichas</a></li>
              <li><a href="#bonos" className="hover:text-white transition">Bonos y Promociones</a></li>
              <li><a href="#tarjetas" className="hover:text-white transition">Métodos de Pago</a></li>
              <li><a href="#facturacion" className="hover:text-white transition">Extracto Discreto</a></li>
              <li><a href="#reembolsos" className="hover:text-white transition">Política de Fichas</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-black text-xs uppercase tracking-wider mb-2.5">
              Para Modelos
            </h5>
            <ul className="space-y-1.5">
              <li><a href="#trabaja" className="hover:text-white transition font-bold text-amber-400">Transmite con Nosotros</a></li>
              <li><a href="#ganancias" className="hover:text-white transition">Calculadora de Ganancias</a></li>
              <li><a href="#juguetes" className="hover:text-white transition">Configuración Lovense</a></li>
              <li><a href="#estudios" className="hover:text-white transition">Estudios Afiliados</a></li>
              <li><a href="#soporte-modelos" className="hover:text-white transition">Centro de Ayuda para Creadores</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-black text-xs uppercase tracking-wider mb-2.5">
              Información Legal
            </h5>
            <ul className="space-y-1.5">
              <li><a href="#terminos" className="hover:text-white transition">Términos de Servicio</a></li>
              <li><a href="#privacidad" className="hover:text-white transition">Política de Privacidad</a></li>
              <li><a href="#cookies" className="hover:text-white transition">Configuración de Cookies</a></li>
              <li><a href="#cumplimiento" className="hover:text-white transition">Declaración 2257</a></li>
              <li><a href="#dmca" className="hover:text-white transition">Denuncias DMCA</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h5 className="text-white font-black text-xs uppercase tracking-wider mb-2.5">
              Idioma
            </h5>
            <div className="flex items-center gap-2 bg-[#141722] border border-[#262c3d] rounded-lg p-2 text-white">
              <Globe className="w-4 h-4 text-[#ff2a4b]" />
              <select className="bg-transparent text-xs w-full focus:outline-none cursor-pointer">
                <option value="es" className="bg-[#141722]">Español (ES)</option>
                <option value="en" className="bg-[#141722]">English (US)</option>
                <option value="fr" className="bg-[#141722]">Français</option>
                <option value="pt" className="bg-[#141722]">Português</option>
                <option value="de" className="bg-[#141722]">Deutsch</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-[#1b202c] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#555e6f]">
          <div>
            © 2026 singue. Todos los derechos reservados. Plataforma interactiva de transmisiones en vivo inspirada en agua y viento.
          </div>
          <div className="flex items-center gap-1">
            Diseñado con precisión estética y funcional para streaming interactivo.
          </div>
        </div>

      </div>
    </footer>
  );
};
