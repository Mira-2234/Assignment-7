import { useState } from "react";

const FILTERS = ["All", "Call", "Text", "Video"];
const TYPE_STYLE = {
  Call:  { bg: "bg-blue-100",   text: "text-blue-600",   emoji: "📞" },
  Text:  { bg: "bg-purple-100", text: "text-purple-600", emoji: "💬" },
  Video: { bg: "bg-green-100",  text: "text-green-600",  emoji: "🎥" },
};

export default function TimelinePage({ timeline }) {
  const [filter, setFilter] = useState("All");

  const sorted = [...timeline]
    .filter((e) => filter === "All" || e.type === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Timeline</h1>
      <p className="text-gray-400 text-sm mb-6">History of your meaningful interactions</p>

      {/* Filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn btn-sm rounded-full ${
              filter === f
                ? "btn-primary"
                : "btn-ghost border border-gray-200"
            }`}
          >
            {f !== "All" && TYPE_STYLE[f]?.emoji + " "}{f}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {sorted.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">📭</div>
          <p className="font-semibold text-gray-500">No entries yet</p>
          <p className="text-sm mt-1">Log a check-in from a friend's detail page.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-100"></div>

          <div className="flex flex-col gap-0">
            {sorted.map((entry) => {
              const s = TYPE_STYLE[entry.type] || TYPE_STYLE.Call;
              return (
                <div key={entry.id} className="flex gap-5 pb-6 relative">
                  {/* Icon circle */}
                  <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center text-lg shrink-0 z-10`}>
                    {entry.icon || s.emoji}
                  </div>
                  {/* Card */}
                  <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-3 flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{entry.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{entry.date}</p>
                    </div>
                    <span className={`badge ${s.bg} ${s.text} border-none font-semibold text-xs`}>
                      {entry.type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}