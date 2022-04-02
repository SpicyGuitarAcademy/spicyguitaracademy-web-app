import create, { State } from "zustand";
import { devtools } from "zustand/middleware";
import { request } from "../utils";

type AuthType = {
  authenticated: boolean
  token: string
  status: "inactive" | "active"
}

type StudentType = {
  avatar: string
  date_added: string
  email: string
  firstname: string
  id: number
  lastname: string
  referral_code: string
  referral_units: number
  referred_by: string
  telephone: string
}

interface AuthState extends State {
  auth: AuthType | Partial<AuthType>
  student?: StudentType | Partial<StudentType>
}

interface AuthMethods extends State {
  boot: () => void
  signUp: (
    credentials: FormData
  ) => Promise<any>
  signIn: (
    credentials: FormData
  ) => Promise<any>
  persistSignInData: (
    resp: any
  ) => void
  signOut: () => void
  clearPersistedSignInData: () => void
  forgotPassword: (
    credentials: FormData
  ) => Promise<any>
  verifyAccount: (
    credentials: FormData
  ) => Promise<any>
  resetPassword: (
    credentials: FormData
  ) => Promise<any>
}

export const useAuthStore = create<AuthState & AuthMethods>(
  devtools((set, get) => ({
    auth: {
      authenticated: false
    },
    student: undefined,
    boot: () => {
      console.log('booting...')

      const savedAuth = JSON.parse(localStorage.getItem('auth') ?? '{}')
      const savedStudent = JSON.parse(localStorage.getItem('student') ?? '{}')

      set({
        auth: { ...get().auth, ...savedAuth! },
        student: { ...get().student, ...savedStudent! }
      })

      console.log('auth', get().auth)
      console.log('student', get().student)
    },
    signUp: async (credentials) => {
      return await request('/api/register_student', 'POST', credentials)
    },
    signIn: async (credentials) => {
      const resp = await request('/api/login', 'POST', credentials)
      get().persistSignInData(resp)

      return resp
    },
    persistSignInData: (resp: any) => {

      if (resp?.status) {
        // set to store
        set({
          auth: { ...get().auth, token: resp?.data?.token, status: resp?.data?.status, authenticated: true },
          student: resp?.data?.student
        })

        // save to localstorage
        localStorage.setItem('auth', JSON.stringify(get().auth))
        localStorage.setItem('student', JSON.stringify(get().student))
      }

    },
    signOut: () => {
      get().clearPersistedSignInData()
    },
    clearPersistedSignInData: () => {
      set({
        auth: { authenticated: false },
        student: undefined
      })

      // remove from localstorage
      localStorage.removeItem('auth')
      localStorage.removeItem('student')

      console.log('auth', get().auth)
      console.log('student', get().student)
    },
    forgotPassword: async (credentials) => {
      return await request('/api/forgotpassword', 'POST', credentials)
    },
    verifyAccount: async (credentials) => {
      return await request('/api/verify', 'POST', credentials)
    },
    resetPassword: async (credentials) => {
      return await request('/api/resetpassword', 'POST', credentials)
    },
    verifyDevice: () => { },
    resetDevice: () => { },
  }))
)