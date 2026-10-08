import React from 'react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-black text-[#e6e2dd] border-t border-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/20 pb-16">
          
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="cursor-pointer inline-block" onClick={() => { setActiveTab('hero'); window.scrollTo(0,0); }}>
              <div className="font-magazine text-5xl sm:text-7xl font-black uppercase leading-none">
                Gusev<br/><span className="text-[#e6b800] italic">Fitness.</span>
              </div>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest mt-8 opacity-70 max-w-xs">
              Твій провідник у світ сили та естетики.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-[#e6b800]">Навігація</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => { setActiveTab('bio'); document.getElementById('bio')?.scrollIntoView(); }} className="text-xs font-bold uppercase tracking-widest hover:text-[#e6b800] transition-colors">
                  Про Мене
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('pricing'); document.getElementById('pricing')?.scrollIntoView(); }} className="text-xs font-bold uppercase tracking-widest hover:text-[#e6b800] transition-colors">
                  Абонементи
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-[#e6b800]">Контакти</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li>
                <div className="opacity-50 mb-1 text-[9px]">Телефон</div>
                <a href="tel:+380973077195" className="hover:text-[#e6b800] transition-colors">
                  +380 97 307 71 95
                </a>
              </li>
              <li>
                <div className="opacity-50 mb-1 text-[9px]">Локація</div>
                <div>Інтер Атлетика</div>
              </li>
              <li>
                <div className="opacity-50 mb-1 text-[9px]">Графік</div>
                <div>Вт, Чт, Сб, Нд: 08:00 - 21:00</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50">
            © {new Date().getFullYear()} GD Fitness
          </p>
          <div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50">
            Designed for Impact.
          </div>
        </div>
      </div>
    </footer>
  );
};
