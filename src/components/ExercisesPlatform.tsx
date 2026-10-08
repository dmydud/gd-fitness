import React, { useState } from 'react';
import { Exercise, MuscleGroup } from '../types';
import { ExerciseSVG } from './ExerciseSVG';
import { Search, Filter, PlusCircle, CheckCircle2, Dumbbell, Sparkles, BookOpen, AlertTriangle } from 'lucide-react';

interface ExercisesPlatformProps {
  exercises: Exercise[];
  onAddToWorkout: (exercise: Exercise) => void;
}

export const ExercisesPlatform: React.FC<ExercisesPlatformProps> = ({ exercises, onAddToWorkout }) => {
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const muscleGroups: { id: MuscleGroup; label: string }[] = [
    { id: 'all', label: 'Всі Вправи' },
    { id: 'chest', label: 'Грудні' },
    { id: 'back', label: 'Спина' },
    { id: 'legs', label: 'Ноги & Сідниці' },
    { id: 'shoulders', label: 'Плечі' },
    { id: 'arms', label: 'Руки' },
    { id: 'core', label: 'Прес & Кор' },
  ];

  const filteredExercises = exercises.filter((ex) => {
    const matchesGroup = selectedGroup === 'all' || ex.muscleGroup === selectedGroup;
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.muscleLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  const handleAddClick = (ex: Exercise, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToWorkout(ex);
    setAddedIds((prev) => [...prev, ex.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== ex.id));
    }, 2500);
  };

  return (
    <section id="exercises" className="py-20 bg-[#0a0c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6b800]/10 border border-[#e6b800]/30 text-[#e6b800] text-xs font-bold uppercase tracking-widest mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              Інтерактивна Бібліотека
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
              ПЛАТФОРМА З <span className="text-gradient-gold">ВПРАВАМИ</span>
            </h2>
            <p className="text-gray-300 text-sm mt-2 max-w-xl">
              Вивчай правильну біомеханіку, поради тренера GD та додавай вправи напряму у свій тренувальний щоденник.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Пошук вправи або м'яза..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#e6b800] text-sm transition-colors"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {muscleGroups.map((group) => {
            const isActive = selectedGroup === group.id;
            return (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#e6b800] to-[#ff9900] text-black shadow-md shadow-[#e6b800]/20'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>

        {/* Exercise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((ex) => {
            const isAdded = addedIds.includes(ex.id);
            return (
              <div
                key={ex.id}
                onClick={() => setSelectedExercise(ex)}
                className="group rounded-2xl glass-panel border border-white/10 hover:border-[#e6b800]/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
              >
                {/* Visual SVG Header */}
                <div className="bg-gradient-to-b from-[#141a26] to-[#0d1017] p-4 relative border-b border-white/5 flex items-center justify-center">
                  <ExerciseSVG type={ex.svgIconType} className="w-full h-36" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-bold text-[#e6b800] border border-[#e6b800]/30">
                    {ex.muscleLabel}
                  </span>

                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-semibold text-gray-300">
                    {ex.difficulty}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#e6b800] transition-colors line-clamp-1">
                      {ex.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 italic">
                      {ex.nameEn}
                    </p>
                    <p className="text-xs text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                      {ex.description}
                    </p>
                  </div>

                  {/* Equipment & Action */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5">
                      <Dumbbell className="w-3.5 h-3.5 text-[#e6b800]" />
                      {ex.equipment}
                    </span>

                    <button
                      onClick={(e) => handleAddClick(ex, e)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-[#10b981] text-black shadow-md'
                          : 'bg-[#e6b800]/10 border border-[#e6b800]/30 text-[#e6b800] hover:bg-[#e6b800] hover:text-black'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Додано!
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3.5 h-3.5" />
                          Додати
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredExercises.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl glass-panel border border-white/10">
            <Filter className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">Вправ не знайдено</h3>
            <p className="text-xs text-gray-400 mt-1">Спробуйте змінити фільтр або пошуковий запит.</p>
          </div>
        )}

      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0f131c] border border-[#e6b800]/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative space-y-6 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-[#e6b800] uppercase tracking-wider">
                  {selectedExercise.muscleLabel} • {selectedExercise.equipment}
                </span>
                <h3 className="text-2xl font-black text-white font-heading mt-1">
                  {selectedExercise.name}
                </h3>
                <p className="text-xs text-gray-400 italic">{selectedExercise.nameEn}</p>
              </div>
              <button
                onClick={() => setSelectedExercise(null)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* SVG Visual */}
            <div className="bg-gradient-to-b from-[#141a26] to-[#0a0c10] p-4 rounded-2xl border border-white/10 flex items-center justify-center">
              <ExerciseSVG type={selectedExercise.svgIconType} className="w-full h-48" />
            </div>

            {/* Target Muscles */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Цільові м'язові групи:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedExercise.targetMusclesDetail.map((m, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-[#e6b800]/10 border border-[#e6b800]/30 text-xs text-[#e6b800] font-semibold">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Step-by-Step Technique */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#e6b800]" />
                Покрокова техніка виконання:
              </h4>
              <ul className="space-y-2">
                {selectedExercise.technique.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-gray-300 leading-relaxed bg-white/5 p-3 rounded-xl">
                    <span className="w-5 h-5 rounded-full bg-[#e6b800] text-black font-extrabold text-[11px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="space-y-2 bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
              <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Часті помилки атлетів:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                {selectedExercise.commonMistakes.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>

            {/* Trainer Tip */}
            <div className="bg-[#e6b800]/10 border border-[#e6b800]/30 p-4 rounded-xl">
              <div className="text-xs font-bold text-[#e6b800] uppercase tracking-wider mb-1">
                Порада від тренера GD:
              </div>
              <p className="text-xs text-gray-200 italic">
                "{selectedExercise.trainerTip}"
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setSelectedExercise(null)}
                className="px-5 py-2.5 rounded-xl bg-white/5 text-xs font-bold text-gray-300 hover:text-white"
              >
                Закрити
              </button>
              <button
                onClick={() => {
                  onAddToWorkout(selectedExercise);
                  setSelectedExercise(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#e6b800] to-[#ff9900] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Додати в мій щоденник
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
