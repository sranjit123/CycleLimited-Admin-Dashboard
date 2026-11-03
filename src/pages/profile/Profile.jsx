import { User, Mail, Calendar } from "lucide-react";
function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  if (!currentUser) {
    return null;
  }
  return (
    <div className="p-6  flex flex-col items-center ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          View your account information.
        </p>
      </div>
      <div className=" w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-4 border-b border-slate-200 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-2xl font-semibold text-white">
            {currentUser.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {currentUser.name}
            </h2>
            <p className="text-sm text-slate-500">{currentUser.email}</p>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <User size={20} className="text-slate-500" />
            <div>
              <p className="text-xs text-slate-500">Full Name</p>
              <p className="text-sm font-medium text-slate-800">
                {currentUser.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-slate-500" />
            <div>
              <p className="text-xs text-slate-500">Email Address</p>
              <p className="text-sm font-medium text-slate-800">
                {currentUser.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-slate-500"></Calendar>
            <div>
              <p className="text-xs text-slate-500">Account ID</p>
              <p className="text-sm font-medium text-slate-800">
                {currentUser.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
