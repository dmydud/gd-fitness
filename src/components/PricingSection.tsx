import React from 'react';
import { INITIAL_PACKAGES } from '../data/exercisesData';

interface PricingSectionProps {
  onOpenBooking: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="pricing" className="py-20 bg-[#e6e2dd] text-black border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-black pb-8 gap-8">
          <div>
            <div className="inline-block bg-black text-white px-2 py-0.5 mb-6 text-[10px] font-black uppercase tracking-[0.3em]">
              Розділ 2 — Абонементи
            </div>
            <h2 className="text-5xl sm:text-7xl font-black font-magazine uppercase leading-none tracking-tighter">
              Ваш <span className="italic text-[#e6b800]">План.</span>
            </h2>
          </div>
          <div className="text-xs font-bold uppercase tracking-widest max-w-xs text-right hidden md:block">
            Оберіть формат тренувань — очно або дистанційно.
          </div>
        </div>

        {/* Pricing List - Editorial Style */}
        <div className="flex flex-col border-b border-black">
          {INITIAL_PACKAGES.map((pkg, idx) => (
            <div
              key={pkg.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 lg:p-12 border-t border-black first:border-t-0 hover:bg-black hover:text-[#e6e2dd] group transition-colors duration-500 ${
                pkg.isPopular ? 'bg-black text-[#e6e2dd]' : ''
              }`}
            >
              
              <div className="lg:col-span-4 flex flex-col justify-center">
                {pkg.isPopular && (
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#e6b800] mb-2">
                    ◆ Найпопулярніший
                  </div>
                )}
                <h3 className={`text-3xl sm:text-4xl font-black font-magazine uppercase leading-none ${pkg.isPopular ? 'text-[#e6b800]' : 'group-hover:text-[#e6b800]'}`}>
                  {pkg.title}
                </h3>
                <p className="text-xs uppercase tracking-widest mt-4 opacity-70 font-bold">{pkg.subtitle}</p>
              </div>

              <div className="lg:col-span-5">
                <ul className="space-y-3">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-4 text-xs font-bold uppercase tracking-wider">
                      <span className={pkg.isPopular ? 'text-[#e6b800]' : 'group-hover:text-[#e6b800]'}>—</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-3 flex flex-row lg:flex-col justify-between items-center lg:items-end h-full">
                <div className="text-right">
                  <div className="text-4xl sm:text-5xl font-black font-magazine">{pkg.price}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-1">{pkg.period}</div>
                </div>
                
                <button
                  onClick={onOpenBooking}
                  className={`mt-0 lg:mt-8 px-8 py-3 text-xs font-black uppercase tracking-[0.2em] transition-all border ${
                    pkg.isPopular
                      ? 'bg-[#e6b800] text-black border-[#e6b800] hover:bg-white'
                      : 'bg-black text-white border-black group-hover:bg-[#e6b800] group-hover:text-black group-hover:border-[#e6b800]'
                  }`}
                >
                  {pkg.ctaText}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-8 p-12 bg-black text-[#e6e2dd]">
          <div>
            <h4 className="text-3xl font-magazine font-black uppercase">Маєте питання?</h4>
            <p className="text-xs font-bold uppercase tracking-widest opacity-70 mt-2">Отримайте безкоштовну консультацію.</p>
          </div>

          <a
            href="tel:+380973077195"
            className="px-8 py-4 bg-[#e6b800] text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-colors shrink-0"
          >
            Зателефонувати
          </a>
        </div>

      </div>
    </section>
  );
};
