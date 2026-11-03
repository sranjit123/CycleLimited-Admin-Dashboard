import { ArrowLeft, Package, Tag, Boxes, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../../services/productService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const products = getProducts();
    const foundProduct = products.find((product) => product.id === Number(id));
    if (!foundProduct) {
      setNotFound(true);
      return;
    }
    setProduct(foundProduct);
  }, [id]);
  if (notFound) {
    return (
      <div className="p-3">
        <div className="rounded-xl border border-slate-200 bg-white p-1 text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            Product not found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            The product you're looking for does not exist.
          </p>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-500">Loading product...</p>
      </div>
    );
  }
  return (
    <div className="p-3">
      <div className="mb-3 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {" "}
            Product Details
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {" "}
            View information about this product.
          </p>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center pl-3">
          {/* <div className="flex min-h=[400px] items-center justify-center bg-slate-50 p-8">
                <img src={product.image} alt={product.name} className="max-h-[360px] max-w-full rounded-lg object-contain" />
            </div> */}
          <div className="flex h-[400px] w-full items-center justify-center bg-slate-50 p-2 ">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full rounded-lg object-contain"
            />
          </div>
          <div className="p-4">
            <div className="mb-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {product.category}
              </span>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {product.name}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{product.brand}</p>
            </div>
            {/* <div className="mb-3 flex text-center">
              <p className="text-sm text-slate-500">Price</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                Rs. {product.price.toLocaleString()}
              </p>
            </div> */}
            <div className="mb-4">
              <span className="text-xs font-semibold uppercase text-slate-400">
                Price
              </span>
              <p className="mt-1 text-xl font-extrabold  text-slate-900">
                Rs. {product.price.toLocaleString()}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                    <Tag size={18} className="text-slate-600" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Brand</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {product.brand}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                    <Package size={18} className="text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Category</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {product.category}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                    <Boxes size={18} className="text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Stock</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {product.stock} units
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                    <DollarSign size={18} className="text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Price</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      Rs. {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-3 border-t border-slate-200 pt-6">
              <button
                type="button"
                onClick={() => navigate(`/products/edit/${product.id}`)}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                {" "}
                Edit Product
              </button>
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm  font-medium text-slate-700 hover:bg-slate-50"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
