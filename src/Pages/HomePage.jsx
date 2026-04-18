import FriendCard from "../components/FriendCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage({ friends, loading, setPage, setCurrentFriend }) {
  const overdue   = friends.filter(f => f.status === "overdue").length;
  const almostDue = friends.filter(f => f.status === "almost due").length;
  const onTrack   = friends.filter(f => f.status === "on-track").length;

  return (
    <div>
      {/* Banner */}
      <div className=" text-white py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          
          <h1 className="text-black text-2xl md:text-5xl font-extrabold leading-tight mb-4">
            Friends to keep close in your life
          </h1>
          <p className="text-black text-xl font-medium md:text-lg mb-8 leading-relaxed">
            KeenKeeper helps you track and nurture the relationships that matter most.
            Never let the people you care about drift away.
          </p>
          <button className="btn text-white bg-[#244D3F] border-none font-bold px-7 py-3 rounded-sm">
            + Add a Friend
          </button>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { label: "Total Friends", value: friends.length,  color: "text-[#244D3F]" },
              { label: "On Track",      value: onTrack,          color: "text-[#244D3F]" },
              { label: "Almost Due",    value: almostDue,        color: "text-[#244D3F]" },
              { label: "Overdue",       value: overdue,          color: "text-[#244D3F]" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/10 border border-white/20 shadow-xl rounded-2xl p-5 text-center">
                <div className={`text-2xl font-extrabold ${color}`}>
                  {loading ? "—" : value}
                </div>
                <div className="text-sm text-[#244D3F] mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Friends grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Your Friends</h2>
        <p className="text-gray-400 text-sm mb-6">{friends.length} connections tracked</p>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {friends.map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                onClick={(f) => {
                  setCurrentFriend(f);
                  setPage("detail");
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}