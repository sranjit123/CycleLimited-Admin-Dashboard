import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import UserForm from "../../components/User/UserForm";
import { createUser } from "../../services/userService"; 

function AddUser() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleAddUser(formData) {
    try {
      setSaving(true);
      setError("");
      await createUser(formData);
      navigate("/users");
    } catch (err) {
      setError("Failed to add user. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 w-full">
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/users")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add User</h1>
          <p className="mt-1 text-sm text-slate-500">
            Add a new user to the system.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 max-w-3xl rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="max-w-3xl w-full  rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <UserForm
          onSubmit={handleAddUser}
          submitLabel={saving ? "Saving..." : "Add User"}
        />
        {saving && (
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Creating user...
          </p>
        )}
      </div>
    </div>
  );
}

export default AddUser;