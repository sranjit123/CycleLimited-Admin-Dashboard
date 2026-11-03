import { Bell, User, LogOut } from "lucide-react";
import { replace, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Topbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  function handleLogOut() {
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  }
  return (
    <header className="fixed left-64 right-0 top-0 z-10 h-16 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-end px-6">
        <div className="flex items-center gap-5">
          <button className="text-slate-500 hover:text-slate-900 cursor-pointer">
            <Bell size={20} />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-1.5 transition hover:bg-slate-100"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200">
                <span className="text-sm font-medium text-slate-700">
                  {currentUser?.name
                    ? currentUser.name.toUpperCase().slice(0, 1)
                    : "A"}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-900">
                  {currentUser?.name || "Admin"}
                </p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-34 rounded-xl border border-slate-100 bg-white py-2 shadow-lg ring-1 ring-black/5">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/profile");
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <User size={18} className="text-slate-500" />
                  Profile
                </button>
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-red-600"
                >
                  <LogOut size={18} className="text-slate-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
export default Topbar;
