import ProductRow1 from "./ProductRow1";

function ProductTable1({ products }) {

    return (
        <div className="w-full overflow-x-auto">

            <table className="w-full min-w-[1000px]">

                <thead>

                    <tr className="border-b border-slate-200">

                        <th className="w-12 px-6 py-4 text-left">
                            <input
                                type="checkbox"
                                className="
                                    h-4
                                    w-4
                                    cursor-pointer
                                    rounded
                                    border-slate-300
                                "
                            />
                        </th>


                        <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">
                            Products
                        </th>


                        <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">
                            Category
                        </th>


                        <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">
                            Brand
                        </th>


                        <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">
                            Price
                        </th>


                        <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">
                            Stock
                        </th>


                        <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">
                            Created At
                        </th>


                        <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">
                            Actions
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {products.map((product) => (

                        <ProductRow1
                            key={product.id}
                            product={product}
                        />

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ProductTable1;