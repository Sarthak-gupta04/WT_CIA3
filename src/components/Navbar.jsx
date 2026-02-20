import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      {/* Top banner */}
      <div className="bg-[#000080] text-center py-1" style={{ borderBottom: "3px ridge #8080a0" }}>
        <div className="overflow-hidden">
          <p className="retro-marquee text-[#00ff00] text-xs font-bold whitespace-nowrap" style={{ fontFamily: "'Courier New', monospace" }}>
            ★ ★ ★ Welcome to the Student Management System! ★ ★ ★ Best viewed in Internet Explorer 6.0 at 800x600 resolution ★ ★ ★ Last Updated: February 2026 ★ ★ ★
          </p>
        </div>
      </div>

      {/* Main nav bar */}
      <nav className="retro-panel" style={{ borderBottom: "3px ridge #808080" }}>
        <div className="max-w-6xl mx-auto px-3 py-2">
          <div className="flex items-center justify-between">
            {/* Logo area */}
            <Link to="/" className="flex items-center gap-2 no-underline">
              <span className="text-3xl">🎓</span>
              <div>
                <h1 className="text-lg font-bold text-[#000080] m-0 leading-tight" style={{ fontFamily: "'Comic Sans MS', cursive", textShadow: "1px 1px 0 #c0c0c0" }}>
                  Student Database
                </h1>
                <p className="text-[10px] text-[#808080] m-0" style={{ fontFamily: "Verdana, sans-serif" }}>
                  ~ Since 2003 ~
                </p>
              </div>
            </Link>

            {/* Nav buttons */}
            <div className="flex gap-1">
              <Link
                to="/"
                className={`retro-btn ${isActive("/") ? "retro-btn-primary" : ""} text-xs no-underline`}
              >
                🏠 Home
              </Link>
              <Link
                to="/add"
                className={`retro-btn ${isActive("/add") ? "retro-btn-primary" : ""} text-xs no-underline`}
              >
                📝 Add Student
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Horizontal rule with old-style separator */}
      <div className="text-center text-[#ffcc00] text-xs py-0.5 bg-[#336699]">
        ═══════════════════════════════════════════════
      </div>
    </div>
  );
}
