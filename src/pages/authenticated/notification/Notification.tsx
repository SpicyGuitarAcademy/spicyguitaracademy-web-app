import { DashboardWrapper, NotificationTile } from "../../../components"
import { useNotificationStore } from "../../../store"
import './style.scss'
import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";

type NotificationProps = {
}

export const Notification: React.FC<NotificationProps> = () => {

  const { notifications } = useNotificationStore()
  const { goBack } = useHistory()

  return (
    <DashboardWrapper>
      <div className="__studying_course_page">

        <div className="__greetings mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            Notifications
          </h2>
        </div>

        <div className="__comments mb-5 text-dark w-100 d-flex flex-column gap-3">
          {
            notifications?.length > 0 ?
              notifications?.map((notice, index) => (
                <NotificationTile key={index} notice={notice} />
              ))
              : <div>No notifications yet</div>
          }
        </div>

      </div>
    </DashboardWrapper>
  )
}