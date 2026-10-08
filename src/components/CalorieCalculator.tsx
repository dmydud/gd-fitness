import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const CalorieCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(26);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(178);
  const [activity, setActivity] = useState<number>(1.375); // Moderate
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('lose');

  // Calculation (Mifflin-St Jeor Formula)
  const bmr =
    gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const tdee = Math.round(bmr * activity);

  let targetCalories = tdee;
  if (goal === 'lose') targetCalories = Math.round(tdee * 0.8);
  if (goal === 'gain') targetCalories = Math.round(tdee * 1.15);

  // Macros calculation
  // Protein: 2.0g per kg
  const proteinGrams = Math.round(weight * 2.0);
  const proteinCalories = proteinGrams * 4;

  // Fat: 1.0g per kg
  const fatGrams = Math.round(weight * 1.0);
  const fatCalories = fatGrams * 9;

  // Carbs: Remaining calories / 4
  const carbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(carbCalories / 4);

  return (
    <section id="calculator" className="py-20 bg-[#0c0f17] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6b800]/10 border border-[#e6b800]/30 text-[#e6b800] text-xs font-bold uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5" />
            Калькулятор Фітнесу
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
            РОЗРАХУНОК <span className="text-[#e6b800]">КБЖУ ТА КАЛОРІЙ</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Дізнайтеся вашу добову норму калорій та співвідношення білків, жирів і вуглеводів для досягнення цілі.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Inputs Column */}
          <div className="lg:col-span-6 space-y-6 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10">
            
            {/* Gender Choice */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Стать</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-3 rounded-xl text-xs font-bold transition-all ${
                    gender === 'male'
                      ? 'bg-[#e6b800] text-black shadow-md'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Чоловік ♂
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-3 rounded-xl text-xs font-bold transition-all ${
                    gender === 'female'
                      ? 'bg-[#e6b800] text-black shadow-md'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Жінка ♀
                </button>
              </div>
            </div>

            {/* Age, Weight, Height */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Вік</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm text-center focus:outline-none focus:border-[#e6b800]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Вага (кг)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm text-center focus:outline-none focus:border-[#e6b800]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Зріст (см)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm text-center focus:outline-none focus:border-[#e6b800]"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Рівень активності</label>
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-[#141a26] border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-[#e6b800]"
              >
                <option value={1.2}>Сидячий спосіб життя (без тренувань)</option>
                <option value={1.375}>Помірна активність (1-3 тренування на тиждень)</option>
                <option value={1.55}>Висока активність (3-5 тренувань на тиждень)</option>
                <option value={1.725}>Дуже висока (щоденні інтенсивні тренування)</option>
              </select>
            </div>

            {/* Goal Choice */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ваша Головна Мета</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setGoal('lose')}
                  className={`py-3 rounded-xl text-xs font-bold transition-all ${
                    goal === 'lose'
                      ? 'bg-[#ff9900] text-black shadow-md'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  🔥 Схуднення (-20%)
                </button>
                <button
                  type="button"
                  onClick={() => setGoal('maintain')}
                  className={`py-3 rounded-xl text-xs font-bold transition-all ${
                    goal === 'maintain'
                      ? 'bg-[#10b981] text-black shadow-md'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  ⚖️ Підтримання
                </button>
                <button
                  type="button"
                  onClick={() => setGoal('gain')}
                  className={`py-3 rounded-xl text-xs font-bold transition-all ${
                    goal === 'gain'
                      ? 'bg-[#e6b800] text-black shadow-md'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  💪 Набір Маси (+15%)
                </button>
              </div>
            </div>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl glass-panel-gold border border-[#e6b800]/30 shadow-2xl relative overflow-hidden">
              
              <div className="text-center space-y-2 border-b border-white/10 pb-6">
                <span className="text-xs font-bold text-[#e6b800] uppercase tracking-widest">
                  Ваша добова мета
                </span>
                <div className="text-5xl font-black text-white font-heading tracking-tight">
                  {targetCalories} <span className="text-2xl text-[#e6b800]">ккал / день</span>
                </div>
                <p className="text-xs text-gray-300">
                  Основний метаболізм (BMR): {Math.round(bmr)} ккал • Підтримання (TDEE): {tdee} ккал
                </p>
              </div>

              {/* Macro Bars */}
              <div className="mt-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Рекомендоване розщеплення БЖУ в грамах:
                </h4>

                <div className="space-y-3">
                  {/* Protein */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#e6b800]">Білки (30-35%)</span>
                      <span className="text-white">{proteinGrams} г ({proteinCalories} ккал)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#e6b800]" style={{ width: '35%' }} />
                    </div>
                  </div>

                  {/* Fats */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#ff9900]">Жири (25-30%)</span>
                      <span className="text-white">{fatGrams} г ({fatCalories} ккал)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#ff9900]" style={{ width: '25%' }} />
                    </div>
                  </div>

                  {/* Carbs */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#10b981]">Вуглеводи (40%)</span>
                      <span className="text-white">{carbGrams} г ({carbCalories} ккал)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#10b981]" style={{ width: '40%' }} />
                    </div>
                  </div>

                </div>

                <div className="pt-4 text-xs text-gray-400 italic text-center">
                  * Повна індивідуальна програма харчування складається тренером GD після аналізу ваших аналізів та вподобань.
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
