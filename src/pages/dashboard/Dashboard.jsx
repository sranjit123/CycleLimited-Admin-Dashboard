
import { useEffect, useState } from "react";
import { Users, Package, ShoppingCart } from "lucide-react";

import StatCard from "../../components/Dashboard/StatCard";
import OrderStatusChart from "../../components/Dashboard/OrderStatusChart";
import RecentOrders from "../../components/Dashboard/RecentOrders";

import products from "../../data/products";
import orders from "../../data/orders";
import { getOrders } from "../../services/orderService";

function Dashboard() {
  // Local user data
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Local product data
  const savedProducts = localStorage.getItem("products");

  const productList = savedProducts
    ? JSON.parse(savedProducts)
    : products;

  // API order data for the Total Orders card only
  const [apiOrders, setApiOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        setOrdersLoading(true);
        setOrdersError("");

        const data = await getOrders();
        setApiOrders(data);
      } catch (error) {
        console.error("Failed to fetch API orders:", error);
        setOrdersError("Unable to load orders");
      } finally {
        setOrdersLoading(false);
      }
    }

    fetchOrders();
  }, []);

  // Local order status data
  const orderStatuses = [
    {
      label: "Completed",
      status: "Completed",
      color: "bg-emerald-500",
    },
    {
      label: "Pending",
      status: "Pending",
      color: "bg-amber-500",
    },
    {
      label: "Processing",
      status: "Processing",
      color: "bg-blue-500",
    },
    {
      label: "Cancelled",
      status: "Cancelled",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-3">
      {/* Dashboard heading */}
      <div className="mb-3">
        <h1 className="text-xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of your store's performance and activity.
        </p>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Users"
          value={users.length}
          description="Registered accounts"
          icon={Users}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Total Products"
          value={productList.length}
          description="Products in your catalog"
          icon={Package}
          color="bg-emerald-100 text-emerald-600"
        />

        <StatCard
          title="Total Orders"
          value={
            ordersLoading
              ? "..."
              : ordersError
                ? "—"
                : apiOrders.length
          }
          description={
            ordersError
              ? "Unable to load API orders"
              : "Orders returned by the API"
          }
          icon={ShoppingCart}
          color="bg-amber-100 text-amber-600"
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <OrderStatusChart orders={orders} />
        </div>

        <div className="xl:col-span-2">
          <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Order Summary
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              A quick overview of order activity.
            </p>

            {/* <div className="mt-2 grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2"> */}
            <div className="flex flex-col gap-3 mt-4">
              {orderStatuses.map((item) => {
                const count = orders.filter(
                  (order) => order.status === item.status
                ).length;

                return (
                  <div
                    key={item.status}
                    className="flex items-center justify-between rounded-lg border border-slate-100 p-1"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-3 w-3 rounded-full ${item.color}`}
                      />

                      <span className="text-sm text-slate-600">
                        {item.label}
                      </span>
                    </div>

                    <span className="text-lg font-semibold text-slate-900">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders uses local data */}
      <div className="mt-5">
        <RecentOrders orders={orders} />
      </div>
    </div>
  );
}

export default Dashboard;

