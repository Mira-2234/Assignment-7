export const STATUS_CONFIG = {
  "overdue":    { badge: "badge-error",   dot: "bg-red-500",    label: "Overdue" },
  "almost due": { badge: "badge-warning", dot: "bg-yellow-400", label: "Almost Due" },
  "on-track":   { badge: "badge-success", dot: "bg-green-500",  label: "On Track" },
};

export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["on-track"];
  return (
    <span className={`badge ${cfg.badge} badge-sm gap-1 text-white font-semibold`}>
      <span className={`w-2 h-2 rounded-full ${cfg.dot}`}></span>
      {cfg.label}
    </span>
  );
}