import React, { useState, useEffect } from 'react';
import { CalendarTimeSlot, BookingAppointment } from '../types';
import { Calendar as CalendarIcon, Clock, CheckCircle, User, Phone, MessageSquare, Sparkles } from 'lucide-react';

interface BookingCalendarProps {
  onBookingSuccess?: (appt: BookingAppointment) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ onBookingSuccess }) => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-12');
  const [selectedSlot, setSelectedSlot] = useState<string>('14:00');
  const [sessionType, setSessionType] = useState<'personal' | 'online' | 'nutrition'>('personal');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [appointments, setAppointments] = useState<BookingAppointment[]>(() => {
    const saved = localStorage.getItem('gd_appointments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'appt-demo-1',
        clientName: 'Олексій П.',
        clientPhone: '+380 67 *** ** 44',
        date: '2026-10-10',
        time: '11:00',
        typeLabel: 'Персональне тренування в залі',
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    localStorage.setItem('gd_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const timeSlots: CalendarTimeSlot[] = [
    { id: 't1', time: '09:00', isAvailable: true, type: 'personal' },
    { id: 't2', time: '11:00', isAvailable: false, type: 'personal' },
    { id: 't3', time: '14:00', isAvailable: true, type: 'personal' },
    { id: 't4', time: '16:00', isAvailable: true, type: 'online' },
    { id: 't5', time: '18:00', isAvailable: true, type: 'personal' },
    { id: 't6', time: '20:00', isAvailable: false, type: 'nutrition' },
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    const newAppt: BookingAppointment = {
      id: 'appt-' + Date.now(),
      clientName,
      clientPhone,
      date: selectedDate,
      time: selectedSlot,
      typeLabel:
        sessionType === 'personal'
          ? 'Персональне тренування в залі'
          : sessionType === 'online'
          ? 'Онлайн-коучинг консультація'
          : 'Розбір КБЖУ та харчування',
      notes,
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [newAppt, ...prev]);
    setBookingConfirmed(true);

    if (onBookingSuccess) {
      onBookingSuccess(newAppt);
    }
  };

  return (
    <section id="calendar" className="py-20 bg-[#0c0f17] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6b800]/10 border border-[#e6b800]/30 text-[#e6b800] text-xs font-bold uppercase tracking-widest">
            <CalendarIcon className="w-3.5 h-3.5" />
            Онлайн Календар
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
            ЗАПИС НА <span className="text-[#e6b800]">ТРЕНУВАННЯ</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Оберіть зручну дату та час для персонального тренування в залі або онлайн консультації з GD.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Date & Time Slot Selector */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Select Type */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#e6b800]" />
                1. Формат тренування / консультації
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSessionType('personal')}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    sessionType === 'personal'
                      ? 'bg-[#e6b800]/15 border-[#e6b800] text-white shadow-md'
                      : 'bg-white/5 border-white/5 text-gray-300 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-bold text-[#e6b800]">В Залі</div>
                  <div className="text-sm font-bold mt-1">Персональне</div>
                  <div className="text-[11px] text-gray-400 mt-1">1 на 1 з тренером</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSessionType('online')}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    sessionType === 'online'
                      ? 'bg-[#ff9900]/15 border-[#ff9900] text-white shadow-md'
                      : 'bg-white/5 border-white/5 text-gray-300 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-bold text-[#ff9900]">Онлайн</div>
                  <div className="text-sm font-bold mt-1">Коучинг</div>
                  <div className="text-[11px] text-gray-400 mt-1">Відео-дзвінок</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSessionType('nutrition')}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    sessionType === 'nutrition'
                      ? 'bg-[#10b981]/15 border-[#10b981] text-white shadow-md'
                      : 'bg-white/5 border-white/5 text-gray-300 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-bold text-[#10b981]">Харчування</div>
                  <div className="text-sm font-bold mt-1">Розбір КБЖУ</div>
                  <div className="text-[11px] text-gray-400 mt-1">Аналіз раціону</div>
                </button>
              </div>
            </div>

            {/* Step 2: Date Picker */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#e6b800]" />
                2. Оберіть дату
              </h3>

              <div className="flex items-center gap-3">
                <input
                  type="date"
                  min="2026-10-08"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm focus:outline-none focus:border-[#e6b800]"
                />
                <span className="text-xs text-gray-400">
                  Обрана дата: <strong className="text-white">{selectedDate}</strong>
                </span>
              </div>
            </div>

            {/* Step 3: Available Time Slots */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#e6b800]" />
                3. Доступні слоти часу
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => {
                  const isSelected = selectedSlot === slot.time;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.isAvailable}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        !slot.isAvailable
                          ? 'bg-white/5 border-white/5 text-gray-500 cursor-not-allowed opacity-50'
                          : isSelected
                          ? 'bg-[#e6b800] border-[#e6b800] text-black font-extrabold shadow-lg scale-[1.02]'
                          : 'bg-white/5 border-white/10 text-gray-200 hover:border-[#e6b800]/50'
                      }`}
                    >
                      <span className="text-base font-bold">{slot.time}</span>
                      <span className="text-[10px] uppercase font-semibold">
                        {slot.isAvailable ? (isSelected ? 'Обрано' : 'Вільний слот') : 'Зайнято'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right: Booking Confirmation Form */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl glass-panel-gold border border-[#e6b800]/30 space-y-6 shadow-2xl">
              
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white font-heading">
                  Деталі запису
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  Заповніть контактні дані для підтвердження через Telegram/Viber.
                </p>
              </div>

              {!bookingConfirmed ? (
                <form onSubmit={handleBook} className="space-y-4">
                  
                  {/* Selected Summary Badge */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs text-gray-300">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Формат:</span>
                      <span className="font-bold text-[#e6b800]">
                        {sessionType === 'personal' ? 'В залі (Офлайн)' : sessionType === 'online' ? 'Онлайн Коучинг' : 'Розбір КБЖУ'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Дата & Час:</span>
                      <span className="font-bold text-white">{selectedDate} о {selectedSlot}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#e6b800]" />
                      Ваше ім’я *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Олександр / Анна"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#e6b800]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#e6b800]" />
                      Номер телефону / Telegram *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+380 (99) 000-00-00"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#e6b800]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#e6b800]" />
                      Побажання / Досвід тренувань
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Наприклад: Хочу скинути 5кг або набрати м'язову масу..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#e6b800]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#e6b800] to-[#ff9900] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#e6b800]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Підтвердити запис на {selectedSlot}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-[#10b981]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Запис успішно створено!</h4>
                    <p className="text-xs text-gray-300 mt-2">
                      Дякуємо, <strong>{clientName}</strong>. Тренер GD зв'яжеться з вами за номером <strong>{clientPhone}</strong> для уточнення деталей.
                    </p>
                  </div>
                  <button
                    onClick={() => setBookingConfirmed(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 text-xs text-gray-300 hover:text-white"
                  >
                    Записатися ще раз
                  </button>
                </div>
              )}

              {/* List of User Bookings */}
              {appointments.length > 0 && (
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Ваші активні записи ({appointments.length}):
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {appointments.map((appt) => (
                      <div key={appt.id} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1">
                        <div className="flex items-center justify-between text-white font-bold">
                          <span>{appt.typeLabel}</span>
                          <span className="text-[#e6b800]">{appt.date} • {appt.time}</span>
                        </div>
                        <div className="text-gray-400">Клієнт: {appt.clientName} ({appt.clientPhone})</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
