import { useState } from "react";
import StatusBadge from "../components/StatusBadge";

export default function DetailPage({ friend, setPage, addTimelineEntry, showToast }) {
  const [goalEdit, setGoalEdit] = useState(false);
  const [goalVal, setGoalVal] = useState(friend?.goal || 14);

  if (!friend) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-sm mb-4">Friend not found!</p>
        <button className="btn btn-primary btn-sm" onClick={() => setPage("home")}>Go Home</button>
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
    <div className="max-w-4xl mx-auto px-4 py-5">

      {/* Back button */}
      <button
        onClick={() => setPage("home")}
        className="btn btn-ghost btn-xs mb-4 gap-1 text-gray-500"
      >
        ← Back to Friends
      </button>

      {/* ── TOP ROW ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">

        {/* Profile card */}
        <div className="card bg-white shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center">
          <div className="avatar mb-2">
            <div className="w-14 rounded-full ring ring-gray-200 ring-offset-1">
              <img
                src={friend.picture}
                alt={friend.name}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=16a34a&color=fff&size=128`;
                }}
              />
            </div>
          </div>

          <h2 className="text-sm font-extrabold text-gray-800 mb-1">{friend.name}</h2>

          <div className="mb-2">
            <StatusBadge status={friend.status} />
          </div>

          <div className="flex flex-wrap gap-1 justify-center mb-2">
            {friend.tags.map((t) => (
              <span key={t} className="badge badge-xs bg-green-100 text-green-700 border-none uppercase font-bold">
                {t}
              </span>
            ))}
          </div>

          <p className="text-xs text-gray-400 italic mb-1">"{friend.bio}"</p>
          <p className="text-xs text-gray-400">
            Preferred:{" "}
            <a href={`mailto:${friend.email}`} className="text-green-600 hover:underline">
              email
            </a>
          </p>
        </div>

        {/* Days Since Contact */}
        <div className="card bg-white shadow-sm border border-gray-100 flex flex-col items-center justify-center p-4 text-center">
          <div className="text-4xl font-extrabold text-gray-800 mb-1">
            {friend.days_since_contact}
          </div>
          <div className="text-xs text-gray-400 font-medium">Days Since Contact</div>
        </div>

        {/* Goal */}
        <div className="card bg-white shadow-sm border border-gray-100 flex flex-col items-center justify-center p-4 text-center">
          <div className="text-4xl font-extrabold text-gray-800 mb-1">
            {friend.goal}
          </div>
          <div className="text-xs text-gray-400 font-medium">Goal (Days)</div>
        </div>

        {/* Next Due */}
        <div className="card bg-white shadow-sm border border-gray-100 flex flex-col items-center justify-center p-4 text-center">
          <div className="text-lg font-extrabold text-teal-700 mb-1">
            {new Date(friend.next_due_date).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric",
            })}
          </div>
          <div className="text-xs text-gray-400 font-medium">Next Due</div>
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        {/* Action buttons */}
        <div className="card bg-white shadow-sm border border-gray-100 p-3 flex flex-col gap-2">
          <button className="btn btn-outline btn-xs w-full gap-1 text-gray-600">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Snooze 2 Weeks
          </button>

          <button className="btn btn-outline btn-xs w-full gap-1 text-gray-600">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            Archive
          </button>

          <button className="btn btn-outline btn-error btn-xs w-full gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>

        {/* Relationship Goal + Quick Check-In */}
        <div className="card bg-white shadow-sm border border-gray-100 p-4 md:col-span-3">

          {/* Relationship Goal */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-700 text-sm">Relationship Goal</h3>
            <button
              onClick={() => setGoalEdit(!goalEdit)}
              className="btn btn-ghost btn-xs border border-gray-200 text-gray-500 px-3"
            >
              Edit
            </button>
          </div>

          {goalEdit ? (
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <input
                type="number"
                value={goalVal}
                onChange={(e) => setGoalVal(e.target.value)}
                className="input input-bordered input-xs w-16"
              />
              <span className="text-xs text-gray-500">days between check-ins</span>
              <button onClick={() => setGoalEdit(false)} className="btn btn-primary btn-xs">
                Save
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-600 mb-3">
              Connect every{" "}
              <span className="font-extrabold text-gray-800">{goalVal} days</span>
            </p>
          )}

          <div className="divider my-2"></div>

          {/* Quick Check-In */}
          <h3 className="font-bold text-gray-700 text-sm mb-3">Quick Check-In</h3>
          <div className="grid grid-cols-3 gap-2">

            {/* Call */}
            <button
              onClick={() => handleCheckin("Call", "📞")}
              className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-xs font-medium text-gray-600">Call</span>
            </button>

            {/* Text */}
            <button
              onClick={() => handleCheckin("Text", "💬")}
              className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="text-xs font-medium text-gray-600">Text</span>
            </button>

            {/* Video */}
            <button
              onClick={() => handleCheckin("Video", "🎥")}
              className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-medium text-gray-600">Video</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}