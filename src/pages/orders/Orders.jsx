
import { useEffect, useState } from "react";
import { LoaderCircle, RefreshCw } from "lucide-react";

import DataTable from "../../components/DataTable/DataTable";
import SearchBar from "../../components/Auth/SearchBar";
import { getOrders } from "../../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Search by order ID or customer ID
  const filteredOrders = orders.filter((order) => {
    const searchValue = search.trim().toLowerCase();

    return (
      String(order.id).includes(searchValue) ||
      String(order.userId).includes(searchValue)
    );
  });

  // Table columns
  const columns = [
    {
      key: "id",
      label: "ORDER ID",
      render: (order) => (
        <span className="font-medium text-slate-800">
          #{order.id}
        </span>
      ),
    },
    {
      key: "userId",
      label: "CUSTOMER ID",
      render: (order) => (
        <span className="text-slate-600">
          Customer #{order.userId}
        </span>
      ),
    },
    {
      key: "totalProducts",
      label: "PRODUCT TYPES",
      render: (order) => order.totalProducts,
    },
    {
      key: "totalQuantity",
      label: "TOTAL ITEMS",
      render: (order) => order.totalQuantity,
    },
    {
      key: "total",
      label: "ORDER TOTAL",
      render: (order) => (
        <span className="font-medium text-slate-800">
          ${Number(order.total).toFixed(2)}
        </span>
      ),
    },
    {
      key: "discountedTotal",
      label: "DISCOUNTED TOTAL",
      render: (order) => (
        <span className="font-medium text-green-700">
          ${Number(order.discountedTotal).toFixed(2)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-3">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Orders
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View customer orders.
        </p>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search by order ID or customer ID..."
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3">
            <LoaderCircle className="h-8 w-8 animate-spin text-slate-500" />
            <p className="text-sm text-slate-500">
              Loading orders...
            </p>
          </div>
        ) : error ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4">
            <p className="text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchOrders}
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700"
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        ) : filteredOrders.length > 0 ? (
          <DataTable
            columns={columns}
            data={filteredOrders}
          />
        ) : (
          <div className="flex min-h-64 items-center justify-center">
            <p className="text-sm text-slate-500">
              No orders found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;

