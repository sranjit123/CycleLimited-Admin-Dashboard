import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import UserForm from "../../components/User/UserForm";
import Button from "../../components/Auth/Button";
import { getUsers, updateUser } from "../../services/userService";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError("");
        const users = await getUsers();
        // Use loose equality (==) to handle string vs number route params safely
        const foundUser = users.find((user) => user.id == id);
        if (!foundUser) {
          setError("User not found");
          return;
        }
        setUser(foundUser);
      } catch (error) {
        setError("Failed to load user. Please try again");
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [id]);

  async function handleUpdateUser(formData) {
    if (!user) return;
    try {
      setSaving(true);
      setError("");
      await updateUser(user.id, {
        ...user,
        ...formData,
      });
      navigate("/users");
    } catch (error) {
      console.error("API update error:", error);
      setError(`Failed to update user. Please try again: ${error.message}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-slate-500">
        <LoaderCircle className="h-8 w-8 animate-spin" />
        <p>Loading user information...</p>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="p-6">
        <p className="mb-4 text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={() => navigate("/users")}
          className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={17} /> Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      {/* Header with Back Button matching UserDetails layout */}
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/users")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit User</h1>
          <p className="mt-1 text-sm text-slate-500">
            Update the information for {user?.name}.
          </p>
        </div>
      </div>

      {/* Error Alert Card */}
      {error && (
        <div className="mb-6 max-w-3xl rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form Card Container */}
      <div className="max-w-3xl w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <UserForm
          initialData={user}
          onSubmit={handleUpdateUser}
          submitLabel={saving ? "Saving..." : "Update User"}
        />
        {saving && (
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Saving changes...
          </p>
        )}
      </div>
    </div>
  );
}

export default EditUser;