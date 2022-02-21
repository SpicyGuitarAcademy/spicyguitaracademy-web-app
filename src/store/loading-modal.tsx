import create, { State } from "zustand";
import { devtools } from "zustand/middleware";

interface LoadingModal {
  message: string
}

interface LoadingModalState extends State {
  modal?: LoadingModal
}

interface LoadingModalMethods extends State {
  loading: (
    message: LoadingModal['message']
  ) => void
  unload: () => void
}

export const useLoadingModalStore = create<LoadingModalState & LoadingModalMethods>(
  devtools((set, get) => ({
    modal: undefined,
    loading: (message) => {

      set({
        modal: {
          message: message ?? 'Loading...'
        }
      })

      document.getElementById('loading-modal-toggle-btn')?.click()

    },
    unload: () => {
      set({
        modal: undefined
      })

      document.getElementById('loading-modal-toggle-btn')?.click()
    }
  }))
)