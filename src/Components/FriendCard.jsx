import StatusBadge from "./StatusBadge";

export default function FriendCard({ friend, onClick }) {
  return (
    <div
      onClick={() => onClick(friend)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
    >
      {/* Circular Avatar */}
      <img
        src={friend.picture}
        alt={friend.name}
        className="w-24 h-24 rounded-full object-cover mb-4"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=16a34a&color=fff&size=128`;
        }}
      />

      {/* Name */}
      <h3 className="font-bold text-gray-900 text-lg mb-1">
        {friend.name}
      </h3>

      {/* Days ago */}
      <p className="text-sm text-gray-400 mb-4">
        {friend.days_since_contact}d ago
      </p>

      {/* Tags */}
      <div className="flex gap-1 items-center mb-3">
        {friend.tags.map((tag) => (
          <span
            key={tag}
            className="bg-[#CBFADB] text-[#244D3F] font-normal px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Status */}
      <StatusBadge status={friend.status} />
    </div>
  );
}