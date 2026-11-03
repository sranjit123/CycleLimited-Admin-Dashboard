import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductForm from "../../components/Product/ProductForm";
import { getProducts, saveProducts } from "../../services/productService";

function AddProduct() {
  const navigate = useNavigate();

  function handleAddProduct(productData) {
    const products = getProducts();

    const newProduct = {
      id: Date.now(),
      ...productData,
      createdAt: new Date().toISOString().split("T")[0], // Formats to YYYY-MM-DD
    };

    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);

    navigate("/products");
  }

  return (
    <div className="p-3 w-full">
      <div className="mb-3 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="flex px-4 py-3 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-lg font-bold text-slate-900">Add Product</h1>
          <p className="mt-1 text-sm text-slate-500">
            Add a new product to your catalog.
          </p>
        </div>
      </div>

      <div className="max-w-3xl w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProductForm
          onSubmit={handleAddProduct}
          submitLabel="Add Product"
        />
      </div>
    </div>
  );
}

export default AddProduct;