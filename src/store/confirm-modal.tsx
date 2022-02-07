import create, { State } from "zustand";
import { devtools } from "zustand/middleware";

interface ConfirmModal {
  message: string
  onConfirm?: () => Promise<any>
  onCancel?: () => Promise<any>
  confirmText?: string
  cancelText?: string
}

interface ConfirmModalState extends State {
  modal?: ConfirmModal
}

interface ConfirmModalMethods extends State {
  confirm: (
    message: ConfirmModal['message'],
    onConfirm?: ConfirmModal['onConfirm'],
    onCancel?: ConfirmModal['onCancel'],
    confirmText?: ConfirmModal['confirmText'],
    cancelText?: ConfirmModal['cancelText']
  ) => void
}

export const useConfirmModalStore = create<ConfirmModalState & ConfirmModalMethods>(
  devtools((set, get) => ({
    modal: undefined,
    confirm: (message, onConfirm, onCancel?, confirmText?, cancelText?) => {

      set({
        modal: {
          message,
          onConfirm: onConfirm!,
          onCancel: onCancel!,
          confirmText: confirmText!,
          cancelText: cancelText!
        }
      })

      document.getElementById('app-confirm-modal-toggle-btn')?.click()

    }
  }))
)