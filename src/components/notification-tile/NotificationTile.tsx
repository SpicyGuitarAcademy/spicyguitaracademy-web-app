import { Notification, useNotificationStore, useModalStore } from "../../store"
import { stateToFormData } from "../../utils"
import './style.scss'

export const NotificationTile: React.FC<{ notice: Notification }> = ({ notice }) => {

  const { markNotificationAsRead } = useNotificationStore()
  const { toast } = useModalStore()

  const handleMarkAsRead = () => {
    markNotificationAsRead(stateToFormData({
      notificationId: notice?.id
    }))
      .then(resp => {
        if (resp?.status === true) {
          toast(resp?.message)
        }
      })
  }

  return (
    <div className="w-100 border rounded border-cream p-3 mb-lg-2">
      <div className="d-flex gap-lg-3 align-items-center w-100">

        <div className="d-flex flex-column w-100 gap-lg-2">

          <div className="__commenter_name fw-bold text-primary">
            {notice?.created_at}
          </div>

          <div className="__comment">
            {notice?.message}
          </div>

          {
            notice?.status === 'unread' &&
            <button onClick={handleMarkAsRead} className="btn btn-sm btn-primary align-self-end">Mark as read</button>
          }

        </div>

      </div>
    </div>
  )
}