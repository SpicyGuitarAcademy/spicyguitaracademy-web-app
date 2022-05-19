import { Shield } from "react-feather"
import { Comment, useAuthStore } from "../../store"
import { baseUrl } from "../../utils"
import './style.scss'

export const CommentTile: React.FC<{ comment: Comment }> = ({ comment }) => {

  const { student } = useAuthStore()

  return (
    <div className="w-100 border rounded border-cream p-2 p-md-3 mb-2">
      <div className="d-flex gap-2 gap-md-3 align-items-center w-100">

        <div className="__commenter_avatar">
          <img src={
            comment?.sender === student?.email ?
              `${baseUrl}/${student?.avatar}` :
              `${baseUrl}/${comment?.tutor?.avatar!}`
          } alt="Student Avatar" className='__avatar' />
        </div>

        <div className="d-flex flex-column w-100">
          <div className="d-flex justify-content-between align-items-center">

            <div className="__commenter_name fw-bold text-primary">
              {
                comment?.sender === student?.email
                  ? student?.firstname! + ' ' + student?.lastname!
                  :
                  <div>
                    <Shield size={20} className="me-1" />
                    <span>Admin</span>
                  </div>
              }
            </div>

            <div className="__date_commented">{comment?.date_added}</div>

          </div>

          <div className="__comment">
            {comment?.comment}
          </div>

        </div>

      </div>
    </div>
  )
}