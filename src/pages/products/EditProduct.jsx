import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import ProductForm from "../../components/Product/ProductForm";
import { getProducts, saveProducts } from "../../services/productService";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const products = getProducts();
    // Use loose equality (==) to safely handle string vs number route parameters
    const foundProduct = products.find((p) => p.id == id);
    if (!foundProduct) {
      setNotFound(true);
      return;
    }
    setProduct(foundProduct);
  }, [id]);

  function handleUpdateProduct(updatedData) {
    const products = getProducts();
    const updatedProducts = products.map((p) => {
      if (p.id == id) {
        return {
          ...p,
          ...updatedData,
        };
      }
      return p;
    });
    saveProducts(updatedProducts);
    navigate("/products");
  }

  if (notFound) {
    return (
      <div className="p-3">
        <h1 className="text-xl font-bold text-slate-900">Product not found</h1>
        <p className="mt-1 text-sm text-slate-500">
          The product you are looking for does not exist or has been removed.
        </p>
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="mt-4 flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <ArrowLeft size={16} /> Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-slate-500">
        <LoaderCircle className="h-8 w-8 animate-spin" />
        <p>Loading product information...</p>
      </div>
    );
  }

  return (
    <div className="p-3 w-full">
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Product</h1>
          <p className="mt-1 text-sm text-slate-500">
            Update the information for {product?.name}.
          </p>
        </div>
      </div>

      {/* Form Card Container */}
      <div className="max-w-3xl w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProductForm
          initialData={product}
          onSubmit={handleUpdateProduct}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}

export default EditProduct;