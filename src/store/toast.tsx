import { ReactChild } from 'react'
import create, { State } from 'zustand'
import { devtools } from 'zustand/middleware'

interface Toast {
  id: string
  message?: ReactChild
  autohide?: number | boolean
  title?: ReactChild
  color?: 'success' | 'danger' | 'warning'
}

interface ToastState extends State {
  toasts: Toast[]
}

interface ToastMethodsState extends State {
  toast: (
    title: Toast['title'],
    message?: Toast['message'],
    color?: Toast['color'],
    autohide?: Toast['autohide']
  ) => void
  remove: (toast: Toast) => void
  toastId: () => string
}

export const useToastStore = create<ToastState & ToastMethodsState>(
  devtools((set, get) => ({
    toasts: [],
    toastId: () => {
      return `toast_${Math.floor(Math.random() * 99999)}`;
    },
    toast(title, message?, color = 'success', autohide = true) {
      const toastId = get().toastId()
      const toast = {
        id: toastId,
        title,
        message,
        color
      }

      set({
        toasts: [
          ...get().toasts,
          toast
        ]
      })

      if (typeof autohide == 'boolean' && autohide === true) {
        const lifeTime = 10000;
        setTimeout(() => {
          get().remove(toast)
        }, lifeTime);
      } else if (typeof autohide == 'number') {
        setTimeout(() => {
          get().remove(toast)
        }, autohide * 1000);
      }

    },
    remove(removedToast) {
      set({
        toasts: get().toasts.filter(toast => removedToast.id !== toast.id)
      })
    }
  }))
)
