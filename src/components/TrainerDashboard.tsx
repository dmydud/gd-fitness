import React, { useState, useEffect } from 'react';
import {
  Users, Calendar, ChevronDown, ChevronUp, Plus, Edit3,
  CheckCircle2, Clock, Trophy, Scale, Phone, MessageSquare,
  Dumbbell, Star, XCircle, PauseCircle, ArrowRight, Save, X
} from 'lucide-react';
import { TrainerClient, ClientMeasurement, ClientGoal, ClientStatus } from '../types';

const DEMO_CLIENTS: TrainerClient[] = [
  {
    id: 'cl-1',
    name: 'Олексій Петренко',
    age: 27,
    phone: '+380 67 123 45 67',
    goal: 'muscle_gain',
    goalLabel: 'Набір м\'язової маси',
    status: 'active',
    startDate: '2026-09-01',
    package: '12 занять',
    sessionsTotal: 12,
    sessionsCompleted: 8,
    measurements: [
      { date: '2026-09-01', weight: 74.0, chest: 97, waist: 82, bodyFat: 18 },
      { date: '2026-09-15', weight: 75.5, chest: 98, waist: 81, bodyFat: 17 },
      { date: '2026-10-01', weight: 77.0, chest: 100, waist: 80, bodyFat: 16.5 },
    ],
    assignedWorkouts: [
      { id: 'aw-1', weekDay: 'Понеділок', title: 'Груди & Трицепс', exercises: ['Жим лежачи', 'Розведення гантелей', 'Французький жим'], completed: true, completedDate: '2026-10-07' },
      { id: 'aw-2', weekDay: 'Середа', title: 'Спина & Біцепс', exercises: ['Підтягування', 'Тяга штанги', 'Молоточки'], completed: true, completedDate: '2026-10-09' },
      { id: 'aw-3', weekDay: 'П\'ятниця', title: 'Ноги & Плечі', exercises: ['Присідання', 'Жим ногами', 'Армійський жим'], completed: false },
    ],
    notes: 'Прогрес відмінний. Збільшити вагу на жимі до 80кг. Слідкувати за технікою в присіданнях.',
    nextSession: '2026-10-11 11:00',
    avatar: '💪',
    progressPercent: 67,
  },
  {
    id: 'cl-2',
    name: 'Марина Коваленко',
    age: 24,
    phone: '+380 50 987 65 43',
    goal: 'weight_loss',
    goalLabel: 'Схуднення',
    status: 'active',
    startDate: '2026-09-10',
    package: '12 занять',
    sessionsTotal: 12,
    sessionsCompleted: 5,
    measurements: [
      { date: '2026-09-10', weight: 68.5, waist: 76, hips: 102, bodyFat: 28 },
      { date: '2026-09-25', weight: 67.0, waist: 74, hips: 100, bodyFat: 27 },
      { date: '2026-10-08', weight: 65.8, waist: 72, hips: 98, bodyFat: 26 },
    ],
    assignedWorkouts: [
      { id: 'aw-4', weekDay: 'Вівторок', title: 'Кардіо & Кор', exercises: ['Планка', 'Скручування', 'Велотренажер 20хв'], completed: true, completedDate: '2026-10-07' },
      { id: 'aw-5', weekDay: 'Четвер', title: 'Ноги & Сідниці', exercises: ['Присідання', 'Випади', 'Ягідний міст'], completed: false },
      { id: 'aw-6', weekDay: 'Субота', title: 'Повне тіло', exercises: ['Берпі', 'Підтягування з гумою', 'Планка бічна'], completed: false },
    ],
    notes: 'Відмінна мотивація! Зменшено калорійність на 200 ккал. Наступний замір 15 жовтня.',
    nextSession: '2026-10-10 14:00',
    avatar: '🏃‍♀️',
    progressPercent: 42,
  },
  {
    id: 'cl-3',
    name: 'Дмитро Сич',
    age: 32,
    phone: '+380 97 555 44 33',
    goal: 'health',
    goalLabel: 'Здоров\'я & Постава',
    status: 'active',
    startDate: '2026-08-15',
    package: '3 заняття',
    sessionsTotal: 3,
    sessionsCompleted: 3,
    measurements: [
      { date: '2026-08-15', weight: 88.0, waist: 96, bodyFat: 24 },
      { date: '2026-09-20', weight: 86.5, waist: 93, bodyFat: 23 },
    ],
    assignedWorkouts: [
      { id: 'aw-7', weekDay: 'Понеділок', title: 'Мобільність & Кор', exercises: ['Котяча спина', 'Тягнення до грудей', 'Супермен'], completed: true, completedDate: '2026-10-06' },
    ],
    notes: 'Пакет завершено. Запропонувати продовження на 12 занять. Є проблема з поперековим відділом.',
    avatar: '⚡',
    progressPercent: 100,
  },
  {
    id: 'cl-4',
    name: 'Анна Левченко',
    age: 19,
    phone: '+380 63 222 11 55',
    goal: 'sport',
    goalLabel: 'Спортивна форма',
    status: 'new',
    startDate: '2026-10-08',
    package: '12 занять',
    sessionsTotal: 12,
    sessionsCompleted: 0,
    measurements: [
      { date: '2026-10-08', weight: 56.0, chest: 86, waist: 62, hips: 90, bodyFat: 22 },
    ],
    assignedWorkouts: [],
    notes: 'Новий клієнт. Студентка ЛНТУ. Ціль — загальна спортивна форма та витривалість. Потрібно скласти програму.',
    nextSession: '2026-10-12 09:00',
    avatar: '🌟',
    progressPercent: 0,
  },
];

