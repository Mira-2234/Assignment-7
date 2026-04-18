export const STATUS_CONFIG = {
  "overdue":    { bg: "bg-[#EF4444]",    label: "Overdue" },
  "almost due": { bg: "bg-[#EFAD44]",  label: "Almost Due" },
  "on-track":   { bg: "bg-[#244D3F]",  label: "On Track" },
};

export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];

  if (!cfg) return null;

  return (
    <span className={`${cfg.bg} text-white text-xs font-bold px-4 py-1 rounded-full`}>
      {cfg.label}
    </span>
  );
}