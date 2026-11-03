import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import { getUsers, deleteUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { LoaderCircle, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import SearchBar from "../../components/Auth/SearchBar";
import DeleteModal from "../../components/Auth/DeleteModal";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );
  function openDeleteModal(userId) {
    setSelectedUserId(userId);
  }
  function closeDeleteModal() {
    setSelectedUserId(null);
  }
  async function handleConfirmDelete() {
    if (selectedUserId === null) return;
    try {
      await deleteUser(selectedUserId);
      setUsers((previousUsers) =>
        previousUsers.filter((user) => user.id !== selectedUserId),
      );
      closeDeleteModal();
    } catch (err) {
      setError("Failed to delete user");
      closeDeleteModal();
    }
  }
  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);
  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "username",
      label: "Username",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "website",
      label: "Website",
    },
    {
      key: "actions",
      label: "Actions",
      render: (user) => (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(`/users/${user.id}`)}
            className="text-slate-500 transition hover:text-slate-900"
            title="View user"
          >
            <Eye size={17} />
          </button>
          <button
            type="button"
            onClick={() => navigate(`/users/edit/${user.id}`)}
            className="text-slate-500 transition hover:text-slate-900"
            title="Edit user"
          >
            <Pencil size={17} />
          </button>
          <button
            type="button"
            onClick={() => openDeleteModal(user.id)}
            className="text-slate-500 transition hover:text-red-600"
            title="Delete user"
          >
            <Trash2 size={17} />
          </button>
        </div>
      ),
    },
  ];
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center p-6">
        <div className="text-sm flex flex-col items-center gap-3 justify-center text-slate-500">
          <div>Loading Users..</div>
          <div>
            <LoaderCircle className="animate-spin w-10 h-10" />
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }
  return (
    <div className="p-3">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage registered users.
          </p>
        </div>
      </div>
      <div className="mt-2 flex justify-between py-3 ">
        <div className="w-[70%]">
          <SearchBar
            search={search}
            setSearch={setSearch}
            placeholder="Search Users..."
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => navigate("/users/add")}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            <Plus size={18} />
            Add User
          </button>
        </div>
      </div>
      <DataTable columns={columns} data={filteredUsers} />
      <DeleteModal
        isOpen={selectedUserId !== null}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
}
export default Users;
