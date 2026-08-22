import { createSlice } from '@reduxjs/toolkit';

const DAILY_TIPS = [
  "⚡ High-Voltage Tip: Drinking 500ml water with electrolytes within 15 minutes of waking jumpstarts metabolic thermogenesis by 12%!",
  "⚡ Absorption Multiplier: Pair Creapure creatine with simple carbs post-workout to trigger insulin-mediated muscle cell saturation.",
  "⚡ Sleep Architecture: Take Magnesium Bisglycinate 45 mins before lights out to amplify slow-wave Stage 4 GH surge.",
  "⚡ Nitric Oxide Boost: Never consume acidic juices with your L-Citrulline—keep it in neutral cold water for optimal bioavailability!"
];

const initialState = {
  isMascotOpen: false,
  activeTipIndex: 0,
  isQuizOpen: false,
  quizStep: 1,
  quizAnswers: {
    fitnessGoal: 'muscle',
    trainingDays: '4-5',
    dietPreference: 'omnivore',
    stimTolerance: 'high'
  },
  recommendedStack: null
};

const mascotSlice = createSlice({
  name: 'mascot',
  initialState,
  reducers: {
    toggleMascot: (state) => {
      state.isMascotOpen = !state.isMascotOpen;
    },
    setMascotOpen: (state, action) => {
      state.isMascotOpen = action.payload;
    },
    nextTip: (state) => {
      state.activeTipIndex = (state.activeTipIndex + 1) % DAILY_TIPS.length;
    },
    openQuiz: (state) => {
      state.isQuizOpen = true;
      state.quizStep = 1;
    },
    closeQuiz: (state) => {
      state.isQuizOpen = false;
    },
    setQuizStep: (state, action) => {
      state.quizStep = action.payload;
    },
    setQuizAnswer: (state, action) => {
      const { key, value } = action.payload;
      state.quizAnswers[key] = value;
    },
    setRecommendedStack: (state, action) => {
      state.recommendedStack = action.payload;
    }
  }
});

export const {
  toggleMascot,
  setMascotOpen,
  nextTip,
  openQuiz,
  closeQuiz,
  setQuizStep,
  setQuizAnswer,
  setRecommendedStack
} = mascotSlice.actions;

export const selectDailyTips = () => DAILY_TIPS;
export default mascotSlice.reducer;
