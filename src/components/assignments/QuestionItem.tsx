import { Star } from "react-feather"
import { useHistory } from "react-router-dom"
import { useCourseStore, useModalStore } from "../../store"
import { Assignment, useAssignmentStore } from "../../store/assignment"
import './style.scss'

type QuestionItemProps = {
  item: Assignment
}

export const QuestionItem: React.FC<QuestionItemProps> = ({ item }) => {

  const { push } = useHistory()
  const { selectedCourse } = useCourseStore()
  const { getAssignmentAnswers } = useAssignmentStore()
  const { loading } = useModalStore()

  const handleQuestionClicked = async () => {

    loading(true, 'Getting answers...')
    getAssignmentAnswers(selectedCourse?.id!, item?.assignment_number)
      .then(_ => {
        loading(false)
        push('/dashboard/courses/assignment/question', {
          item: item
        })
      })

  }

  return (
    <div onClick={handleQuestionClicked} className="__assignment_item col-12 col-md-6 col-lg-4 mb-3 cursor-pointer p-1">
      <div className="__thumbnail bg-white rounded shadow-sm p-3">
        <h5 className="">Question {item?.assignment_number}</h5>
        <div>Answer Rating</div>
        <div className="__description text-primary">
          <Star className={item?.rating > 0 ? '__fill' : ''} />
          <Star className={item?.rating > 1 ? '__fill' : ''} />
          <Star className={item?.rating > 2 ? '__fill' : ''} />
          <Star className={item?.rating > 3 ? '__fill' : ''} />
          <Star className={item?.rating > 4 ? '__fill' : ''} />
        </div>
      </div>
    </div>
  )
}