
export default function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="alert bg-gray-800 text-white shadow-lg rounded-xl px-5 py-3 flex items-center gap-3 animate-bounce-once"
          style={{ animation: "slideUp 0.3s ease" }}
        >
          <span className="text-xl">{t.icon}</span>
          <span className="text-sm font-medium">{t.message}</span>
        </div>
      ))}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}