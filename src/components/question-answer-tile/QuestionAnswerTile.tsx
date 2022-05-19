import { Shield } from "react-feather"
import { useAuthStore } from "../../store"
import { Answer, Question } from "../../store/assignment"
import { baseUrl } from "../../utils"
import './style.scss'

export const QuestionAnswerTile: React.FC<{
  item: Partial<Question & Answer>
  isQuestion: boolean
}> = ({ item, isQuestion }) => {

  const { student } = useAuthStore()
  const isAdmin = isQuestion === true || (isQuestion === false && item?.tutor! !== null)

  return (
    <div className={`__chat w-100 w-md-80 border rounded border-cream p-2 p-md-3 ${isAdmin === true ? 'align-self-end' : 'align-self-baseline'} `}>

      <div className={`w-100`}>
        {
          <div className="d-flex flex-column gap-2 gap-md-3 align-items-start bg-light w-100">

            <div className="__commenter_name fw-bold text-primary">
              {
                (isAdmin === true)
                  ?
                  <div>
                    <Shield size={20} className="me-1" />
                    <span>Admin</span>
                  </div>
                  :
                  student?.firstname! + ' ' + student?.lastname!
              }
            </div>

            <div className="__comment w-100 overflow-auto img">
              {
                item?.type === 'text' &&
                <p>{item?.content}</p>
              }
              {
                item?.type === 'image' &&
                <img src={`${baseUrl}/${item?.content}`} className="w-100 __image rounded" alt='Assignment' />
              }
              {
                item?.type === 'audio' &&
                <audio controls controlsList="nodownload" className="w-100 __audio" src={`${baseUrl}/${item?.content}`} />
              }
              {
                item?.type === 'video' &&
                <video controls controlsList="nodownload" className="w-100 __video bg-black rounded" src={`${baseUrl}/${item?.content}`} />
              }
            </div>
          </div>
        }

      </div>

    </div>
  )
}