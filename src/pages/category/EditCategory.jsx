
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../components/Category/CategoryForm";
import { getCategories, saveCategories } from "../../services/categoryService";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const found = getCategories().find(
      (item) => item.id === Number(id)
    );

    setCategory(found || null);
  }, [id]);

  function handleUpdateCategory(formData) {
    if (!category) return;

    setSaving(true);

    try {
      const updatedCategories = getCategories().map((item) =>
        item.id === category.id
          ? { ...item, ...formData }
          : item
      );

      saveCategories(updatedCategories);
      navigate("/categories");
    } finally {
      setSaving(false);
    }
  }

  if (!category) {
    return (
      <div className="p-6">
        <p className="text-slate-600">Category not found.</p>
        <button
          type="button"
          onClick={() => navigate("/categories")}
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Back to Categories
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">
        Edit Category
      </h1>
      <p className="mb-6 text-sm text-slate-500">
        Update the details for {category.name}.
      </p>

      <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <CategoryForm
          initialData={category}
          onSubmit={handleUpdateCategory}
          submitLabel="Update Category"
          saving={saving}
        />
      </div>
    </div>
  );
}

export default EditCategory;