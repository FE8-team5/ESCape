import React, { createContext, useContext, useState } from "react";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

const ICONS = {
  success: HiCheck,
  fail: HiExclamation,
  warn: HiX,
};

function ToastComponent({ type, message, onClick }) {
  const Icon = ICONS[type] || HiExclamation; 


  return (
    <Toast className="flex items-center">
      <div
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200"
        onClick={onClick}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <ToastToggle onClick={onClick} />
    </Toast>
  );
}

const ToasterContext = createContext();

function ToasterProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function addToast(type, message) {
    const newToast = {
      id: Date.now(),
      type,
      message,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);
    return newToast;
  }

  function removeToast(id) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  function toaster(type, message) {
    const newToast = addToast(type, message);
    setTimeout(() => removeToast(newToast.id), 2000);
  }

  return (
    <ToasterContext.Provider value={{ toaster }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-4">
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClick={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToasterContext.Provider>
  );
}

export function useToaster() {
  const { toaster } = useContext(ToasterContext);
  if (!toaster) {
    throw new Error("ToastContext 안에서만 사용할 수 있습니다.");
  }
  return toaster;
}

export default ToasterProvider;
