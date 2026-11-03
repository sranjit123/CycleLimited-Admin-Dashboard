import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <Topbar />
      <main className="ml-64 pt-16">
        <Outlet />
      </main>
    </div>
  );
}
export default AdminLayout;

// import { Children } from "react";
// import Sidebar from "../components/Sidebar/Sidebar";
// import Topbar from "../components/Topbar/Topbar";
// function AdminLayout({children}){
//     return(
//         <div className="min-h-screen bg-slate-50">
//             <Sidebar/>
//             <Topbar/>
//             <main className="ml-64 pt-16">
//                 {children}
//             </main>
//         </div>
//     );
// }
// export default AdminLayout;
