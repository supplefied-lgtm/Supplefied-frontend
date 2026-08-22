'use client';

import { useSelector, useDispatch } from 'react-redux';
import { closeQuiz, setQuizStep, setQuizAnswer } from '@/store/slices/mascotSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { addToast } from '@/store/slices/toastSlice';
import { PRODUCTS } from '@/data/products';
import { X, Zap, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StackQuizModal() {
  const dispatch = useDispatch();
  const { isQuizOpen, quizStep, quizAnswers } = useSelector((state) => state.mascot);

  if (!isQuizOpen) return null;

  const handleGoalSelect = (goal) => {
    dispatch(setQuizAnswer({ key: 'fitnessGoal', value: goal }));
    dispatch(setQuizStep(2));
  };

  const handleFrequencySelect = (freq) => {
    dispatch(setQuizAnswer({ key: 'trainingDays', value: freq }));
    dispatch(setQuizStep(3));
  };

  const handleDietSelect = (diet) => {
    dispatch(setQuizAnswer({ key: 'dietPreference', value: diet }));
    dispatch(setQuizStep(4));
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const recommendedProducts = PRODUCTS.slice(0, 3);
  const bundleOriginal = recommendedProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscounted = (bundleOriginal * 0.8).toFixed(2); // 20% bundle discount

  const handleAddAllToCart = () => {
    recommendedProducts.forEach((product) => {
      dispatch(addToCart({ product, quantity: 1 }));
    });
    dispatch(addToast({ message: "⚡ Custom Stack added to cart with 20% discount applied!" }));
    dispatch(closeQuiz());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-[2vw] bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-[clamp(450px,50vw,750px)] rounded-[clamp(1vw,1.8vw,2.5vw)] glass-panel bg-white border border-slate-200 shadow-2xl p-[2vw] overflow-hidden">
        {/* Glow background accent */}
        <div className="absolute top-0 right-0 w-[20vw] h-[20vw] bg-lime-300/20 rounded-full blur-3xl pointer-events-none -mr-[5vw] -mt-[5vw]" />
        
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeQuiz())}
          className="absolute top-[2dvh] right-[1.5vw] p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mascot Header with Real Avatar */}
        <div className="flex items-center gap-[1vw] mb-[2.5dvh]">
          <div className="w-[clamp(3rem,3.8vw,4.5rem)] h-[clamp(3rem,3.8vw,4.5rem)] rounded-[clamp(0.8vw,1.2vw,1.6vw)] overflow-hidden border border-lime-500 glow-lime-sm shrink-0 bg-slate-100">
            <img src="/images/mascot/bolt_avatar.png" alt="Bolt Mascot" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-[0.5vw]">
              <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] uppercase font-bold tracking-widest text-[#4d7c0f]">Bolt's Protocol Builder</span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] text-slate-500 font-medium">Step {quizStep} of 4</span>
            </div>
            <h2 className="text-[clamp(1.1rem,1.5vw,1.8rem)] font-bold text-slate-900 font-display">Personalized Supplement Stack</h2>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-100 h-[0.5dvh] rounded-full mb-[3dvh] overflow-hidden">
          <div
            className="bg-[#84cc16] h-full transition-all duration-500 rounded-full glow-lime-sm"
            style={{ width: `${(quizStep / 4) * 100}%` }}
          />
        </div>

        {/* STEP 1: Goal */}
        {quizStep === 1 && (
          <div className="space-y-[2dvh] animate-in fade-in slide-in-from-right-4">
            <h3 className="text-[clamp(0.9rem,1.1vw,1.25rem)] font-semibold text-slate-900">What is your primary training target?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1vw]">
              {[
                { id: 'muscle', label: 'Maximum Muscle Hypertrophy & Power', icon: '🏋️‍♂️' },
                { id: 'energy', label: 'Explosive High-Energy & Pre-Workout Surge', icon: '⚡' },
                { id: 'fat-loss', label: 'Metabolic Shred & Thermogenic Cut', icon: '🔥' },
                { id: 'endurance', label: 'Cardio, VO2 Max & Rapid Hydration', icon: '🏃‍♂️' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleGoalSelect(item.id)}
                  className={`p-[1.2vw] rounded-[clamp(0.8vw,1.2vw,1.5vw)] border text-left flex items-center gap-[0.8vw] transition-all cursor-pointer ${
                    quizAnswers.fitnessGoal === item.id
                      ? 'border-lime-500 bg-lime-50 text-slate-950 glow-lime-sm'
                      : 'border-slate-200 bg-slate-50 hover:border-lime-400 hover:bg-lime-50/50'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[clamp(0.75rem,0.85vw,0.95rem)] font-semibold text-slate-900">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Training Frequency */}
        {quizStep === 2 && (
          <div className="space-y-[2dvh] animate-in fade-in slide-in-from-right-4">
            <h3 className="text-[clamp(0.9rem,1.1vw,1.25rem)] font-semibold text-slate-900">How many days per week do you train hard?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1vw]">
              {[
                { id: '2-3', label: '2 - 3 Days / week', sub: 'Foundational Athlete' },
                { id: '4-5', label: '4 - 5 Days / week', sub: 'High Volume Performance' },
                { id: '6+', label: '6+ Days / week', sub: 'Elite Hybrid Protocol' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleFrequencySelect(item.id)}
                  className="p-[1.2vw] rounded-[clamp(0.8vw,1.2vw,1.5vw)] border border-slate-200 bg-slate-50 hover:border-lime-500 hover:bg-lime-50/60 text-left transition-all group cursor-pointer shadow-sm"
                >
                  <span className="text-[clamp(0.85rem,1vw,1.1rem)] font-bold text-slate-900 block mb-1 group-hover:text-[#4d7c0f]">{item.label}</span>
                  <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] text-slate-500 font-medium">{item.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Dietary Preference */}
        {quizStep === 3 && (
          <div className="space-y-[2dvh] animate-in fade-in slide-in-from-right-4">
            <h3 className="text-[clamp(0.9rem,1.1vw,1.25rem)] font-semibold text-slate-900">Any dietary restrictions or preferences?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1vw]">
              {[
                { id: 'omnivore', label: 'No Restrictions', sub: 'Pure Whey & Bio-actives' },
                { id: 'dairy-sensitive', label: 'Lactose / Sensitive Gut', sub: 'Cold-Filtered Native Isolates' },
                { id: 'keto-vegan', label: 'Low-Carb / Plant-Based', sub: 'Zero Sugar & Keto Friendly' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleDietSelect(item.id)}
                  className="p-[1.2vw] rounded-[clamp(0.8vw,1.2vw,1.5vw)] border border-slate-200 bg-slate-50 hover:border-lime-500 hover:bg-lime-50/60 text-left transition-all group cursor-pointer shadow-sm"
                >
                  <span className="text-[clamp(0.85rem,1vw,1.1rem)] font-bold text-slate-900 block mb-1 group-hover:text-[#4d7c0f]">{item.label}</span>
                  <span className="text-[clamp(0.65rem,0.7vw,0.8rem)] text-slate-500 font-medium">{item.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Results & Custom Stack Output */}
        {quizStep === 4 && (
          <div className="space-y-[2dvh] animate-in fade-in zoom-in-95">
            <div className="p-[1.2vw] rounded-[clamp(0.8vw,1.2vw,1.5vw)] bg-lime-50 border border-lime-300 flex items-start gap-[0.8vw]">
              <Sparkles className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-[clamp(0.8rem,0.9vw,1rem)] font-bold text-slate-900">Custom Protocol Ready: Optimized for {quizAnswers.fitnessGoal.toUpperCase()}</p>
                <p className="text-[clamp(0.7rem,0.75vw,0.85rem)] text-slate-600 mt-1">
                  Engineered to cover Pre-Workout focus, Intra-workout hydration, and Post-workout peptide recovery.
                </p>
              </div>
            </div>

            {/* Stack Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[0.8vw]">
              {recommendedProducts.map((prod) => (
                <div key={prod.id} className="p-[0.8vw] rounded-[clamp(0.6vw,1vw,1.2vw)] bg-slate-50 border border-slate-200 flex flex-col justify-between shadow-sm">
                  <div className="flex items-center gap-[0.6vw] mb-2">
                    <img src={prod.images[0]} alt={prod.name} className="w-[clamp(2.5rem,3vw,3.5rem)] h-[clamp(2.5rem,3vw,3.5rem)] object-contain rounded-lg border border-slate-200 bg-white" />
                    <div>
                      <h4 className="text-[clamp(0.7rem,0.75vw,0.85rem)] font-bold text-slate-900 line-clamp-1">{prod.name}</h4>
                      <span className="text-[clamp(0.7rem,0.75vw,0.85rem)] text-[#4d7c0f] font-bold">${prod.price}</span>
                    </div>
                  </div>
                  <span className="text-[0.65rem] text-slate-500 uppercase font-semibold line-clamp-1">{prod.tagline}</span>
                </div>
              ))}
            </div>

            {/* Pricing & Add to Cart */}
            <div className="p-[1.2vw] rounded-[clamp(0.8vw,1.2vw,1.5vw)] bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-[1vw]">
              <div>
                <div className="flex items-baseline gap-[0.6vw]">
                  <span className="text-xs text-slate-400 line-through">${bundleOriginal.toFixed(2)}</span>
                  <span className="text-[clamp(1.2rem,1.8vw,2.2rem)] font-black text-slate-950 font-display">${bundleDiscounted}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ea580c] text-white font-bold text-[0.65rem]">SAVE 20%</span>
                </div>
                <p className="text-[clamp(0.65rem,0.7vw,0.75rem)] text-slate-500 font-medium">Includes Free Express Shipping + Supplefied Shaker</p>
              </div>

              <button
                onClick={handleAddAllToCart}
                className="w-full sm:w-auto px-[1.8vw] py-[1.2dvh] rounded-xl bg-[#84cc16] hover:bg-[#65a30d] text-slate-950 hover:text-white font-extrabold text-[clamp(0.8rem,0.85vw,0.95rem)] flex items-center justify-center gap-2 glow-lime transition-all cursor-pointer shadow-md"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Add Full Stack to Cart</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
