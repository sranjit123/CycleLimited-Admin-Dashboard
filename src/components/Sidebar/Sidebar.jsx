import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Settings,
} from "lucide-react";
import CycleLimFinal from "../../assets/cycleslimfinal.svg";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-white">
      <div className="flex h-16 w-full items-center border-b border-slate-200 px-8 ">
        <img src={CycleLimFinal} alt="Logo" />
      </div>
      <nav className="p-4">
        {/* <NavLink to="/" className={({isActive})=>`mb-1.25 ${isActive?"bg-black text-orange-0300" : "hover:bg-indigo-600 text-green-500"}`} end>Home</NavLink> */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-100 ${
              isActive ? "bg-slate-100" : ""
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-100 ${
              isActive ? "bg-slate-100" : ""
            }`
          }
        >
          <Package size={20} />
          Products
        </NavLink>
        {/* <Link
          to="/products"
          className="mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-100"
        >
          <Package size={20} />
          Products
        </Link> */}
         <NavLink
          to="orders"
          className={({ isActive }) =>
            `mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-100 ${
              isActive ? "bg-slate-100" : ""
            }`
          }
        >
          <ShoppingCart size={20} />
          Orders
        </NavLink>
      <NavLink
          to="users"
          className={({ isActive }) =>
            `mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-100 ${
              isActive ? "bg-slate-100" : ""
            }`
          }
        >
          <Users size={20} />
          Users
        </NavLink> 
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-100 ${
              isActive ? "bg-slate-100" : ""
            }`
          }
        >
          <Tags size={20} />
          Categories
        </NavLink>
         <NavLink
          to="/profile"
          className={({ isActive }) =>
            `mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-100 ${
              isActive ? "bg-slate-100" : ""
            }`
          }
        >
          <Settings size={20} />
          Settings
        </NavLink>
     
      </nav>
    </aside>
  );
}
export default Sidebar;
