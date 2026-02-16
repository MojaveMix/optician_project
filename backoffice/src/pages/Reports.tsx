import { useMemo } from "react";
import { TrendingUp, DollarSign, Package, AlertTriangle } from "lucide-react";
import { useApp } from "../context/AppContext";
import Card from "../components/Card";
import Table from "../components/Table";
import Badge from "../components/Badge";
import { Product } from "../data/mockData";

export default function Reports() {
  const { orders, products, orderItems, payments } = useApp();

  const stats = useMemo(() => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const dailyRevenue = payments
      .filter((p) => new Date(p.payment_date) >= startOfDay)
      .reduce((sum, p) => sum + p.amount, 0);

    const monthlyRevenue = payments
      .filter((p) => new Date(p.payment_date) >= startOfMonth)
      .reduce((sum, p) => sum + p.amount, 0);

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    const deliveredOrders = orders.filter(
      (o) => o.status === "DELIVERED",
    ).length;

    return { dailyRevenue, monthlyRevenue, totalRevenue, deliveredOrders };
  }, [orders, payments]);

  const bestSellingProducts = useMemo(() => {
    const productSales = new Map<string, number>();

    orderItems.forEach((item) => {
      const currentQty = productSales.get(item.product_id) || 0;
      productSales.set(item.product_id, currentQty + item.quantity);
    });

    return Array.from(productSales.entries())
      .map(([productId, quantity]) => {
        const product = products.find(
          (p) => Number(p.id) === Number(productId),
        );
        return { product, quantity };
      })
      .filter((item) => item.product !== undefined)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);
  }, [orderItems, products]);

  const lowStockProducts = useMemo(() => {
    return products
      .filter((p) => Number(p.stock_quantity) <= Number(p.min_stock))
      .sort((a, b) => Number(a.stock_quantity) - Number(b.stock_quantity));
  }, [products]);

  const categoryRevenue = useMemo(() => {
    const categoryMap = new Map<string, number>();

    orderItems.forEach((item) => {
      const product = products.find(
        (p) => Number(p.id) === Number(item.product_id),
      );
      if (product) {
        const current = categoryMap.get(product.category) || 0;
        categoryMap.set(
          product.category,
          current + Number(item.price) * Number(item.quantity),
        );
      }
    });

    return Array.from(categoryMap.entries())
      .map(([category, revenue]) => ({ category, revenue }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [orderItems, products]);

  const bestSellingColumns = [
    {
      header: "Rank",
      accessor: (_: unknown, index?: number) => `#${(index || 0) + 1}`,
    },
    {
      header: "Product",
      accessor: (row: (typeof bestSellingProducts)[0]) => row.product?.name,
    },
    {
      header: "Brand",
      accessor: (row: (typeof bestSellingProducts)[0]) => row.product?.brand,
    },
    {
      header: "Category",
      accessor: (row: (typeof bestSellingProducts)[0]) => row.product?.category,
    },
    {
      header: "Units Sold",
      accessor: (row: (typeof bestSellingProducts)[0]) => (
        <span className="font-semibold">{row.quantity}</span>
      ),
    },
  ];

  const lowStockColumns = [
    { header: "Product", accessor: "name" as keyof Product },
    { header: "Brand", accessor: "brand" as keyof Product },
    { header: "Category", accessor: "category" as keyof Product },
    {
      header: "Current Stock",
      accessor: (row: Product) => (
        <Badge variant="danger">{row.stock_quantity}</Badge>
      ),
    },
    {
      header: "Min Stock",
      accessor: "min_stock" as keyof Product,
    },
    {
      header: "Needed",
      accessor: (row: Product) => (
        <span className="font-semibold text-red-600">
          {row.min_stock - row.stock_quantity}
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-6">
        Reports & Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Daily Revenue</p>
              <p className="text-2xl font-bold text-gray-800">
                $ {parseFloat(String(stats?.dailyRevenue || 0)).toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-800">
                ${parseFloat(String(stats?.monthlyRevenue || 0)).toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">
                {parseFloat(String(stats?.totalRevenue || 0)).toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Delivered Orders</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.deliveredOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card title="Revenue by Category">
          <div className="space-y-4">
            {categoryRevenue.map((item) => {
              const maxRevenue = Math.max(
                ...categoryRevenue.map((c) => c.revenue),
              );
              const percentage = (item.revenue / maxRevenue) * 100;

              return (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {item.category}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      ${item.revenue}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#3B82F6] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Payment Methods">
          <div className="space-y-4">
            {["CASH", "CARD", "TRANSFER"].map((method) => {
              const methodPayments = payments.filter(
                (p) => p.payment_method === method,
              );
              const amount = methodPayments.reduce(
                (sum, p) => sum + p.amount,
                0,
              );
              const count = methodPayments.length;
              const maxAmount = Math.max(
                ...["CASH", "CARD", "TRANSFER"].map((m) =>
                  payments
                    .filter((p) => p.payment_method === m)
                    .reduce((sum, p) => sum + p.amount, 0),
                ),
              );
              const percentage = maxAmount > 0 ? (amount / maxAmount) * 100 : 0;

              return (
                <div key={method}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {method} ({count} transactions)
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      ${amount}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="mb-6">
        <Card title="Best Selling Products">
          <Table data={bestSellingProducts} columns={bestSellingColumns} />
        </Card>
      </div>

      {lowStockProducts.length > 0 && (
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Low Stock Alert ({lowStockProducts.length} items)
            </h3>
          </div>
          <Table data={lowStockProducts} columns={lowStockColumns} />
        </Card>
      )}
    </div>
  );
}
