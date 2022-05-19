import { DashboardWrapper } from "../../../components"
import { useSubscriptionStore, useModalStore, useStudentStatsStore } from "../../../store"
import { useHistory, useLocation } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import './style.scss'
import { usePaystackPayment } from 'react-paystack';
import { PaystackProps } from "react-paystack/dist/types";

export const CompletePaymentWithPaystack: React.FC<{}> = () => {

  const { verifiedFeaturedPayment, verifiedSubscriptionPayment } = useSubscriptionStore()
  const { goBack, push } = useHistory()
  const { loading, toast } = useModalStore()
  const { studentStats } = useStudentStatsStore()

  const { state } = useLocation<{
    paymentFor: 'subscription' | 'featured-course'
    method: 'paystack' | 'paypal',
    plan?: number,
    course?: number,
    paystackConfig?: PaystackProps
    paypalPaymentID?: string | number
  }>()
  const { paymentFor, method, paystackConfig } = state

  const completePayment = usePaystackPayment(paystackConfig!)

  const verifyPaymentPaystack = () => {
    loading(true, 'Verifying payment...')
    if (paymentFor === 'featured-course') {
      verifiedFeaturedPayment(method, paystackConfig?.reference!)
        .then(resp => {
          loading(false)
          if (resp.status === true) {
            toast(resp.message)
            push('/dashboard/courses/bought')
          } else {
            toast(resp.message, undefined, 'danger')
          }
        })
        .catch(error => {
          loading(false)
          toast(error.message, undefined, 'danger')
        })
    } else {
      verifiedSubscriptionPayment(method, paystackConfig?.reference!)
        .then(resp => {
          loading(false)
          if (resp.status === true) {
            toast(resp.message)
            if (studentStats.category === 0)
              push('/dashboard/profile/category')
            else push('/dashboard/courses')
          } else {
            toast(resp.message, undefined, 'danger')
          }
        })
        .catch(error => {
          loading(false)
          toast(error.message, undefined, 'danger')
        })
    }
  }

  const cancelPaymentPaystack = () => {
    toast('Cancelled Payment', undefined, 'danger')
    goBack()
  }

  return (
    <DashboardWrapper>
      <div className="__profile_page">

        <div className="__greetings mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            Complete Payment
          </h2>
        </div>

        <div className="__methods mb-5 d-flex flex-column gap-3">

          Amount: ₦{(paystackConfig?.amount! / 100)} <br />
          Payment For: {paymentFor.replace('-', ' ').toUpperCase()} <br />
          Payment Method: {method.toUpperCase()}

          <div className="mb-3" />

          <button onClick={() => completePayment(verifyPaymentPaystack, cancelPaymentPaystack)} className='__method btn cursor-pointer btn-primary shadow-sm rounded p-3'>
            COMPLETE PAYMENT
          </button >

        </div>

      </div>
    </DashboardWrapper>
  )
}
