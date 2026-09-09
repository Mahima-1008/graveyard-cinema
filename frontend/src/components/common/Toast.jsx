import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import clsx from 'clsx';
import IconButton from './IconButton';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'info', duration = 5000 }) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useMemo(() => ({
    success: (msg, dur) => addToast({ message: msg, type: 'success', duration: dur }),
    error: (msg, dur) => addToast({ message: msg, type: 'error', duration: dur }),
    info: (msg, dur) => addToast({ message: msg, type: 'info', duration: dur }),
  }), [addToast]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {createPortal(
        <div className="fixed bottom-0 right-0 p-6 z-[100] flex flex-col gap-3 pointer-events-none">
          <AnimatePresence>
            {toasts.map((t) => (
              <ToastItem key={t.id} toast={t} onDismiss={() => removeToast(t.id)} />
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

function ToastItem({ toast, onDismiss }) {
  const icons = {
    success: <CheckCircle className="text-success w-5 h-5" />,
    error: <AlertTriangle className="text-error w-5 h-5" />,
    info: <Info className="text-crimson-bright w-5 h-5" />
  };

  const borderColors = {
    success: 'border-success/50',
    error: 'border-error/50',
    info: 'border-crimson/50'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      layout
      className={clsx(
        "bg-surface border-l-4 rounded-r shadow-lg p-4 flex items-start gap-3 w-80 pointer-events-auto",
        borderColors[toast.type]
      )}
    >
      <div className="mt-0.5 shrink-0">{icons[toast.type]}</div>
      <div className="flex-1 font-body text-sm text-text-bright mt-0.5">{toast.message}</div>
      <IconButton icon={X} variant="ghost" size="sm" onClick={onDismiss} className="text-text-muted -mr-2 -mt-2" />
    </motion.div>
  );
}

export default ToastProvider;
