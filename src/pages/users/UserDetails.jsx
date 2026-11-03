import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  Globe,
  MapPin,
  Building2,
  Trash2,
} from "lucide-react";
import Button from "../../components/Auth/Button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getUsers } from "../../services/userService";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const users = await getUsers();

        const foundUser = users.find((user) => user.id === Number(id));

        if (!foundUser) {
          setNotFound(true);
          return;
        }

        setUser(foundUser);
      } catch (error) {
        setNotFound(true);
      }
    }

    loadUser();
  }, [id]);

  if (notFound) {
    return (
      <div className="p-3">
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            User not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The user you're looking for does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/users")}
            className="mt-5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-500">Loading user...</p>
      </div>
    );
  }

  return (
    <div className="p-3">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/users")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Details</h1>

          <p className="mt-1 text-sm text-slate-500">
            View information about this user.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-5 border-b border-slate-200 p-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <span className="text-base font-semibold text-slate-700">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">{user.name}</h2>

            <p className="mt-1 text-sm text-slate-500">@{user.username}</p>
          </div>
        </div>

        <div className="p-3">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-2">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-slate-500" />

                <div>
                  <p className="text-xs font-medium text-slate-500">Email</p>

                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-2">
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-slate-500" />

                <div>
                  <p className="text-xs font-medium text-slate-500">Phone</p>

                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {user.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-2">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-slate-500" />

                <div>
                  <p className="text-xs font-medium text-slate-500">Website</p>

                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {user.website}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-2">
              <div className="flex items-center gap-3">
                <User size={20} className="text-slate-500" />

                <div>
                  <p className="text-xs font-medium text-slate-500">Username</p>

                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {user.username}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {user.address && (
            <div className="mt-3">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">
                Address
              </h3>

              <div className="rounded-lg border border-slate-200 p-2">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="mt-0.5 text-slate-500" />

                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {user.address.street}, {user.address.suite}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {user.address.city}, {user.address.zipcode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {user.company && (
            <div className="mt-3">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">
                Company
              </h3>

              <div className="rounded-lg border border-slate-200 p-2">
                <div className="flex items-start gap-3">
                  <Building2 size={20} className="mt-0.5 text-slate-500" />

                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {user.company.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {user.company.catchPhrase}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-3 flex gap-3 border-t border-slate-200 pt-3">
            <button
              type="button"
              onClick={() => navigate(`/users/edit/${user.id}`)}
              className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              Edit User
            </button>

            <button
              type="button"
              onClick={() => navigate("/users")}
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
