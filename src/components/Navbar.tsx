import React, { useState } from 'react';
import { Dumbbell, Calendar, BookOpen, Calculator, UserCheck, Instagram, Menu, X, PhoneCall, Users } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Головна' },
    { id: 'bio', label: 'Про Мене' },
    { id: 'pricing', label: 'Ціни' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#e6e2dd]/95 backdrop-blur-md border-b border-gray-300 text-black transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 sm:gap-4 cursor-pointer min-w-0" onClick={() => handleNavClick('hero')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-black/20 shrink-0">
              <img src="/profile.png" alt="Denis Gusev" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-magazine text-xl sm:text-2xl font-black tracking-tight leading-none uppercase truncate">
                Denis Gusev
              </span>
              <span className="text-[8px] sm:text-[9px] font-sans font-bold tracking-[0.2em] uppercase text-gray-500 mt-1 truncate">
                Personal Trainer
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                    isActive ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+380973077195"
              className="text-xs font-bold font-sans tracking-wider hover:text-gray-500 transition-colors"
            >
              +380 97 307 71 95
            </a>

            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 bg-black text-white text-[10px] uppercase font-bold tracking-widest hover:bg-gray-800 transition-colors"
            >
              Записатися
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:text-gray-600 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-black/10 bg-[#e6e2dd] px-4 pt-4 pb-8 space-y-4 shadow-2xl animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-3 text-sm uppercase tracking-widest font-bold transition-all ${
                  isActive ? 'text-black border-l-2 border-black pl-3' : 'text-gray-500 pl-3'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-6 border-t border-black/10 flex flex-col gap-4">
            <a
              href="tel:+380973077195"
              className="w-full text-center py-3 border border-black text-black text-xs uppercase font-bold tracking-widest"
            >
              Зателефонувати
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-black text-white text-xs uppercase font-bold tracking-widest"
            >
              Записатися
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
