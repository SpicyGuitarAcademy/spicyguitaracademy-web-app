import create, { State } from "zustand";
import { devtools } from "zustand/middleware";
import { request } from "../utils";

interface AuthState extends State {
  auth: any
}

interface AuthMethods extends State {
  boot: () => void
  signUp: (
    credentials: FormData
  ) => Promise<any>
  signIn: (
    credentials: FormData
  ) => Promise<any>
}
// const { loading, unload } = useLoadingModalStore()

export const useAuthStore = create<AuthState & AuthMethods>(
  devtools((set, get) => ({
    auth: {},
    boot: () => { },
    signUp: async (credentials) => {
      return await request('/api/register_student', 'POST', credentials)
    },
    signIn: async (credentials) => {
      return await request('/api/login', 'POST', credentials)
    },
    persistSignInData: () => { },
    clearPersistedSignInData: () => { },
    signOut: () => { },
    forgotPassword: () => { },
    resetPassword: () => { },
    resetDevice: () => { },
    verifyAccount: () => { },
    verifyDevice: () => { },
  }))
)