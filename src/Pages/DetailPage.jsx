import { useState } from "react";
import StatusBadge from "../components/StatusBadge";

export default function DetailPage({ friend, setPage, addTimelineEntry, showToast }) {
  const [goalEdit, setGoalEdit] = useState(false);
  const [goalVal, setGoalVal] = useState(friend?.goal || 14);

  if (!friend) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg mb-4">Friend not found!</p>
        <button className="btn btn-primary" onClick={() => setPage("home")}>Go Home</button>
      </div>
    );
  }

  const handleCheckin = (type, emoji) => {
    addTimelineEntry({
      id: Date.now(), type,
      friendId: friend.id,
      friendName: friend.name,
      title: `${type} with ${friend.name}`,
      date: new Date().toISOString().split("T")[0],
      icon: emoji,
    });
    showToast({ icon: emoji, message: `${type} logged with ${friend.name}!` });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">

      {/* Back */}
      <button
        onClick={() => setPage("home")}
        className="btn btn-ghost btn-sm mb-6 gap-2 text-gray-500"
      >
        ← Back to Friends
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ── LEFT ── */}
        <div className="card bg-white shadow-md p-6">
          {/* Photo */}
          <div className="flex flex-col items-center mb-5">
            <div className="avatar mb-3">
              <div className="w-24 rounded-full ring ring-green-200 ring-offset-2">
                <img
                  src={friend.picture}
                  alt={friend.name}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=16a34a&color=fff&size=128`;
                  }}
                />
              </div>
            </div>
            <h2 className="text-xl font-extrabold text-gray-800">{friend.name}</h2>
            <div className="mt-2"><StatusBadge status={friend.status} /></div>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {friend.tags.map((t) => (
                <span key={t} className="badge badge-outline badge-sm text-green-700 border-green-300 capitalize">{t}</span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Bio</p>
            <p className="text-sm text-gray-500 leading-relaxed">{friend.bio}</p>
          </div>

          {/* Email */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</p>
            <a href={`mailto:${friend.email}`} className="text-sm text-green-600 hover:underline">
              {friend.email}
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <button className="btn btn-outline btn-sm w-full">⏰ Snooze 2 Weeks</button>
            <button className="btn btn-outline btn-sm w-full">📦 Archive</button>
            <button className="btn btn-outline btn-error btn-sm w-full">🗑️ Delete</button>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="md:col-span-2 flex flex-col gap-5">

          {/* ① Stats */}
          <div className="card bg-white shadow-md p-6">
            <h3 className="font-bold text-gray-700 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Days Since Contact", value: friend.days_since_contact, color: "text-blue-600",   bg: "bg-blue-50" },
                { label: "Goal (days)",         value: friend.goal,              color: "text-green-600",  bg: "bg-green-50" },
                { label: "Next Due Date",        value: friend.next_due_date,    color: "text-yellow-600", bg: "bg-yellow-50", small: true },
              ].map((s) => (
                <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
                  <div className={`${s.small ? "text-sm" : "text-3xl"} font-extrabold ${s.color}`}>
                    {s.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ② Relationship Goal */}
          <div className="card bg-white shadow-md p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-700">Relationship Goal</h3>
              <button
                onClick={() => setGoalEdit(!goalEdit)}
                className="btn btn-ghost btn-xs text-gray-400"
              >
                ✏️ Edit
              </button>
            </div>
            {goalEdit ? (
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="number"
                  value={goalVal}
                  onChange={(e) => setGoalVal(e.target.value)}
                  className="input input-bordered input-sm w-20"
                />
                <span className="text-sm text-gray-500">days between check-ins</span>
                <button onClick={() => setGoalEdit(false)} className="btn btn-primary btn-sm">
                  Save
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500 leading-relaxed">
                Connect with <b className="text-gray-800">{friend.name}</b> every{" "}
                <b className="text-green-600">{goalVal} days</b>. Currently{" "}
                <b className={friend.days_since_contact > goalVal ? "text-red-500" : "text-green-600"}>
                  {friend.days_since_contact > goalVal
                    ? `${friend.days_since_contact - goalVal} days overdue`
                    : "on track"}
                </b>.
              </p>
            )}
          </div>

          {/* ③ Quick Check-In */}
          <div className="card bg-white shadow-md p-6">
            <h3 className="font-bold text-gray-700 mb-1">Quick Check-In</h3>
            <p className="text-sm text-gray-400 mb-4">
              Log a recent interaction — it will appear in your Timeline.
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                { type: "Call",  emoji: "📞", color: "btn-primary" },
                { type: "Text",  emoji: "💬", color: "btn-secondary" },
                { type: "Video", emoji: "🎥", color: "btn-accent" },
              ].map(({ type, emoji, color }) => (
                <button
                  key={type}
                  onClick={() => handleCheckin(type, emoji)}
                  className={`btn ${color} btn-outline flex-1 gap-2`}
                >
                  {emoji} {type}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}