
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

function CategoryDropdown({
  categories = [],
  value = "",
  onChange,
  error,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedCategory = categories.find(
    (category) => category.name === value
  );

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function handleSelect(category) {
    onChange(category.name);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Category
      </label>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
        className={`flex w-full items-center justify-between rounded-lg border bg-white px-4 py-3 text-left text-sm outline-none transition focus:ring-2 focus:ring-slate-200 ${
          error
            ? "border-red-500"
            : isOpen
              ? "border-slate-900"
              : "border-slate-300"
        }`}
      >
        <span
          className={
            selectedCategory ? "text-slate-900" : "text-slate-400"
          }
        >
          {selectedCategory?.name || "Select a category"}
        </span>

        <ChevronDown
          size={18}
          className={`text-slate-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div
            role="listbox"
            className="max-h-60 overflow-y-auto p-1.5"
          >
            {categories.length > 0 ? (
              categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="option"
                  aria-selected={value === category.name}
                  onClick={() => handleSelect(category)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition ${
                    value === category.name
                      ? "bg-slate-100 font-medium text-slate-900"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{category.name}</span>

                  <span className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        category.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {category.status}
                    </span>

                    {value === category.name && (
                      <Check size={16} className="text-slate-700" />
                    )}
                  </span>
                </button>
              ))
            ) : (
              <p className="px-3 py-5 text-center text-sm text-slate-500">
                No categories available.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryDropdown;