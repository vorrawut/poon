import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { gsap } from 'gsap';
import { useUIStore } from '../../store/useUIStore';

interface ToastItemProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  timestamp: number;
}

export function ToastItem({ id, type, title, message }: ToastItemProps) {
  const toastRef = useRef<HTMLDivElement>(null);
  const removeToast = useUIStore(state => state.removeToast);

  useEffect(() => {
    if (!toastRef.current) return;

    // Animate in
    gsap.fromTo(toastRef.current, 
      { x: 400, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
    );

    return () => {
      // Animate out when unmounting
      if (toastRef.current) {
        gsap.to(toastRef.current, {
          x: 400,
          opacity: 0,
          duration: 0.2,
        });
      }
    };
  }, []);

  const handleRemove = () => {
    if (!toastRef.current) return;
    
    gsap.to(toastRef.current, {
      x: 400,
      opacity: 0,
      duration: 0.2,
      onComplete: () => removeToast(id),
    });
  };

  const typeStyles = {
    success: 'border-green-200 bg-green-50 text-green-800',
    error: 'border-red-200 bg-red-50 text-red-800',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    info: 'border-blue-200 bg-blue-50 text-blue-800',
  };

  const iconStyles = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div
      ref={toastRef}
      className={clsx(
        'mb-2 flex w-full max-w-sm rounded-lg border p-4 shadow-lg',
        typeStyles[type]
      )}
    >
      <div className="mr-3 text-lg">
        {iconStyles[type]}
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
      </div>
      <button
        onClick={handleRemove}
        className="ml-3 text-lg opacity-60 hover:opacity-100"
        aria-label="Close toast"
      >
        ×
      </button>
    </div>
  );
}

export function Toast() {
  const toasts = useUIStore(state => state.toasts);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse">
      {toasts.map(toast => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
}
