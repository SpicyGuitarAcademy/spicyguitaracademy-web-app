import { DashboardWrapper } from "../../../components"
import { useModalStore, useStudentStatsStore, useSubscriptionStore } from "../../../store"
import { useHistory } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "react-feather";
import { stateToFormData } from "../../../utils";
import './style.scss'
import { useEffect, useState } from "react";

export const Category: React.FC<{}> = () => {

  const { studentStats, chooseCategory, rechooseCategory, getPreviousCategories } = useStudentStatsStore()
  const { studentSubscription } = useSubscriptionStore()
  const { goBack, push } = useHistory()
  const [selectedCategory, setSelectedCategory] = useState<number>()
  const [canChooseAnotherCategory, setCanChooseAnotherCategory] = useState(false)
  const [hasInit, setHasInit] = useState(false)
  const { loading, toast } = useModalStore()

  const actions = [
    {
      id: 1,
      title: 'Beginner'
    },
    {
      id: 2,
      title: 'Amateur'
    },
    {
      id: 3,
      title: 'Intermediate'
    },
    {
      id: 4,
      title: 'Advanced'
    }
  ]

  useEffect(() => {

    if (hasInit === false) {

      setHasInit(true)

      setSelectedCategory(
        studentStats?.viewingPrevious === true ? studentStats?.originalCategory : studentStats?.category
      )

      if (selectedCategory !== undefined && studentSubscription.status === true) {
        setCanChooseAnotherCategory(
          (studentStats.takenCourses! > 0 && studentStats.takenLessons! > 0) &&
          (studentStats.takenCourses! >= studentStats.allCourses! &&
            studentStats.takenLessons! >= studentStats.allLessons!) &&
          (studentStats.viewingPrevious === false)
        )
      }

    }
  }, [canChooseAnotherCategory, hasInit, selectedCategory, studentStats.allCourses, studentStats.allLessons, studentStats?.category, studentStats?.originalCategory, studentStats.takenCourses, studentStats.takenLessons, studentStats.viewingPrevious, studentSubscription.status])

  const handleCategoryClicked = (categoryId: number) => {
    if (studentSubscription.status === false) {
      toast('Please subscribe to a Plan before selecting category', undefined, 'danger')
      return
    }

    if (studentStats.category === 0 && studentSubscription.status === true) {
      setSelectedCategory(categoryId)
    } else if (canChooseAnotherCategory === true) {
      setSelectedCategory(categoryId)
    }

  }

  const handlePreviousCategoryClicked = async () => {
    if (studentStats.category !== 0) {

      loading(true, 'Getting previous categories...')
      getPreviousCategories()
        .then(resp => {
          loading(false)
          if (resp?.status === true) {
            push('/dashboard/profile/category/previous');
          }
        })

    }
  }

  const handleDoneClicked = async () => {

    loading(true)
    if (studentStats.takenCourses === 0 && studentStats.takenLessons === 0) {
      chooseCategory(stateToFormData({
        category: selectedCategory
      })).then(resp => {
        loading(false)
        if (resp.status === true) {
          push('/welcome')
        }
      })
    } else {
      rechooseCategory(stateToFormData({
        category: selectedCategory
      })).then(resp => {
        loading(false)
        if (resp.status === true) {
          push('/dashboard')
          toast(`The Administrators have been notified, you would moved to ${selectedCategory} category soon.`);
        }
      })
    }

  }

  return (
    <DashboardWrapper>
      <div className="__profile_page">

        <div className="__greetings mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            Choose Category
          </h2>
        </div>

        <div className="w-100 my-5 mx-auto">

          <div className="__actions mb-5 d-flex flex-wrap">
            {
              actions.map(action => (
                <div onClick={() => handleCategoryClicked(action?.id)} key={action?.id} className={`__action my-1 my-md-3 col-12 col-md-6 p-2 cursor-pointer text-decoration-none`}>
                  <div className={`w-100 ${selectedCategory === action?.id ? 'bg-primary text-light' : 'bg-white'} shadow-sm border border-light`}>
                    <div className="d-flex flex-column gap-3 align-items-center p-5">
                      <div className="">{action?.title}</div>
                    </div>
                  </div>
                </div >
              ))
            }
          </div>

          <div className="mb-3">
            {
              (
                (studentStats.category === 0 || canChooseAnotherCategory === true) &&
                (studentSubscription.status === true)
              ) &&
              <button onClick={handleDoneClicked} type="submit" className={`btn btn-lg shadow-sm ${selectedCategory !== 0 ? 'btn-primary' : 'bg-white text-primary'} form-control mb-3 d-flex align-items-center justify-content-center gap-2`}>
                <span>Done</span>
                <ArrowRight size={24} />
              </button>
            }

            {
              (studentStats.category !== 0) &&
              <button onClick={handlePreviousCategoryClicked} type="submit" className={`btn btn-lg shadow-sm bg-white text-primary form-control mb-3 d-flex align-items-center justify-content-center gap-2`}>
                <span>Previous Categories</span>
                <ArrowRight size={24} />
              </button>
            }
          </div>

        </div>

      </div>
    </DashboardWrapper>
  )
}