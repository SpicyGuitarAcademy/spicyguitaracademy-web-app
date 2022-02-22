import create, { State } from "zustand";
import { devtools } from "zustand/middleware";

interface LoadingModalState extends State {
  loading: boolean
  message: string
}

interface LoadingModalMethods extends State {
  setLoading: (
    loading: LoadingModalState['loading'],
    message?: LoadingModalState['message']
  ) => void
}

export const useLoadingModalStore = create<LoadingModalState & LoadingModalMethods>(
  devtools((set, get) => ({
    message: '',
    loading: false,
    setLoading: (loading, message) => {
      set({
        loading: loading,
        message: message ?? 'Loading...'
      })
    }
  }))
)