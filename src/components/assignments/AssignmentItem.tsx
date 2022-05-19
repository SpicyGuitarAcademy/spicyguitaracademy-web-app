import { Star } from "react-feather"
import { useHistory } from "react-router-dom"
import { useAssignmentStore } from "../../store"
import './style.scss'

type AssignmentItemProps = {}

export const AssignmentItem: React.FC<AssignmentItemProps> = () => {

  const { push } = useHistory()
  const { assignments, totalRating } = useAssignmentStore()

  const handleAssignmentClicked = async () => {
    push('/dashboard/courses/assignment')
  }

  return (
    <div onClick={handleAssignmentClicked} className="__assignment_item col-12 col-md-6 col-lg-4 mb-3 cursor-pointer">
      <div className="__thumbnail bg-white rounded shadow-sm p-3">
        <h5 className="">Course Assignment</h5>
        <h6 className="text-dark">
          {assignments?.length} Assignment {assignments?.length! > 1 ? 'Questions' : 'Question'}
        </h6>
        <div>Answer Ratings</div>
        <div className="__description text-primary">
          <Star className={totalRating > 0 ? '__fill' : ''} />
          <Star className={totalRating > 1 ? '__fill' : ''} />
          <Star className={totalRating > 2 ? '__fill' : ''} />
          <Star className={totalRating > 3 ? '__fill' : ''} />
          <Star className={totalRating > 4 ? '__fill' : ''} />
        </div>
      </div>
    </div>
  )
}