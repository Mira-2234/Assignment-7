export const STATUS_CONFIG = {
  "overdue":    { bg: "bg-red-500",    label: "Overdue" },
  "almost due": { bg: "bg-green-400",  label: "Almost Due" },
  "on-track":   { bg: "bg-green-500",  label: "On Track" },
};

export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["on-track"];

  return (
    <span className={`${cfg.bg} text-white text-xs font-bold px-4 py-1 rounded-full`}>
      {cfg.label}
    </span>
  );
}