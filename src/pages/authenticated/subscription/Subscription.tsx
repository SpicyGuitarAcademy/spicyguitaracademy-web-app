import { DashboardWrapper } from "../../../components"
import { SubscriptionPlan, useSubscriptionStore, useModalStore } from "../../../store"
import { useHistory } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "react-feather";
import { subscriptionIcons } from "../../../utils";
import './style.scss'
import { useEffect, useState } from "react";

export const Subscription: React.FC<{}> = () => {

  const { studentSubscription, subscriptionPlans } = useSubscriptionStore()
  const { goBack, push } = useHistory()
  const [selectedPlan, setSelectedPlan] = useState<number>()
  const { toast } = useModalStore()

  useEffect(() => {
    setSelectedPlan(
      studentSubscription.plan
    )
  }, [studentSubscription.plan])

  const handlePlanClicked = (planId: number) => {
    if (studentSubscription.status === false) {
      setSelectedPlan(planId)
    }
  }

  const handleContinueToFree = async () => {
    push('/dashboard');
  }

  const handleDoneClicked = async () => {

    if (selectedPlan === undefined) {
      toast('Please select a Plan', undefined, 'danger')
      return
    }

    push('/dashboard/payment/methods', {
      paymentFor: 'subscription',
      plan: selectedPlan
    })

  }

  return (
    <DashboardWrapper>
      <div className="__profile_page">

        <div className="__greetings mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            Choose Subscription
          </h2>
        </div>

        <div className="w-100 my-5 mx-auto">

          <div className="__plans mb-5 d-flex flex-wrap">
            {
              subscriptionPlans.map((plan: SubscriptionPlan) => (

                <div onClick={() => handlePlanClicked(plan?.plan_id)} key={plan?.plan_id} className={`__plan my-1 my-md-3 col-12 col-md-6 p-2 cursor-pointer text-decoration-none`}>
                  <div className={`w-100 ${selectedPlan === plan?.plan_id ? 'bg-primary text-light' : 'bg-white'} shadow-sm border border-light`}>
                    <div className="d-flex flex-column gap-3 align-items-center p-5">
                      <div className="">₦ {plan?.price!}</div>
                      <div>
                        <img src={subscriptionIcons[(plan?.plan_id - 1)]} alt="Plan Icon" />
                      </div>
                      <div className="">{plan?.plan!}</div>
                    </div>
                  </div>
                </div >

              ))
            }
          </div>

          <div className="mb-3">

            {
              studentSubscription?.status === false &&
              <p className="text-grey text-center">Tap Continue to watch free lessons or to buy Special Courses.</p>
            }

            {
              studentSubscription?.status === false &&
              <button onClick={handleContinueToFree} type="submit" className={`btn btn-lg shadow-sm bg-white text-primary form-control mb-4`}>
                <span>Continue to FREE</span>
              </button>
            }

            {
              studentSubscription.status === false &&
              <button onClick={handleDoneClicked} type="submit" className={`btn btn-lg shadow-sm ${selectedPlan !== undefined ? 'btn-primary' : 'bg-white text-primary'} form-control mb-3 d-flex align-items-center justify-content-center gap-2`}>
                <span>Payment Methods</span>
                <ArrowRight size={24} />
              </button>
            }
          </div>

        </div>

      </div>
    </DashboardWrapper>
  )
}