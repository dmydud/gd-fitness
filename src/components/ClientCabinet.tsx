import React, { useState, useEffect } from 'react';
import { ClientWorkoutLog, Exercise } from '../types';
import { UserCheck, Plus, CheckSquare, Square, Trash2, Scale, Droplet, Trophy, Save } from 'lucide-react';

interface ClientCabinetProps {
  addedExercisesFromCatalog: Exercise[];
  onClearAddedCatalogExercises: () => void;
}

export const ClientCabinet: React.FC<ClientCabinetProps> = ({
  addedExercisesFromCatalog,
  onClearAddedCatalogExercises
}) => {
  const [workoutTitle, setWorkoutTitle] = useState('Тренування Спина & Грудні');
  const [currentWeight, setCurrentWeight] = useState<number>(78.5);
  const [waterGlasses, setWaterGlasses] = useState<number>(5);

  const [activeWorkout, setActiveWorkout] = useState<ClientWorkoutLog>(() => {
    return {
      id: 'active-1',
      date: new Date().toISOString().split('T')[0],
      title: 'Сьогоднішнє тренування',
      completed: false,
      exercises: [
        {
          exerciseId: 'ex-1',
          exerciseName: 'Жим штанги лежачи на горизонтальній лаві',
          sets: [
            { setNumber: 1, reps: 12, weight: 60, completed: true },
            { setNumber: 2, reps: 10, weight: 70, completed: true },
            { setNumber: 3, reps: 8, weight: 80, completed: false },
          ]
        },
        {
          exerciseId: 'ex-3',
          exerciseName: 'Присідання зі штангою на плечах',
          sets: [
            { setNumber: 1, reps: 10, weight: 70, completed: true },
            { setNumber: 2, reps: 10, weight: 80, completed: false },
          ]
        }
      ]
    };
  });

  const [history, setHistory] = useState<ClientWorkoutLog[]>(() => {
    const saved = localStorage.getItem('gd_workout_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'hist-1',
        date: '2026-10-06',
        title: 'Тренування Ноги & Сідниці',
        completed: true,
        exercises: [
          {
            exerciseId: 'ex-3',
            exerciseName: 'Присідання зі штангою',
            sets: [
              { setNumber: 1, reps: 12, weight: 75, completed: true },
              { setNumber: 2, reps: 10, weight: 85, completed: true }
            ]
          }
        ]
      }
    ];
  });

  useEffect(() => {
    if (addedExercisesFromCatalog.length > 0) {
      addedExercisesFromCatalog.forEach((ex) => {
        const exists = activeWorkout.exercises.some((e) => e.exerciseId === ex.id);
        if (!exists) {
          setActiveWorkout((prev) => ({
            ...prev,
            exercises: [
              ...prev.exercises,
              {
                exerciseId: ex.id,
                exerciseName: ex.name,
                sets: [
                  { setNumber: 1, reps: 10, weight: 40, completed: false },
                  { setNumber: 2, reps: 10, weight: 40, completed: false },
                  { setNumber: 3, reps: 10, weight: 40, completed: false }
                ]
              }
            ]
          }));
        }
      });
      onClearAddedCatalogExercises();
    }
  }, [addedExercisesFromCatalog, activeWorkout.exercises, onClearAddedCatalogExercises]);

  useEffect(() => {
    localStorage.setItem('gd_workout_history', JSON.stringify(history));
  }, [history]);

  const toggleSetComplete = (exIdx: number, setIdx: number) => {
    setActiveWorkout((prev) => {
      const updatedExs = [...prev.exercises];
      const targetEx = { ...updatedExs[exIdx] };
      const updatedSets = [...targetEx.sets];
      updatedSets[setIdx] = {
        ...updatedSets[setIdx],
        completed: !updatedSets[setIdx].completed
      };
      targetEx.sets = updatedSets;
      updatedExs[exIdx] = targetEx;
      return { ...prev, exercises: updatedExs };
    });
  };

  const addSetToExercise = (exIdx: number) => {
    setActiveWorkout((prev) => {
      const updatedExs = [...prev.exercises];
      const targetEx = { ...updatedExs[exIdx] };
      const lastSet = targetEx.sets[targetEx.sets.length - 1] || { reps: 10, weight: 50 };
      targetEx.sets = [
        ...targetEx.sets,
        {
          setNumber: targetEx.sets.length + 1,
          reps: lastSet.reps,
          weight: lastSet.weight,
          completed: false
        }
      ];
      updatedExs[exIdx] = targetEx;
      return { ...prev, exercises: updatedExs };
    });
  };

  const updateSetValues = (exIdx: number, setIdx: number, field: 'reps' | 'weight', val: number) => {
    setActiveWorkout((prev) => {
      const updatedExs = [...prev.exercises];
      const targetEx = { ...updatedExs[exIdx] };
      const updatedSets = [...targetEx.sets];
      updatedSets[setIdx] = { ...updatedSets[setIdx], [field]: val };
      targetEx.sets = updatedSets;
      updatedExs[exIdx] = targetEx;
      return { ...prev, exercises: updatedExs };
    });
  };

  const removeExercise = (exIdx: number) => {
    setActiveWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, idx) => idx !== exIdx)
    }));
  };

  const handleFinishWorkout = () => {
    const finishedWorkout: ClientWorkoutLog = {
      ...activeWorkout,
      id: 'w-' + Date.now(),
      title: workoutTitle,
      completed: true,
      date: new Date().toISOString().split('T')[0]
    };
    setHistory((prev) => [finishedWorkout, ...prev]);
    alert('Вітаємо! Тренування збережено в історію щоденника! 💪');
  };

  // Stats calculation
  const totalVolume = activeWorkout.exercises.reduce((acc, ex) => {
    return (
      acc +
      ex.sets.reduce((sAcc, set) => {
        return set.completed ? sAcc + set.reps * set.weight : sAcc;
      }, 0)
    );
  }, 0);

  const completedSetsCount = activeWorkout.exercises.reduce((acc, ex) => {
    return acc + ex.sets.filter((s) => s.completed).length;
  }, 0);

  return (
    <section id="cabinet" className="py-20 bg-[#0a0c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6b800]/10 border border-[#e6b800]/30 text-[#e6b800] text-xs font-bold uppercase tracking-widest">
            <UserCheck className="w-3.5 h-3.5" />
            Особистий Кабінет Атлета
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
            ЩОДЕННИК <span className="text-[#e6b800]">ТРЕНУВАНЬ</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Фіксуй підходи, вагу, прогрес та відслідковуй свій загальний тоннаж за кожне тренування.
          </p>
        </div>

        {/* Daily Health Metrics Quick Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Weight Metric */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#e6b800]" />
                Поточна вага (кг)
              </span>
              <div className="text-2xl font-black text-white font-heading mt-1">
                {currentWeight} кг
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentWeight((w) => Number((w - 0.5).toFixed(1)))}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10"
              >
                -
              </button>
              <button
                onClick={() => setCurrentWeight((w) => Number((w + 0.5).toFixed(1)))}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10"
              >
                +
              </button>
            </div>
          </div>

          {/* Water Metric */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-[#3b82f6]" />
                Вода за день
              </span>
              <div className="text-2xl font-black text-[#3b82f6] font-heading mt-1">
                {waterGlasses} / 8 склянок
              </div>
            </div>
            <button
              onClick={() => setWaterGlasses((g) => (g < 12 ? g + 1 : 1))}
              className="px-3 py-2 rounded-xl bg-[#3b82f6]/20 border border-[#3b82f6]/40 text-xs font-bold text-white hover:bg-[#3b82f6] hover:text-black transition-all"
            >
              +1 Склянка
            </button>
          </div>

          {/* Tonage Summary */}
          <div className="p-6 rounded-2xl glass-panel-gold border border-[#e6b800]/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-[#e6b800]" />
                Піднятий Тоннаж
              </span>
              <div className="text-2xl font-black text-[#e6b800] font-heading mt-1">
                {totalVolume} кг
              </div>
            </div>
            <div className="text-xs text-gray-300 text-right">
              <span className="font-bold text-white">{completedSetsCount}</span> виконаних підходів
            </div>
          </div>

        </div>

        {/* Active Workout Builder */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-8">
          
          {/* Workout Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#e6b800] uppercase tracking-wider">
                Активна сесія тренування
              </span>
              <input
                type="text"
                value={workoutTitle}
                onChange={(e) => setWorkoutTitle(e.target.value)}
                className="text-2xl font-black text-white bg-transparent border-b border-transparent hover:border-white/20 focus:border-[#e6b800] focus:outline-none font-heading w-full sm:w-auto"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleFinishWorkout}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#e6b800] to-[#ff9900] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Save className="w-4 h-4" />
                Завершити & Зберегти
              </button>
            </div>
          </div>

          {/* Exercise Sets Table */}
          <div className="space-y-6">
            {activeWorkout.exercises.map((ex, exIdx) => (
              <div key={ex.exerciseId} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                
                {/* Exercise Title */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h4 className="text-base font-bold text-white font-heading">
                    {exIdx + 1}. {ex.exerciseName}
                  </h4>
                  <button
                    onClick={() => removeExercise(exIdx)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5"
                    title="Видалити вправу"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Sets Header */}
                <div className="grid grid-cols-12 gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider px-2">
                  <div className="col-span-2">Підхід</div>
                  <div className="col-span-4">Вага (кг)</div>
                  <div className="col-span-4">Повторення</div>
                  <div className="col-span-2 text-center">Статус</div>
                </div>

                {/* Sets List */}
                <div className="space-y-2">
                  {ex.sets.map((set, setIdx) => (
                    <div
                      key={setIdx}
                      className={`grid grid-cols-12 gap-2 items-center p-2 rounded-xl transition-colors ${
                        set.completed ? 'bg-[#10b981]/10 border border-[#10b981]/20' : 'bg-black/30 border border-white/5'
                      }`}
                    >
                      <div className="col-span-2 font-extrabold text-xs text-[#e6b800] pl-2">
                        #{set.setNumber}
                      </div>

                      <div className="col-span-4">
                        <input
                          type="number"
                          value={set.weight}
                          onChange={(e) => updateSetValues(exIdx, setIdx, 'weight', Number(e.target.value))}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold text-center focus:outline-none focus:border-[#e6b800]"
                        />
                      </div>

                      <div className="col-span-4">
                        <input
                          type="number"
                          value={set.reps}
                          onChange={(e) => updateSetValues(exIdx, setIdx, 'reps', Number(e.target.value))}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold text-center focus:outline-none focus:border-[#e6b800]"
                        />
                      </div>

                      <div className="col-span-2 flex justify-center">
                        <button
                          onClick={() => toggleSetComplete(exIdx, setIdx)}
                          className={`p-2 rounded-lg transition-transform active:scale-95 ${
                            set.completed ? 'text-[#10b981]' : 'text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {set.completed ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Set Button */}
                <button
                  onClick={() => addSetToExercise(exIdx)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#e6b800]" />
                  Додати підхід
                </button>

              </div>
            ))}
          </div>

        </div>

        {/* History List */}
        {history.length > 0 && (
          <div className="mt-12 space-y-4">
            <h3 className="text-xl font-bold text-white font-heading">
              Історія останніх тренувань
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.map((h) => (
                <div key={h.id} className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{h.title}</span>
                    <span className="text-[#e6b800] font-semibold">{h.date}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Вправи: {h.exercises.map((e) => e.exerciseName).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
