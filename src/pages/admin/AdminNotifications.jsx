import { useApp } from "../../context/AppContext";

export default function AdminNotifications() {
const { getAdminNotifications, markNotificationRead, deleteNotification } = useApp();
  const notifications = getAdminNotifications();

  return (
    <div className="p-6">
      <h1 className="text-4xl text-white mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <div className="text-gray-500">No notifications</div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 border ${
                n.read ? "border-[#222]" : "border-red-500"
              } bg-[#111]`}
            >
              <div className="text-white">{n.message}</div>

              <div className="text-xs text-gray-500 mt-2">
                {new Date(n.createdAt).toLocaleString()}
              </div>

              <div className="flex gap-2 mt-3">
                {!n.read && (
                  <button
                    onClick={() => markNotificationRead(n.id)}
                    className="px-3 py-1 bg-[#C6F135] text-black text-xs rounded"
                  >
                    Mark Read
                  </button>
                )}

                <button
                  onClick={() => deleteNotification(n.id)}
                  className="px-3 py-1 bg-red-500 text-white text-xs rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
