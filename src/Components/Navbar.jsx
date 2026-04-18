export default function Navbar({ page, setPage }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "timeline", label: "Timeline" },
    { id: "stats", label: "Stats" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => setPage("home")} className="text-xl font-bold">
          <span className="text-gray-900 font-black">Keen</span>
          <span className="text-[#244D3F]">Keeper</span>
        </button>

        {/* Links */}
        <div className="flex gap-2">
          {links.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                page === id
                  ? "bg-[#244D3F] text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

      </div>
    </nav>
  );
}