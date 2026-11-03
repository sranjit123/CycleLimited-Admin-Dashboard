
function RecentOrders({ orders = [] }) {
  const recentOrders = [...orders]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Recent Orders
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Latest orders returned by the API.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Discounted Total</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">
                    #{order.id}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    Customer #{order.userId}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {order.totalQuantity ?? 0}
                  </td>

                  <td className="px-4 py-3 font-medium text-slate-800">
                    ${Number(order.total ?? 0).toLocaleString(
                      "en-US",
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    )}
                  </td>

                  <td className="px-4 py-3 font-medium text-emerald-700">
                    ${Number(order.discountedTotal ?? 0).toLocaleString(
                      "en-US",
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-slate-500"
                >
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;