// Goal colors available for future use
const _GOAL_COLORS: Record<ClientGoal, string> = {
  muscle_gain: 'text-[#e6b800] bg-[#e6b800]/10 border-[#e6b800]/30',
  weight_loss: 'text-[#ff9900] bg-[#ff9900]/10 border-[#ff9900]/30',
  endurance: 'text-[#3b82f6] bg-[#3b82f6]/10 border-[#3b82f6]/30',
  health: 'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/30',
  sport: 'text-[#8b5cf6] bg-[#8b5cf6]/10 border-[#8b5cf6]/30',
};
void _GOAL_COLORS;

const STATUS_CONFIG: Record<ClientStatus, { label: string; color: string; icon: React.ElementType }> = {
  active: { label: 'Активний', color: 'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/30', icon: CheckCircle2 },
  paused: { label: 'Пауза', color: 'text-[#ff9900] bg-[#ff9900]/10 border-[#ff9900]/30', icon: PauseCircle },
  completed: { label: 'Завершено', color: 'text-gray-400 bg-gray-400/10 border-gray-400/30', icon: Trophy },
  new: { label: 'Новий', color: 'text-[#3b82f6] bg-[#3b82f6]/10 border-[#3b82f6]/30', icon: Star },
};

const TRAINER_PASSWORD = 'gd2023';

