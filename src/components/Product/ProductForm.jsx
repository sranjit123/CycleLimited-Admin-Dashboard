
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../Auth/FormInput";
import CategoryDropdown from "../Category/CategoryDropdown";
import { getCategories } from "../../services/categoryService";

function ProductForm({
  initialData,
  onSubmit,
  submitLabel = "Add Product",
}) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    brand: initialData?.brand || "",
    price: initialData?.price ?? "",
    stock: initialData?.stock ?? "",
    image: initialData?.image || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  // Keep the form synchronized if a different product is loaded.
  useEffect(() => {
    setFormData({
      name: initialData?.name || "",
      category: initialData?.category || "",
      brand: initialData?.brand || "",
      price: initialData?.price ?? "",
      stock: initialData?.stock ?? "",
      image: initialData?.image || "",
    });
  }, [initialData]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function handleCategoryChange(categoryName) {
    setFormData((previous) => ({
      ...previous,
      category: categoryName,
    }));

    setErrors((previous) => ({
      ...previous,
      category: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    } else if (
      !categories.some(
        (category) =>
          category.name === formData.category &&
          category.status === "Active"
      )
    ) {
      newErrors.category = "Select an active category";
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required";
    }

    if (formData.price === "") {
      newErrors.price = "Price is required";
    } else if (
      !Number.isFinite(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Price must be greater than 0";
    }

    if (formData.stock === "") {
      newErrors.stock = "Stock is required";
    } else if (
      !Number.isInteger(Number(formData.stock)) ||
      Number(formData.stock) < 0
    ) {
      newErrors.stock = "Stock must be a non-negative whole number";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      name: formData.name.trim(),
      category: formData.category,
      brand: formData.brand.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
      image: formData.image.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        label="Product Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter product name"
        error={errors.name}
      />

      <CategoryDropdown
        categories={categories}
        value={formData.category}
        onChange={handleCategoryChange}
        error={errors.category}
      />

      {categories.filter((category) => category.status === "Active")
        .length === 0 && (
        <p className="-mt-2 text-xs text-amber-600">
          No active categories are available. Create or activate a
          category on the Categories page first.
        </p>
      )}

      <FormInput
        label="Brand"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        placeholder="Enter brand name"
        error={errors.brand}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormInput
          label="Price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          error={errors.price}
        />

        <FormInput
          label="Stock"
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Enter stock quantity"
          error={errors.stock}
        />
      </div>

      <FormInput
        label="Image URL"
        type="url"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="https://example.com/product.jpg"
        error={errors.image}
      />

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            categories.filter(
              (category) => category.status === "Active"
            ).length === 0
          }
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;