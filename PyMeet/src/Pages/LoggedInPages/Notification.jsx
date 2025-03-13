import { useContext } from "react";
import { NotificationContext } from "../../Context/NotificationContext";

const Notification = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notif, index) => (
            <li key={index}>{notif.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
