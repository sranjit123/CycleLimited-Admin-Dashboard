
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryForm from "../../components/Category/CategoryForm";
import { getCategories, saveCategories } from "../../services/categoryService";

function AddCategory() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  function handleAddCategory(formData) {
    setSaving(true);

    try {
      const categories = getCategories();
      const nextId =
        categories.length > 0
          ? Math.max(...categories.map((category) => category.id)) + 1
          : 1;

      saveCategories([
        ...categories,
        {
          ...formData,
          id: nextId,
          productCount: 0,
          createdAt: new Date().toISOString().slice(0, 10),
        },
      ]);

      navigate("/categories");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">
        Add Category
      </h1>
      <p className="mb-6 text-sm text-slate-500">
        Create a new category for your cycling products.
      </p>

      <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <CategoryForm
          onSubmit={handleAddCategory}
          submitLabel="Add Category"
          saving={saving}
        />
      </div>
    </div>
  );
}

export default AddCategory;