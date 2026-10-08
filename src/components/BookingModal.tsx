import React, { useState } from 'react';
import { User, Phone, MessageSquare, CheckCircle, X, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Персональний абонемент (12 тренувань)');
  const [note, setNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Save to localStorage
    const saved = localStorage.getItem('gd_modal_leads');
    const leads = saved ? JSON.parse(saved) : [];
    leads.push({ name, phone, service, note, date: new Date().toISOString() });
    localStorage.setItem('gd_modal_leads', JSON.stringify(leads));

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#0f131c] border border-[#e6b800]/40 rounded-3xl max-w-md w-full p-6 relative space-y-6 shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#e6b800] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Швидкий Запис
              </span>
              <h3 className="text-2xl font-black text-white font-heading">
                Записатися до GD
              </h3>
              <p className="text-xs text-gray-300">
                Залиште ваші контакти, і тренер зв’яжеться з вами протягом 15 хвилин.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#e6b800]" /> Ваше ім’я *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Олександр / Анна"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#e6b800]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#e6b800]" /> Телефон / Telegram *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+380 (99) 000-00-00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#e6b800]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Послуга</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#141a26] border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-[#e6b800]"
                >
                  <option>Разове тренування (600 ₴)</option>
                  <option>Персональний абонемент (12 тренувань - 6 000 ₴)</option>
                  <option>Онлайн Коучинг & Супровід (4 200 ₴)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#e6b800]" /> Коментар / Цілі
                </label>
                <textarea
                  rows={2}
                  placeholder="Ваша поточна вага, травми або побажання..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#e6b800]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#e6b800] to-[#ff9900] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Відправити заявку
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-[#10b981]" />
            </div>
            <h3 className="text-2xl font-bold text-white">Заявка прийнята!</h3>
            <p className="text-xs text-gray-300">
              Дякуємо, {name}! Тренер GD скорого зв’яжеться з вами.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#e6b800] to-[#ff9900] text-black font-bold text-xs"
            >
              Чудово
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
