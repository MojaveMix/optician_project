import { DollarSign, ShoppingCart, PackageX, TrendingUp } from "lucide-react";
import { useApp } from "../context/AppContext";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { useMemo } from "react";

export default function Dashboard() {
  const { orders, products, payments } = useApp();

  const stats = useMemo(() => {
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const pendingOrders = orders.filter((o) => o.status === "PENDING").length;
    const lowStock = products.filter(
      (p) => p.stock_quantity <= p.min_stock,
    ).length;
    const deliveredOrders = orders.filter(
      (o) => o.status === "DELIVERED",
    ).length;

    return { totalRevenue, pendingOrders, lowStock, deliveredOrders };
  }, [orders, products, payments]);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .slice(0, 5);
  }, [orders]);

  const monthlySales = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const data = [1200, 1900, 1500, 2400, 2100, 2800];
    return months.map((month, index) => ({ month, amount: data[index] }));
  }, []);

  const maxAmount = Math.max(...monthlySales.map((m) => m.amount));

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-5">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">
                ${stats.totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12.5% from last month</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.pendingOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            {stats.deliveredOrders} orders delivered
          </p>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Low Stock Items</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.lowStock}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <PackageX className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="mt-4 text-sm text-red-600">Restock needed</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">
                {orders.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">All time</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Monthly Sales">
          <div className="space-y-4">
            {monthlySales.map((item) => (
              <div key={item.month}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {item.month}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${item.amount}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#3B82F6] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(item.amount / maxAmount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Orders">
          <div className="space-y-4">
            {recentOrders.map((order) => {
              const statusVariant =
                order.status === "DELIVERED"
                  ? "success"
                  : order.status === "READY"
                    ? "info"
                    : order.status === "CANCELED"
                      ? "danger"
                      : "warning";

              return (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      ${order.total_price}
                    </p>
                    <Badge variant={statusVariant}>{order.status}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {stats.lowStock > 0 && (
        <Card className="mt-6" title="Low Stock Alert">
          <div className="space-y-3">
            {products
              .filter((p) => p.stock_quantity <= p.min_stock)
              .map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                >
                  <div>
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      {product.brand} - {product.model}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">
                      {product.stock_quantity} in stock
                    </p>
                    <p className="text-xs text-gray-500">
                      Min: {product.min_stock}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}
    </div>
  );
}
