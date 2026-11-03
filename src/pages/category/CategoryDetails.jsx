
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Tag,
  Package,
  CalendarDays,
  AlignLeft,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { getCategories } from "../../services/categoryService";

function CategoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categories = getCategories();

    const foundCategory = categories.find(
      (item) => item.id === Number(id)
    );

    setCategory(foundCategory || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading category details...
      </div>
    );
  }

  if (!category) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-slate-900">
          Category Not Found
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          The category may have been deleted or the ID is invalid.
        </p>

        <button
          type="button"
          onClick={() => navigate("/categories")}
          className="mt-5 flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          <ArrowLeft size={17} />
          Back to Categories
        </button>
      </div>
    );
  }

  const details = [
    {
      label: "Category ID",
      value: category.id,
      icon: Tag,
    },
    {
      label: "Category Slug",
      value: category.slug,
      icon: AlignLeft,
    },
    {
      label: "Products",
      value: `${category.productCount ?? 0} products`,
      icon: Package,
    },
    {
      label: "Created At",
      value: category.createdAt
        ? new Date(
            category.createdAt + "T00:00:00"
          ).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "Not available",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="p-3">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate("/categories")}
        className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={18} />
        Back to Categories
      </button>

      {/* Page heading */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Category Details
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View information about this product category.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(`/categories/edit/${category.id}`)
          }
          className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <Pencil size={17} />
          Edit Category
        </button>
      </div>

      {/* Category overview */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Tag size={30} />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">
                {category.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {category.slug}
              </p>
            </div>

            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
                category.status === "Active"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {category.status === "Active" ? (
                <CheckCircle size={14} />
              ) : (
                <XCircle size={14} />
              )}

              {category.status}
            </span>
          </div>
        </div>

        {/* Detail cards */}
        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4">
          {details.map((detail) => {
            const Icon = detail.icon;

            return (
              <div
                key={detail.label}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Icon size={19} />
                </div>

                <p className="text-sm text-slate-500">
                  {detail.label}
                </p>

                <p className="mt-1 break-words font-semibold text-slate-900">
                  {detail.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Description */}
        <div className="border-t border-slate-200 p-6">
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
            <AlignLeft size={18} />
            Description
          </h3>

          <p className="text-sm leading-6 text-slate-600">
            {category.description || "No description provided."}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryDetails;