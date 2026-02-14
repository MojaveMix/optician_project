import { useState, useMemo } from "react";
import { Plus, ShoppingCart, Trash2, DollarSign } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Order } from "../data/mockData";
import Card from "../components/Card";
import Button from "../components/Button";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Select from "../components/Select";
import Badge from "../components/Badge";
import { PostMethod, PutMethod } from "../api/methods";

interface CartItem {
  product_id: string;
  quantity: number;
  price: number;
}

export default function Orders() {
  const {
    orders,
    customers,
    products,
    orderItems,
    updateOrderStatus,
    addPayment,
    fetchAllOrders,
  } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [customerId, setCustomerId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<
    "CASH" | "CARD" | "TRANSFER"
  >("CASH");

  const addToCart = async () => {
    if (!selectedProductId) return;
    const product = products.find(
      (p) => parseInt(p.id) === parseInt(selectedProductId),
    );
    console.log(products);
    if (!product) return;

    const existingItem = cart.find(
      (item) => item.product_id === selectedProductId,
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product_id === selectedProductId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          product_id: selectedProductId,
          quantity,
          price: product.selling_price,
        },
      ]);
    }

    setSelectedProductId("");
    setQuantity(1);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product_id !== productId));
  };

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const handleCreateOrder = async () => {
    if (!customerId || cart.length === 0) return;
    const data = await PostMethod("/orders/create", {
      customer_id: customerId,
      total_price: totalAmount,
      status: "PENDING",
    });

    const product = products.find(
      (p) => parseInt(p.id) === parseInt(selectedProductId),
    );

    if (data.id && product && product.selling_price) {
      await PostMethod("/orders/items/create", {
        product_id: selectedProductId,
        quantity,
        price: (product && product.selling_price) || null,
        order_id: data.id,
      });
    }
    fetchAllOrders();
    // addOrder(
    //   {
    //     shop_id: "1",
    //     customer_id: customerId,
    //     total_price: totalAmount,
    //     status: "PENDING",
    //   },
    //   cart,
    // );

    setIsCreateModalOpen(false);
    setCustomerId("");
    setCart([]);
  };

  const handleStatusChange = async (
    orderId: string,
    status: Order["status"],
  ) => {
    // updateOrderStatus(orderId, status);
    await PutMethod("/orders/update", {
      id: orderId,
      status,
    });
    fetchAllOrders();
  };

  const handlePayment = async() => {
    if (!selectedOrder) return;

    addPayment({
      order_id: selectedOrder.id,
      amount: selectedOrder.total_price,
      payment_method: paymentMethod,
      payment_date: new Date().toISOString(),
    });
      
  //  const data = await PostMethod('/payments/create' , {
  //     order_id: selectedOrder.id,
  //     amount: selectedOrder.total_price,
  //     payment_method: paymentMethod,
  //   })
   
  // if(data){
  //   await handleStatusChange(selectedOrder.id , "DELIVERED")
  // }
  if (selectedOrder.status === "PENDING") {
      console.log("ENTRED")
       await handleStatusChange(selectedOrder.id, "READY");

    }

    setIsPaymentModalOpen(false);
    setSelectedOrder(null);
    setPaymentMethod("CASH");
  };

  const ordersWithDetails = useMemo(() => {
    return orders.map((order) => {
      const customer = customers.find((c) => c.id === order.customer_id);
      const items =
        orderItems &&
        orderItems.filter((item) => Number(item.order_id) === Number(order.id));
      return { ...order, customer, items };
    });
  }, [orders, customers, orderItems]);

  const columns = [
    {
      header: "Order ID",
      accessor: (row: (typeof ordersWithDetails)[0]) => `#${row.id}`,
    },
    {
      header: "Customer",
      accessor: (row: (typeof ordersWithDetails)[0]) =>
        row.customer?.full_name || "Unknown",
    },
    {
      header: "Total",
      accessor: (row: Order) => `$${row.total_price}`,
    },
    {
      header: "Status",
      accessor: (row: Order) => {
        const statusVariant =
          row.status === "DELIVERED"
            ? "success"
            : row.status === "READY"
              ? "info"
              : row.status === "CANCELED"
                ? "danger"
                : "warning";
        return <Badge variant={statusVariant}>{row.status}</Badge>;
      },
    },
    {
      header: "Date",
      accessor: (row: Order) => new Date(row.created_at).toLocaleDateString(),
    },
    {
      header: "Actions",
      accessor: (row: Order) => (
        <div className="flex gap-2">
          {row.status === "PENDING" && (
            <>
              <Button
                size="sm"
                variant="success"
                onClick={() => handleStatusChange(row.id, "READY")}
              >
                Mark Ready
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setSelectedOrder(row);
                  setIsPaymentModalOpen(true);
                }}
              >
                <DollarSign className="w-4 h-4" />
              </Button>
            </>
          )}
          {row.status === "READY" && (
            <Button
              size="sm"
              variant="success"
              onClick={() => handleStatusChange(row.id, "DELIVERED")}
            >
              Mark Delivered
            </Button>
          )}
          {(row.status === "PENDING" || row.status === "READY") && (
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleStatusChange(row.id, "CANCELED")}
            >
              Cancel
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <Button
          className="flex items-center mt-6"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Order
        </Button>
      </div>

      <Card>
        <Table data={ordersWithDetails} columns={columns} />
      </Card>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setCustomerId("");
          setCart([]);
        }}
        title="Create New Order"
        size="xl"
      >
        <div className="space-y-6">
          <Select
            label="Customer"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            options={[
              { value: "", label: "Select a customer" },
              ...customers.map((c) => ({
                value: c.id,
                label: c.full_name,
              })),
            ]}
          />

          <div>
            <h3 className="text-lg font-semibold mb-3">Add Products</h3>
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <Select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  options={[
                    { value: "", label: "Select a product" },
                    ...products.map((p) => ({
                      value: p.id,
                      label: `${p.name} - $${p.selling_price} (Stock: ${p.stock_quantity})`,
                    })),
                  ]}
                />
              </div>
              <div className="w-24">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button onClick={addToCart} disabled={!selectedProductId}>
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Product
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Price
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Total
                    </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        Cart is empty
                      </td>
                    </tr>
                  ) : (
                    cart.map((item) => {
                      const product = products.find(
                        (p) => Number(p.id) === Number(item.product_id),
                      );
                      return (
                        <tr key={item.product_id} className="border-t">
                          <td className="px-4 py-3 text-sm">{product?.name}</td>
                          <td className="px-4 py-3 text-sm">${item.price}</td>
                          <td className="px-4 py-3 text-sm">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm font-medium">
                            ${item.price * item.quantity}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => removeFromCart(item.product_id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-lg font-semibold">Total Amount:</span>
            <span className="text-2xl font-bold text-[#1E3A8A]">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleCreateOrder}
            className="flex-1"
            disabled={!customerId || cart.length === 0}
          >
            Create Order
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setIsCreateModalOpen(false);
              setCustomerId("");
              setCart([]);
            }}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false);
          setSelectedOrder(null);
          setPaymentMethod("CASH");
        }}
        title="Process Payment"
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Order ID</p>
              <p className="font-semibold">#{selectedOrder.id}</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Amount to Pay</p>
              <p className="text-2xl font-bold text-[#1E3A8A]">
                ${selectedOrder.total_price}
              </p>
            </div>

            <Select
              label="Payment Method"
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value as "CASH" | "CARD" | "TRANSFER")
              }
              options={[
                { value: "CASH", label: "Cash" },
                { value: "CARD", label: "Card" },
                { value: "TRANSFER", label: "Bank Transfer" },
              ]}
            />

            <div className="flex gap-3">
              <Button onClick={handlePayment} className="flex-1">
                Process Payment
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  setSelectedOrder(null);
                  setPaymentMethod("CASH");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
