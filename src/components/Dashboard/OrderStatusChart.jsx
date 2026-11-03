import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
const STATUS_COLORS = {
  Completed: "green",
  Pending: "orange",
  Processing: "yellow",
  Cancelled: "red",
};
function OrderStatusChart({ orders }) {
  const statuses = ["Completed", "Pending", "Processing", "Cancelled"];
  const chartData = statuses.map((status) => ({
    name: status,
    value: orders.filter((order) => order.status === status).length,
  }));
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900"> Order Status</h2>
        <p className="mt-1 text-sm text-slate-500">
          Breakdown of orders by status
        </p>
      </div>
      <div className="mt-3 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={3}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default OrderStatusChart;
