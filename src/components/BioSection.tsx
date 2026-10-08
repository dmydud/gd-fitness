import React from 'react';
import { Flame, Dumbbell, Activity, HeartPulse } from 'lucide-react';

export const BioSection: React.FC = () => {
  const pillars = [
    {
      title: 'Силовий Тренінг',
      desc: 'Побудова м\'язового корсета, збільшення силових показників та рельєф.',
      num: '01'
    },
    {
      title: 'Спалювання Жиру',
      desc: 'Ефективне позбавлення зайвих кілограмів без шкоди для здоров\'я.',
      num: '02'
    },
    {
      title: 'Раціон',
      desc: 'Складання гнучкого плану харчування під ваші потреби.',
      num: '03'
    },
    {
      title: 'Здоров\'я & Постава',
      desc: 'Покращення мобільності, усунення болю у спині та корекція постави.',
      num: '04'
    }
  ];

  return (
    <section id="bio" className="py-20 bg-[#e6e2dd] text-black border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-black">
          
          {/* Header Column */}
          <div className="lg:col-span-5 pb-12 lg:pb-0 lg:border-r border-black lg:pr-12 flex flex-col justify-between">
            <div>
              <div className="inline-block bg-[#e6b800] text-black px-2 py-0.5 mb-8 text-[10px] font-black uppercase tracking-[0.3em]">
                Розділ 1 — Про мене
              </div>
              <h2 className="text-5xl sm:text-7xl font-black font-magazine leading-[0.9] tracking-tighter uppercase">
                Змінюй<br/>
                Тіло.<br/>
                <span className="italic text-[#e6b800]">Тримай</span><br/>
                Фокус.
              </h2>
            </div>
            
            <div className="mt-12">
              <p className="text-xl sm:text-2xl font-magazine leading-snug">
                Спорт — це мій стиль життя. З 2023 року я активно займаюся тренерською діяльністю, надихаючи людей.
              </p>
              <div className="mt-8 space-y-2 text-xs uppercase tracking-widest font-bold">
                <div className="flex justify-between border-b border-black pb-2">
                  <span>Досвід</span>
                  <span>Професійний Волейбол</span>
                </div>
                <div className="flex justify-between border-b border-black pb-2">
                  <span>Експертиза</span>
                  <span>Біомеханіка Рухів</span>
                </div>
                <div className="flex justify-between border-b border-black pb-2">
                  <span>Локація</span>
                  <span>Інтер Атлетика</span>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Column */}
          <div className="lg:col-span-7 pl-0 lg:pl-12 pt-12 lg:pt-8 flex items-center justify-center lg:justify-end pb-12 lg:pb-8 relative">
            
            {/* Stylized Vintage Print Wrapper */}
            <div className="relative rotate-[2deg] hover:rotate-0 transition-transform duration-700 w-[90%] sm:w-[80%] lg:w-[90%] max-w-lg bg-[#f9f8f6] p-3 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-black/5">
              
              {/* Scotch Tape */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-[#e6e2dd]/60 backdrop-blur-md -rotate-[4deg] shadow-sm z-10 border border-white/20"></div>
              
              {/* Photo */}
              <div className="relative w-full aspect-[4/5] bg-black overflow-hidden shadow-inner">
                <img 
                  src={`${import.meta.env.BASE_URL}trainer-vintage.png`} 
                  alt="Денис Гусєв" 
                  className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000 contrast-[1.1] saturate-[0.9]"
                />
              </div>
              
              {/* Polaroid Caption */}
              <div className="mt-4 flex justify-between items-end">
                <span className="text-black/50 text-[10px] font-sans font-bold uppercase tracking-[0.2em]">Raw Scan</span>
                <span className="bg-black text-[#e6b800] text-[9px] font-black px-2 py-1 uppercase tracking-[0.2em]">
                  Vol. 01 / Gusev
                </span>
              </div>
              
            </div>
          </div>
        </div>

        {/* Pillars Typography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-black">
          {pillars.map((item, idx) => (
            <div key={idx} className="p-8 border-b md:border-b-0 md:border-r border-black last:border-r-0 relative group hover:bg-black hover:text-[#e6e2dd] transition-colors duration-500">
              <div className="text-xs font-black opacity-30 mb-12">{item.num}</div>
              <h3 className="text-xl font-black font-magazine uppercase leading-none mb-4 group-hover:text-[#e6b800] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs font-medium uppercase tracking-wider leading-relaxed opacity-80">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight Quote */}
        <div className="py-24 text-center max-w-4xl mx-auto">
          <div className="w-8 h-8 bg-[#e6b800] mx-auto mb-8"></div>
          <h4 className="text-3xl sm:text-5xl font-magazine font-black leading-tight uppercase">
            "Дисципліна перемагає мотивацію. Результат — це сума щоденних <span className="italic text-[#e6b800]">малих</span> дій."
          </h4>
        </div>

      </div>
    </section>
  );
};
