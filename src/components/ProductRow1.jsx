import { Eye, Pencil, Trash2 } from "lucide-react";
function ProductRow1({ product }) {
  return (
    <tr className="border-b border-slate-200">
      <td className="px-6 py-5">
        <input
          type="checkbox"
          className="h-4 w-4 cursor-pointer rounded border-slate-300"
        />
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="h-10 w-10 rounded-md object-cover"
          />
          <span>{product.name}</span>
        </div>
      </td>

      <td className="px-6 py-5 text-slate-600">{product.category}</td>
      <td className="px-6 py-5 text-slate-800">{product.brand}</td>
      <td className="px-6 py-5 font-medium text-slate-800">
        Rs. {product.price.toLocaleString()}
      </td>
      <td className="py-5 px-6">
        {product.stock > 0 ? (
          <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
            In Stock
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
            Out of stock
          </span>
        )}
      </td>
      <td className="px-6 py-5 text-slate-700">{product.createdAt}</td>
      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="View product"
            className="
                            rounded-md
                            p-2
                            text-slate-500
                        "
          >
            <Eye size={18} />
          </button>

          <button
            type="button"
            title="Update product"
            className="
                            rounded-md
                            p-2
                            text-slate-500
                           
                        "
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            title="Delete product"
            className="
                            rounded-md
                            p-2
                            text-slate-500
                            
                        "
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
export default ProductRow1;
