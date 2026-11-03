import { useState } from "react";
import { Download, Plus } from "lucide-react";


import ProductTable1 from "../../components/ProductTable1";

import { getProducts } from "../../services/productService1";
import SearchBar from "../../components/Auth/SearchBar";

function Product1() {
  const [products] = useState(getProducts());
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      product.brand.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div
        className="
                mb-8
                flex
                items-center
                justify-between
            "
      >
        <h1
          className="
                    text-2xl
                    font-semibold
                    text-slate-900
                "
        >
          Product List
        </h1>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500">Home</span>

          <span className="text-slate-400">/</span>

          <span className="text-slate-900">Product List</span>
        </div>
      </div>

      <div
        className="
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                bg-white
            "
      >
        <div
          className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-200
                    px-6
                    py-6
                "
        >
          <div>
            <h2
              className="
                            text-xl
                            font-semibold
                            text-slate-900
                        "
            >
              Products List
            </h2>

            <p
              className="
                            mt-1
                            text-sm
                            text-slate-500
                        "
            >
              Track your store's progress to boost your sales.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-indigo-600
                            px-5
                            py-3
                            text-sm
                            font-medium
                            text-white
                            hover:bg-indigo-700
                        "
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </div>

        <div
          className="
                    border-b
                    border-slate-200
                    px-6
                    py-5
                "
        >
          <SearchBar search={search} setSearch={setSearch} placeholder={"search..."}/>
        </div>

        <ProductTable1 products={filteredProducts} />

        <div
          className="
                    border-t
                    border-slate-200
                    px-6
                    py-4
                    text-sm
                    text-slate-500
                "
        >
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>
    </div>
  );
}

export default Product1;
