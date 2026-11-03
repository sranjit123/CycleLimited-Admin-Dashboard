import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { getProducts, saveProducts } from "../../services/productService";
import DataTable from "../../components/DataTable/DataTable";
import ExportButton from "../../components/ExportButton/ExportButton";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/Auth/DeleteModal";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedProducts = getProducts();
    setProducts(savedProducts);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const allSelected =
    filteredProducts.length > 0 &&
    selectedProducts.length === filteredProducts.length;

  function handleSelectAll() {
    if (allSelected) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  }

  function handleSelectProduct(productId) {
    setSelectedProducts((previous) => {
      if (previous.includes(productId)) {
        return previous.filter((id) => id !== productId);
      }
      return [...previous, productId];
    });
  }

  function handleDeleteProduct(productId) {
    console.log("Selected product ID:", productId);
    setProductToDelete(productId);
  }

  function confirmDeleteProduct() {
  if (productToDelete === null) return;

  const updatedProducts = products.filter(
    (product) => product.id !== productToDelete
  );

  setProducts(updatedProducts);
  saveProducts(updatedProducts);

  setSelectedProducts((previous) =>
    previous.filter((id) => id !== productToDelete)
  );

  setProductToDelete(null);
}

  function handleExport() {
    const headers = [
      "Product",
      "Category",
      "Brand",
      "Price",
      "Stock",
      "Created At",
    ];
    const rows = filteredProducts.map((product) => [
      product.name,
      product.category,
      product.brand,
      product.price,
      product.stock,
      product.createdAt,
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "products.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  const productColumns = [
    {
      key: "select",
      label: "",
      renderHeader: () => (
        <input
          type="checkbox"
          checked={allSelected}
          onChange={handleSelectAll}
          className="h-4 w-4 rounded border-slate-300"
        />
      ),
      render: (product) => (
        <input
          type="checkbox"
          checked={selectedProducts.includes(product.id)}
          onChange={() => handleSelectProduct(product.id)}
          className="h-4 w-4 rounded border-slate-300"
        />
      ),
    },
    {
      key: "name",
      label: "Product",
      render: (product) => (
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-10 w-10 rounded-md object-cover"
          />
          <span className="font-medium text-slate-900">{product.name}</span>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "brand",
      label: "Brand",
    },
    {
      key: "price",
      label: "Price",
      render: (product) => (
        <span className="font-medium text-slate-900">
          Rs. {product.price.toLocaleString()}
        </span>
      ),
    },
    {
      key: "stock",
      label: "Stock",
      render: (product) =>
        product.stock > 0 ? (
          <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
            In stock
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
            Out of stock
          </span>
        ),
    },
    {
      key: "createdAt",
      label: "Created At",
    },
    {
      key: "actions",
      label: "Actions",
      render: (product) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="View Product"
            onClick={() => navigate(`/products/${product.id}`)}
            className="rounded-md p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Eye size={18} />
          </button>
          <button
            type="button"
            title="Edit Product"
            onClick={() => navigate(`/products/edit/${product.id}`)}
            className="rounded-md p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Pencil size={18} />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteProduct(product.id)}
            title="Delete Product"
            className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];
console.log("Product to delete:", productToDelete);
  return (
    <div className="p-3">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your products</p>
        </div>
      </div>

      <div className="mb-6 flex justify-between">
        <div className="w-[70%]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Products.."
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
          />
        </div>
        <div className="flex items-center gap-3">
          <ExportButton onExport={handleExport} />
          <button
            type="button"
            onClick={() => navigate("/products/add")}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      <DataTable columns={productColumns} data={filteredProducts} />

      {/* Reusable Delete Modal */}
      <DeleteModal
        isOpen={productToDelete !== null}
        onClose={() => setProductToDelete(null)}
        onConfirm={confirmDeleteProduct}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action will remove it permanently."
      />
    </div>
  );
}

export default Products;