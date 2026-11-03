import { useEffect, useState } from "react";
import FormInput from "../Auth/FormInput";
function CategoryForm({
  initialData,
  onSubmit,
  submitLabel = "Save Category",
  saving = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        status: initialData.status || "Active",
      });
    }
  }, [initialData]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "name" && !initialData
        ? {
            slug: value
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, ""),
          }
        : {}),
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required.";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Category slug is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Please enter a description.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      description: formData.description.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Reusable FormInput for Name */}
      <FormInput
        label="Category Name *"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g. Road Bikes"
        error={errors.name}
      />

      {/* Reusable FormInput for Slug */}
      <FormInput
        label="Slug *"
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        placeholder="e.g. road-bikes"
        error={errors.slug}
      />

      {/* Description Textarea */}
      <div className="space-y-1">
        <label htmlFor="description" className="block text-sm font-medium text-slate-700">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the products in this category..."
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
            errors.description
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-slate-900"
          }`}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      {/* Status Dropdown */}
      <div className="space-y-1">
        <label htmlFor="status" className="block text-sm font-medium text-slate-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;