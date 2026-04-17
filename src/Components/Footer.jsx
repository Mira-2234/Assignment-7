export default function Footer() {
  return (
    <footer className="bg-[#244D3F] text-green-100 mt-20 items-center justify-center">
      <div className="w-full max-w-6xl px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="text-4xl font-extrabold text-white mb-3">
              KeenKeeper
            </div>
            <p className="text-sm text-white leading-relaxed max-w-sm">
              Stay genuinely connected with the people who matter most.
              Never let important relationships fade away.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-4">
              {["f", "X", "in"].map((s) => (
                <div
                  key={s}
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black text-xs font-bold cursor-pointer hover:bg-green-600 transition"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-green-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-green-400">
          
          {/* Left */}
          <p className="text-[#FAFAFA]">© 2026 KeenKeeper. All rights reserved.</p>

          {/* Right */}
          <div className="flex gap-4 mt-3 md:mt-0">
            <p className="cursor-pointer hover:text-white">Privacy Policy</p>
            <p className="cursor-pointer hover:text-white">Terms of Service</p>
          </div>

        </div>
      </div>
    </footer>
  );
}