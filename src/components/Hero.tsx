import React, { useState } from 'react';
import { Dumbbell, Calendar, Instagram, Award, ShieldCheck, Zap, ArrowRight, CheckCircle2, Phone, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigateTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigateTab }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-start pt-28 pb-12 lg:py-0 lg:items-center overflow-hidden bg-[#e6e2dd] text-black">
      {/* Background Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex-col items-center justify-center opacity-10 pointer-events-none z-0 mix-blend-multiply hidden sm:flex">
        <h1 className="text-[12vw] leading-none font-magazine italic tracking-tighter text-[#1a1a1a] whitespace-nowrap">DENIS</h1>
        <h1 className="text-[15vw] leading-none font-magazine font-black tracking-tighter text-[#1a1a1a] whitespace-nowrap -mt-8">GUSEV</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start lg:items-center h-full">
          
          {/* Left Editorial Content */}
          <div className="space-y-6 sm:space-y-8 z-20 relative">
            {/* Mobile readability gradient */}
            <div className="absolute inset-0 -mx-4 -my-8 bg-gradient-to-r from-[#e6e2dd] via-[#e6e2dd]/90 to-transparent sm:hidden z-[-1] pointer-events-none"></div>
            
            <div className="inline-block border-b-2 border-black pb-1 mb-4">
              <span className="font-heading font-black tracking-widest text-xs uppercase">Exclusive Fit Editorial</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-magazine leading-[0.9] tracking-tight">
                Sculpt<br/>
                <span className="italic text-gray-600">Your</span><br/>
                Legacy.
              </h2>
            </div>

            <div className="pl-6 border-l border-black/30 max-w-md">
              <p className="text-sm font-sans font-medium text-gray-800 leading-relaxed">
                Збудуй сильне, здорове та атлетичне тіло під керівництвом персонального тренера <strong>Дениса Гусєва</strong>. Зал Інтер Атлетика. Естетика, сила та дисципліна в кожному русі.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6">
              <button
                onClick={onOpenBooking}
                className="group flex items-center gap-4 bg-black text-white px-8 py-4 rounded-none hover:bg-gray-800 transition-colors"
              >
                <span className="font-heading font-bold uppercase tracking-widest text-xs">Розпочати</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="font-magazine text-2xl italic">3+</div>
                  <div className="text-[9px] uppercase font-bold tracking-widest text-gray-500">Роки</div>
                </div>
                <div className="text-center">
                  <div className="font-magazine text-2xl italic">120+</div>
                  <div className="text-[9px] uppercase font-bold tracking-widest text-gray-500">Клієнтів</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Cutout Image */}
          <div className="absolute bottom-0 -right-4 sm:right-0 lg:right-10 w-[85%] sm:w-[70%] lg:w-1/2 h-[60vh] lg:h-[90vh] flex items-end justify-end z-10 pointer-events-none">
            {/* The Cutout Image */}
            <img
              src={`${import.meta.env.BASE_URL}trainer-cutout.png`}
              alt="Denis Gusev"
              className={`max-h-full w-auto object-contain object-right-bottom drop-shadow-2xl transition-opacity duration-1000 pointer-events-auto ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.currentTarget.src = `${import.meta.env.BASE_URL}trainer-hero.jpg`;
                e.currentTarget.className = "max-h-full w-full object-cover rounded-sm grayscale contrast-125 pointer-events-auto";
              }}
            />
            
            {/* Magazine QR Code for style - Easter egg to Insta (Scannable) */}
            <div className="absolute bottom-8 right-8 hidden lg:block bg-white p-2 shadow-xl rotate-[-2deg] pointer-events-auto">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.instagram.com/_xx._gd_.xx_/" 
                alt="Instagram QR Code" 
                className="h-16 w-16 opacity-90"
                crossOrigin="anonymous"
              />
              <div className="text-[8px] font-mono text-center pt-1 font-bold">GD-FIT</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
