import { DashboardWrapper } from "../../../components"
import { useAssignmentStore, useCourseStore, useModalStore, useStudentStatsStore } from "../../../store";
import PartyPopper from '../../../assets/partypopper.gif'
import CongratsAudio from '../../../assets/congrats-audio.mp3'
import './style.scss'
import { useHistory, useLocation } from "react-router-dom";
import { stateToFormData } from "../../../utils";

export const CompletedCourse: React.FC<{}> = () => {

  const { toast, loading } = useModalStore()
  const { replace } = useHistory()
  const { selectedCourse, completeCateory } = useCourseStore()
  const { studentStats } = useStudentStatsStore()
  const { assignments } = useAssignmentStore()
  const { state } = useLocation<{
    isBought: boolean,
    completedCategory: boolean
  }>()

  const handleSubmit = async () => {
    if (state.completedCategory === true) {
      loading(true)

      completeCateory(stateToFormData({
        course: selectedCourse?.id
      })).then((resp: any) => {
        loading(false)
        toast(resp?.message, undefined, resp?.status === true ? 'success' : 'danger')

        if (resp?.status === true) {
          replace('/dashboard')
        } else {
          if (assignments?.length! > 0)
            replace('/dashboard/courses/assignment')
          else replace(state.isBought === true ? '/dashboard/courses/bought' : '/dashboard/courses')
        }
      })

    } else {
      if (assignments?.length! > 0)
        replace('/dashboard/courses/assignment')
      else replace(state.isBought === true ? '/dashboard/courses/bought' : '/dashboard/courses')
    }
  }

  return (
    <DashboardWrapper confetti={state.completedCategory}>
      <div className={`__completed_page`}>

        <div className="__greetings mb-4 d-flex justify-content-center align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            Congratulations
          </h2>
        </div>

        <div className="text-center h5 fw-normal">
          {
            state.completedCategory === true ?
              <p>You have completed all courses in <span className="text-uppercase">{studentStats?.categoryLabel}</span> category</p>
              :
              <p>You have completed all lessons in <span className="text-uppercase">{selectedCourse?.course}</span></p>
          }

          <img src={PartyPopper} alt="Party Popper" className="mb-5 w-80 w-md-50" />
          <audio src={CongratsAudio} loop={true} autoPlay={true} controls id="congrats-audio" className="d-none" />

          <button onClick={handleSubmit} className="btn btn-lg btn-primary form-control mb-3 d-flex align-items-center justify-content-center">
            Continue
          </button>
        </div>

      </div>
    </DashboardWrapper>
  )
}