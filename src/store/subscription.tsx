import create, { State } from "zustand";
import { devtools } from "zustand/middleware";

interface SubscriptionState extends State {
  subscriptionPlans: string[],
  subscriptionStatus: boolean
}

interface SubscriptionMethods extends State {
  getStudentSubscriptionStatus: () => Promise<any>
  getSubscriptionPlans: () => Promise<any>
  initiateSubscriptionPayment: () => Promise<any>
  initiateFeaturedPayment: () => Promise<any>
  verifiedSubscriptionPayment: () => Promise<any>
  verifiedFeaturedPayment: () => Promise<any>
  completeSubscriptionPaymentWithSpicyUnits: () => Promise<any>
  completeFeaturedPaymentWithSpicyUnits: () => Promise<any>
}

export const useSubscriptionStore = create<SubscriptionState & SubscriptionMethods>(
  devtools((set, get) => ({
    subscriptionPlans: [],
    subscriptionStatus: false,
    getStudentSubscriptionStatus: async () => { },
    getSubscriptionPlans: async () => { },
    initiateSubscriptionPayment: async () => { },
    initiateFeaturedPayment: async () => { },
    verifiedSubscriptionPayment: async () => { },
    verifiedFeaturedPayment: async () => { },
    completeSubscriptionPaymentWithSpicyUnits: async () => { },
    completeFeaturedPaymentWithSpicyUnits: async () => { },
  }))
)