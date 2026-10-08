import React from 'react';
import { INITIAL_REVIEWS } from '../data/exercisesData';
import { Star, Trophy, CheckCircle } from 'lucide-react';

export const TransformationsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#0a0c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6b800]/10 border border-[#e6b800]/30 text-[#e6b800] text-xs font-bold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" />
            Результати Клієнтів
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
            ТРАНСФОРМАЦІЇ ТА <span className="text-gradient-gold">ВІДГУКИ</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Реальні цифри, реальні люди та справжні перемоги над собою під керівництвом GD.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-[#e6b800]/50 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Rating & Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#e6b800] text-[#e6b800]" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#e6b800]/10 text-[10px] font-bold text-[#e6b800] uppercase">
                    {rev.tag}
                  </span>
                </div>

                {/* Client Meta */}
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">{rev.clientName}, {rev.age} років</h3>
                  <p className="text-xs text-gray-400">Термін роботи: <strong className="text-white">{rev.duration}</strong></p>
                </div>

                {/* Stats Pills */}
                <div className="grid grid-cols-2 gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                  <div>
                    <div className="text-[10px] text-gray-400">Вага:</div>
                    <div className="text-sm font-extrabold text-[#e6b800]">{rev.stats.weightChange}</div>
                  </div>
                  {rev.stats.waistChange && (
                    <div>
                      <div className="text-[10px] text-gray-400">Талія:</div>
                      <div className="text-sm font-extrabold text-[#ff9900]">{rev.stats.waistChange}</div>
                    </div>
                  )}
                  {rev.stats.muscleGain && (
                    <div>
                      <div className="text-[10px] text-gray-400">М’язи:</div>
                      <div className="text-sm font-extrabold text-[#10b981]">{rev.stats.muscleGain}</div>
                    </div>
                  )}
                </div>

                {/* Testimonial */}
                <p className="text-xs text-gray-300 leading-relaxed italic relative pl-4 border-l-2 border-[#e6b800]">
                  "{rev.testimonial}"
                </p>
              </div>

              <div className="pt-2 text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-[#10b981]" />
                Результат підтверджено тренером GD
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
