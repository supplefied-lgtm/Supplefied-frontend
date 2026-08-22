'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '@/store/slices/toastSlice';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const toasts = useSelector((state) => state.toast.toasts);
  const dispatch = useDispatch();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dispatch(removeToast(toast.id))} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, toast.duration || 3500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const isSuccess = toast.type === 'success';
  const isWarning = toast.type === 'warning';

  return (
    <div
      className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl glass-panel shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 border ${
        isSuccess
          ? 'border-lime-500/50 bg-white/95 text-slate-900 glow-lime-sm'
          : isWarning
          ? 'border-orange-500/50 bg-white/95 text-slate-900 glow-orange'
          : 'border-slate-200 bg-white/95 text-slate-900'
      }`}
    >
      <div className="flex items-center gap-3">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-[#65a30d] shrink-0" />
        ) : isWarning ? (
          <AlertTriangle className="w-5 h-5 text-[#ea580c] shrink-0" />
        ) : (
          <Info className="w-5 h-5 text-[#0284c7] shrink-0" />
        )}
        <p className="text-sm font-semibold text-slate-900">{toast.message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
