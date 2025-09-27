import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { gsap } from 'gsap';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    
    if (!overlay || !content) return;

    if (open) {
      // Show dialog
      gsap.set(overlay, { display: 'flex', opacity: 0 });
      gsap.set(content, { scale: 0.9, opacity: 0 });
      
      const tl = gsap.timeline();
      tl.to(overlay, { opacity: 1, duration: 0.2 })
        .to(content, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }, 0.1);
    } else {
      // Hide dialog
      const tl = gsap.timeline();
      tl.to(content, { scale: 0.9, opacity: 0, duration: 0.2 })
        .to(overlay, { opacity: 0, duration: 0.2 }, 0.1)
        .set(overlay, { display: 'none' });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onOpenChange(false);
        }
      }}
    >
      <div
        ref={contentRef}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return (
    <div className={clsx('mb-4', className)}>
      {children}
    </div>
  );
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
  return (
    <h2 className={clsx('text-lg font-semibold text-gray-900', className)}>
      {children}
    </h2>
  );
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogDescription({ children, className }: DialogDescriptionProps) {
  return (
    <p className={clsx('text-sm text-gray-500', className)}>
      {children}
    </p>
  );
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
  return (
    <div className={clsx('mb-6', className)}>
      {children}
    </div>
  );
}

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={clsx('flex justify-end space-x-2', className)}>
      {children}
    </div>
  );
}
