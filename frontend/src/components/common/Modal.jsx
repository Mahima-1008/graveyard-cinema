import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import clsx from 'clsx';
import IconButton from './IconButton';

export default function Modal({ isOpen, onClose, title, children, className }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={clsx(
            "relative w-full max-w-lg bg-surface border border-surface rounded-xl shadow-glow overflow-hidden z-10 flex flex-col max-h-[90vh]",
            className
          )}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between p-4 border-b border-background">
            <h2 className="font-display text-xl text-text-bright">{title}</h2>
            <IconButton icon={X} variant="ghost" size="sm" onClick={onClose} aria-label="Close modal" />
          </div>
          <div className="p-4 sm:p-6 overflow-y-auto">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
