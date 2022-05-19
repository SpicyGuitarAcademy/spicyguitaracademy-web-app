import { DashboardWrapper } from "../../../components"
import { useCourseStore, useStudentStatsStore, useModalStore } from "../../../store"
import { useHistory } from "react-router-dom";
import { ArrowLeft, Info } from "react-feather";
import './style.scss'

export const PreviousCategories: React.FC<{}> = () => {

  const { previousCategories, studentStats, getStudentStatsForPreviousCategory } = useStudentStatsStore()
  const { getStudyingCoursesFromPreviousCategory } = useCourseStore()
  const { goBack, push } = useHistory()
  const { loading, toast } = useModalStore()

  const handleCategoryClicked = async (categoryId: number) => {

    if (studentStats?.viewingPrevious === true && studentStats?.category === categoryId) {
      toast(`You're currently viewing ${studentStats?.categoryLabel} category`, undefined, 'danger')
      return
    }

    loading(true, 'Switching to previous category...')
    getStudentStatsForPreviousCategory(categoryId, false)
      .then(async resp => {
        if (resp?.status === true) {
          getStudyingCoursesFromPreviousCategory(categoryId)
            .then(resp => {
              const label = useStudentStatsStore.getState()?.studentStats?.categoryLabel
              toast(<><Info size={16} className='me-2' /> Currently viewing {label} category</>, undefined, 'warning', false)
              loading(false)

              push('/dashboard')
            })
        }
      })

  }

  const handleReturnToOriginalCategory = async () => {

    loading(true, 'Switching to previous category...')
    getStudentStatsForPreviousCategory(studentStats?.originalCategory!, true)
      .then(async resp => {
        if (resp?.status === true) {
          getStudyingCoursesFromPreviousCategory(studentStats?.originalCategory!)
            .then(resp => {
              const label = useStudentStatsStore.getState()?.studentStats?.categoryLabel
              toast(`Currently viewing ${label} category`)
              loading(false)

              push('/dashboard')
            })
        }
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
            Previous Categories
          </h2>
        </div>

        <div className="__categories mb-5 d-flex flex-column gap-3">
          {
            previousCategories?.length > 0 ?
            previousCategories.map(category => (
              <button onClick={() => handleCategoryClicked(category?.id)} key={category?.id} className={`__category btn cursor-pointer bg-white text-primary shadow-sm border border-light rounded p-3`}>
                {category?.label}
              </button >
            ))
            : <div>No Previous Category</div>
          }
        </div>

        <div className="mb-3">
          {
            (studentStats?.viewingPrevious === true) &&
            <button onClick={handleReturnToOriginalCategory} type="submit" className={`btn btn-lg shadow-sm bg-white text-primary form-control mb-3`}>
              Return to {studentStats?.originalCategoryLabel} Category
            </button>
          }
        </div>

      </div>
    </DashboardWrapper>
  )
}