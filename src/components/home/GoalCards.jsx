'use client';

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setSelectedGoal } from '@/store/slices/filterSlice';
import { Flame, Zap, Timer, Brain, ArrowRight } from 'lucide-react';

const GOALS_DATA = [
  {
    id: 'muscle',
    title: 'Lean Muscle Hypertrophy',
    desc: 'Accelerate muscle protein synthesis with pure cold-filtered isolates & Creapure®.',
    icon: Flame,
    color: '#84cc16',
    bgColor: '#f7fee7',
    textColor: '#365314',
    tag: 'Strength & Mass',
  },
  {
    id: 'energy',
    title: 'Explosive High-Energy',
    desc: 'Laser nootropic focus, vasodilation pumps, and high-potency pre-workouts.',
    icon: Zap,
    color: '#fe6500',
    bgColor: '#fff7ed',
    textColor: '#9a3412',
    tag: 'Pre-Workout Drive',
  },
  {
    id: 'endurance',
    title: 'Cellular Hydration & VO2',
    desc: 'Exact osmotic balance with real pink Himalayan electrolytes and marine minerals.',
    icon: Timer,
    color: '#0284c7',
    bgColor: '#f0f9ff',
    textColor: '#075985',
    tag: 'Cardio & Recovery',
  },
  {
    id: 'recovery',
    title: 'Deep REM Recovery & Sleep',
    desc: 'Restorative sleep with Chelated Magnesium Bisglycinate and KSM-66® Ashwagandha.',
    icon: Brain,
    color: '#9333ea',
    bgColor: '#faf5ff',
    textColor: '#6b21a8',
    tag: 'Cortisol Clearance',
  }
];

export default function GoalCards() {
  const dispatch = useDispatch();

  return (
    <section className="py-[7dvh] bg-transparent relative">
      <div className="fluid-container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-[5dvh]">
          <div>
            <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] uppercase font-mono font-bold tracking-widest text-[#65a30d] block mb-1">
              Targeted Categories
            </span>
            <h2 className="text-[clamp(1.6rem,2.8vw,3.6rem)] font-black text-slate-950 font-display">
              CHOOSE YOUR TRAINING GOAL
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-[clamp(0.75rem,0.8vw,0.85rem)] font-semibold text-slate-600 hover:text-[#65a30d] flex items-center gap-1.5 transition-colors"
          >
            <span>View all products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Goal Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2vw]">
          {GOALS_DATA.map((goal) => {
            const Icon = goal.icon;
            return (
              <Link
                key={goal.id}
                href="/shop"
                onClick={() => dispatch(setSelectedGoal(goal.id))}
                className="group p-[1.8vw] rounded-[clamp(1vw,1.5vw,2.2vw)] glass-panel bg-white border border-slate-200 hover:border-lime-500 transition-all duration-300 flex flex-col justify-between space-y-[2dvh] hover:shadow-xl hover:-translate-y-1 shadow-sm"
              >
                <div className="space-y-[1.5dvh]">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-[clamp(2.5rem,3.2vw,3.8rem)] h-[clamp(2.5rem,3.2vw,3.8rem)] rounded-2xl flex items-center justify-center font-bold transition-transform group-hover:scale-110 shadow-sm"
                      style={{ backgroundColor: goal.bgColor, color: goal.textColor }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[clamp(0.6rem,0.65vw,0.75rem)] font-mono font-bold uppercase tracking-wider text-slate-500">
                      {goal.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-[clamp(1rem,1.2vw,1.4rem)] font-bold text-slate-900 group-hover:text-[#4d7c0f] transition-colors font-display">
                      {goal.title}
                    </h3>
                    <p className="text-[clamp(0.7rem,0.78vw,0.85rem)] text-slate-600 mt-2 leading-relaxed">
                      {goal.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-[1.5dvh] border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-slate-950">
                  <span>Explore Formulas</span>
                  <ArrowRight className="w-4 h-4 text-[#65a30d] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