interface EditNoteModalProps {
  client: TrainerClient;
  onSave: (id: string, note: string) => void;
  onClose: () => void;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({ client, onSave, onClose }) => {
  const [note, setNote] = useState(client.notes);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg glass-panel-gold rounded-3xl border border-[#e6b800]/30 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Нотатки: {client.name}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <textarea
          rows={6}
          value={note}
          onChange={e => setNote(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#e6b800] resize-none"
          placeholder="Нотатки тренера..."
        />
        <div className="flex gap-3">
          <button onClick={() => { onSave(client.id, note); onClose(); }} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#e6b800] to-[#ff9900] text-black font-bold text-sm flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Зберегти
          </button>
          <button onClick={onClose} className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-semibold">
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
};

interface AddMeasurementModalProps {
  client: TrainerClient;
  onSave: (id: string, m: ClientMeasurement) => void;
  onClose: () => void;
}

const AddMeasurementModal: React.FC<AddMeasurementModalProps> = ({ client, onSave, onClose }) => {
  const [m, setM] = useState<ClientMeasurement>({
    date: new Date().toISOString().split('T')[0],
    weight: client.measurements[client.measurements.length - 1]?.weight || 70,
    waist: undefined,
    chest: undefined,
    hips: undefined,
    bodyFat: undefined,
  });
  const handleNum = (field: keyof ClientMeasurement, val: string) => {
    setM(prev => ({ ...prev, [field]: val === '' ? undefined : Number(val) }));
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md glass-panel-gold rounded-3xl border border-[#e6b800]/30 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Новий замір: {client.name}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Дата', field: 'date', type: 'date' },
            { label: 'Вага (кг)', field: 'weight', type: 'number' },
            { label: 'Груди (см)', field: 'chest', type: 'number' },
            { label: 'Талія (см)', field: 'waist', type: 'number' },
            { label: 'Стегна (см)', field: 'hips', type: 'number' },
            { label: 'Жир (%)', field: 'bodyFat', type: 'number' },
          ].map(({ label, field, type }) => (
            <div key={field}>
              <label className="text-xs text-gray-400 font-semibold mb-1 block">{label}</label>
              <input
                type={type}
                value={((m as unknown as Record<string, unknown>)[field] as string) ?? ''}
                onChange={e => field === 'date' ? setM(p => ({ ...p, date: e.target.value })) : handleNum(field as keyof ClientMeasurement, e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#e6b800]"
              />
            </div>
          ))}
        </div>
        <button onClick={() => { onSave(client.id, m); onClose(); }} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e6b800] to-[#ff9900] text-black font-bold text-sm flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" /> Додати замір
        </button>
      </div>
    </div>
  );
};

const ClientCard: React.FC<{
  client: TrainerClient;
  onEditNote: (c: TrainerClient) => void;
  onAddMeasurement: (c: TrainerClient) => void;
  onToggleWorkout: (clientId: string, workoutId: string) => void;
}> = ({ client, onEditNote, onAddMeasurement, onToggleWorkout }) => {
  const [expanded, setExpanded] = useState(false);
  const statusCfg = STATUS_CONFIG[client.status];
  const StatusIcon = statusCfg.icon;
  const latest = client.measurements[client.measurements.length - 1];
  const prev = client.measurements[client.measurements.length - 2];
  const weightDelta = prev && latest ? (latest.weight - prev.weight).toFixed(1) : null;

  return (
    <div className={`rounded-2xl glass-panel border transition-all duration-300 ${expanded ? 'border-[#e6b800]/40' : 'border-white/10 hover:border-white/20'}`}>
      {/* Card Header */}
      <button
        className="w-full p-5 flex items-center gap-4 text-left"
        onClick={() => setExpanded(e => !e)}
      >
        {/* Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e6b800]/20 to-[#ff9900]/10 border border-[#e6b800]/20 flex items-center justify-center text-2xl shrink-0">
          {client.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white text-base">{client.name}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusCfg.color} flex items-center gap-1`}>
              <StatusIcon className="w-3 h-3" />
              {statusCfg.label}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{client.age} р. • {client.goalLabel} • {client.package}</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex-1 bg-white/10 rounded-full h-1.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#e6b800] to-[#ff9900] transition-all"
                style={{ width: `${client.progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#e6b800] shrink-0">{client.sessionsCompleted}/{client.sessionsTotal}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          {latest && <span className="text-sm font-black text-white">{latest.weight} кг</span>}
          {weightDelta && (
            <span className={`text-xs font-bold ${Number(weightDelta) < 0 ? 'text-[#10b981]' : 'text-[#e6b800]'}`}>
              {Number(weightDelta) > 0 ? '+' : ''}{weightDelta} кг
            </span>
          )}
          {expanded ? <ChevronUp className="w-4 h-4 text-gray-400 mt-1" /> : <ChevronDown className="w-4 h-4 text-gray-400 mt-1" />}
        </div>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-white/5 pt-4">

          {/* Contact + Next Session */}
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${client.phone}`} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 hover:text-[#e6b800] hover:border-[#e6b800]/30 transition-all">
              <Phone className="w-3.5 h-3.5 text-[#e6b800]" />
              {client.phone}
            </a>
            {client.nextSession && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#e6b800]/10 border border-[#e6b800]/20 text-xs text-[#e6b800] font-semibold">
                <Clock className="w-3.5 h-3.5" />
                Наступне: {client.nextSession}
              </div>
            )}
          </div>

          {/* Measurements Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-[#e6b800]" /> Динаміка заміру
              </h4>
              <button
                onClick={() => onAddMeasurement(client)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e6b800]/10 border border-[#e6b800]/20 text-[10px] font-bold text-[#e6b800] hover:bg-[#e6b800]/20 transition-all"
              >
                <Plus className="w-3 h-3" /> Новий замір
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-400 border-b border-white/5">
                    <th className="text-left pb-2 font-semibold">Дата</th>
                    <th className="text-center pb-2 font-semibold">Вага</th>
                    <th className="text-center pb-2 font-semibold">Груди</th>
                    <th className="text-center pb-2 font-semibold">Талія</th>
                    <th className="text-center pb-2 font-semibold">% жиру</th>
                  </tr>
                </thead>
                <tbody>
                  {client.measurements.slice().reverse().map((m, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="py-2 text-gray-300">{m.date}</td>
                      <td className="py-2 text-center font-bold text-white">{m.weight}</td>
                      <td className="py-2 text-center text-gray-300">{m.chest ?? '—'}</td>
                      <td className="py-2 text-center text-gray-300">{m.waist ?? '—'}</td>
                      <td className="py-2 text-center text-gray-300">{m.bodyFat ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Weekly Workouts */}
          {client.assignedWorkouts.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2 mb-3">
                <Dumbbell className="w-3.5 h-3.5 text-[#e6b800]" /> Тижнева програма
              </h4>
              <div className="space-y-2">
                {client.assignedWorkouts.map(w => (
                  <div key={w.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${w.completed ? 'bg-[#10b981]/10 border-[#10b981]/20' : 'bg-white/5 border-white/5'}`}>
                    <button
                      onClick={() => onToggleWorkout(client.id, w.id)}
                      className={`shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${w.completed ? 'bg-[#10b981] border-[#10b981] text-black' : 'border-gray-500 hover:border-[#e6b800]'}`}
                    >
                      {w.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#e6b800]">{w.weekDay}</span>
                        <span className="font-bold text-white text-xs">{w.title}</span>
                        {w.completed && w.completedDate && (
                          <span className="text-[10px] text-[#10b981]">✓ {w.completedDate}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 truncate mt-0.5">{w.exercises.join(' • ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trainer Notes */}
          <div className="p-4 rounded-xl bg-[#e6b800]/5 border border-[#e6b800]/15 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#e6b800] uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Нотатки тренера
              </span>
              <button onClick={() => onEditNote(client)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-[#e6b800] transition-all">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">{client.notes}</p>
          </div>

        </div>
      )}
    </div>
  );
};

export const TrainerDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [clients, setClients] = useState<TrainerClient[]>(() => {
    const saved = localStorage.getItem('gd_trainer_clients');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return DEMO_CLIENTS;
  });
  const [editNoteClient, setEditNoteClient] = useState<TrainerClient | null>(null);
  const [addMeasurementClient, setAddMeasurementClient] = useState<TrainerClient | null>(null);
  const [filterStatus, setFilterStatus] = useState<ClientStatus | 'all'>('all');

  useEffect(() => {
    localStorage.setItem('gd_trainer_clients', JSON.stringify(clients));
  }, [clients]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === TRAINER_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleSaveNote = (id: string, note: string) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, notes: note } : c));
  };

  const handleAddMeasurement = (id: string, m: ClientMeasurement) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, measurements: [...c.measurements, m] } : c));
  };

  const handleToggleWorkout = (clientId: string, workoutId: string) => {
    setClients(prev => prev.map(c => {
      if (c.id !== clientId) return c;
      const updatedWorkouts = c.assignedWorkouts.map(w => {
        if (w.id !== workoutId) return w;
        return { ...w, completed: !w.completed, completedDate: !w.completed ? new Date().toISOString().split('T')[0] : undefined };
      });
      const sessionsDone = Math.min(c.sessionsTotal, c.sessionsCompleted + (updatedWorkouts.filter(w => w.completed).length - c.assignedWorkouts.filter(w => w.completed).length));
      return { ...c, assignedWorkouts: updatedWorkouts, sessionsCompleted: Math.max(0, sessionsDone) };
    }));
  };

  const filteredClients = filterStatus === 'all' ? clients : clients.filter(c => c.status === filterStatus);

  // Stats
  const activeCount = clients.filter(c => c.status === 'active').length;
  const newCount = clients.filter(c => c.status === 'new').length;
  const totalSessions = clients.reduce((a, c) => a + c.sessionsCompleted, 0);
  const completedWorkouts = clients.reduce((a, c) => a + c.assignedWorkouts.filter(w => w.completed).length, 0);

  if (!isAuthenticated) {
    return (
      <section id="trainer-dashboard" className="py-20 bg-[#0c0f16] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6b800]/10 border border-[#e6b800]/30 text-[#e6b800] text-xs font-bold uppercase tracking-widest">
              <Users className="w-3.5 h-3.5" />
              Панель Тренера
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
              КАБІНЕТ <span className="text-[#e6b800]">ТРЕНЕРА GD</span>
            </h2>
            <p className="text-gray-300 text-sm">
              Панель управління клієнтами — лише для тренера Дениса Гусєва.
            </p>
          </div>

          <div className="max-w-sm mx-auto">
            <form onSubmit={handleLogin} className="p-8 rounded-3xl glass-panel-gold border border-[#e6b800]/30 space-y-5 shadow-2xl">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#e6b800] to-[#ff9900] p-0.5 shadow-lg">
                  <div className="w-full h-full bg-[#0a0c10] rounded-[14px] flex items-center justify-center">
                    <img src="/trainer-card.jpg" alt="Denis" className="w-full h-full object-cover object-top rounded-[14px]" />
                  </div>
                </div>
                <p className="text-sm font-bold text-white">Денис Гусєв</p>
                <p className="text-xs text-gray-400">Введіть пароль тренера</p>
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setPasswordError(false); }}
                  placeholder="Пароль тренера"
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm focus:outline-none focus:border-[#e6b800] ${passwordError ? 'border-red-500' : 'border-white/10'}`}
                />
                {passwordError && <p className="text-xs text-red-400 mt-1.5">Невірний пароль. Спробуйте ще раз.</p>}
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e6b800] to-[#ff9900] text-black font-bold text-sm flex items-center justify-center gap-2">
                Увійти в панель <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[10px] text-gray-500">(демо: gd2023)</p>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="trainer-dashboard" className="py-20 bg-[#0c0f16] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6b800]/10 border border-[#e6b800]/30 text-[#e6b800] text-xs font-bold uppercase tracking-widest">
              <Users className="w-3.5 h-3.5" /> Панель Тренера
            </div>
            <h2 className="text-3xl font-black text-white font-heading">
              МОЇ <span className="text-[#e6b800]">КЛІЄНТИ</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Привіт, Дениccе! 👋</span>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 hover:text-white hover:border-white/20 flex items-center gap-2"
            >
              <XCircle className="w-3.5 h-3.5" /> Вийти
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Активних клієнтів', value: activeCount, icon: Users, color: 'text-[#10b981]' },
            { label: 'Нових клієнтів', value: newCount, icon: Star, color: 'text-[#3b82f6]' },
            { label: 'Занять проведено', value: totalSessions, icon: Calendar, color: 'text-[#e6b800]' },
            { label: 'Тренувань виконано', value: completedWorkouts, icon: CheckCircle2, color: 'text-[#ff9900]' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="p-5 rounded-2xl glass-panel border border-white/10 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-[11px] text-gray-400">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'active', 'new', 'paused', 'completed'] as Array<ClientStatus | 'all'>).map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                filterStatus === s
                  ? 'bg-gradient-to-r from-[#e6b800] to-[#ff9900] text-black border-transparent'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20'
              }`}
            >
              {s === 'all' ? 'Всі' : STATUS_CONFIG[s as ClientStatus].label}
              <span className="ml-1.5 opacity-70">
                {s === 'all' ? clients.length : clients.filter(c => c.status === s).length}
              </span>
            </button>
          ))}
        </div>

        {/* Clients List */}
        <div className="space-y-3">
          {filteredClients.map(client => (
            <ClientCard
              key={client.id}
              client={client}
              onEditNote={setEditNoteClient}
              onAddMeasurement={setAddMeasurementClient}
              onToggleWorkout={handleToggleWorkout}
            />
          ))}
          {filteredClients.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Немає клієнтів з таким статусом.</p>
            </div>
          )}
        </div>

      </div>

      {/* Modals */}
      {editNoteClient && (
        <EditNoteModal
          client={editNoteClient}
          onSave={handleSaveNote}
          onClose={() => setEditNoteClient(null)}
        />
      )}
      {addMeasurementClient && (
        <AddMeasurementModal
          client={addMeasurementClient}
          onSave={handleAddMeasurement}
          onClose={() => setAddMeasurementClient(null)}
        />
      )}
    </section>
  );
};
