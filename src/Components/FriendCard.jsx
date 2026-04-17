import StatusBadge, { STATUS_CONFIG } from "./StatusBadge";

export default function FriendCard({ friend, onClick }) {
  const cfg = STATUS_CONFIG[friend.status] || STATUS_CONFIG["on-track"];

  const borderColor = {
    "overdue":    "border-t-red-400",
    "almost due": "border-t-yellow-400",
    "on-track":   "border-t-green-500",
  };

  return (
    <div
      onClick={() => onClick(friend)}
      className={`card bg-white shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer border-t-4 ${borderColor[friend.status]}`}
    >
      <div className="card-body p-5">
        {/* Avatar + name */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full ring ring-gray-100">
              <img
                src={friend.picture}
                alt={friend.name}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=16a34a&color=fff&size=128`;
                }}
              />
            </div>
          </div>
          <div>
            <div className="font-bold text-gray-800 text-sm">{friend.name}</div>
            <StatusBadge status={friend.status} />
          </div>
        </div>

        {/* Days since contact */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>
            <span className="font-bold text-gray-700">{friend.days_since_contact}</span> days since contact
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {friend.tags.map((tag) => (
            <span key={tag} className="badge badge-ghost badge-sm capitalize">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}