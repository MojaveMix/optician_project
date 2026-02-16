import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import {
  Product,
  Customer,
  Prescription,
  Order,
  OrderItem,
  Payment,
  products as initialProducts,
  customers as initialCustomers,
  prescriptions as initialPrescriptions,
  orders as initialOrders,
  orderItems as initialOrderItems,
  payments as initialPayments,
} from "../data/mockData";
import { ToastType } from "../components/Toast";
import { GetMethod, PutMethod } from "../api/methods";
import { useAuth } from "./AuthContext";

interface ToastState {
  message: string;
  type: ToastType;
}

interface AppContextType {
  products: Product[];
  customers: Customer[];
  prescriptions: Prescription[];
  orders: Order[];
  orderItems: OrderItem[];
  payments: Payment[];
  toast: ToastState | null;
  addProduct: (product: Omit<Product, "id" | "created_at">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCustomer: (customer: Omit<Customer, "id" | "created_at">) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  addPrescription: (
    prescription: Omit<Prescription, "id" | "created_at">,
  ) => void;
  addOrder: (
    order: Omit<Order, "id" | "created_at">,
    items: Omit<OrderItem, "id" | "order_id">[],
  ) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  addPayment: (payment: Omit<Payment, "id">) => void;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
  fetchAllOrders: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [prescriptions, setPrescriptions] =
    useState<Prescription[]>(initialPrescriptions);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [orderItems, setOrderItems] = useState<OrderItem[]>(initialOrderItems);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [toast, setToast] = useState<ToastState | null>(null);

  const fetchAllOrdersItems = useCallback(async () => {
    try {
      if (isAuthenticated) {
        const data = await GetMethod("/orders/items/all");
        setOrderItems(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllOrdersItems();
  }, [fetchAllOrdersItems]);

  const fetchAllCustomers = useCallback(async () => {
    try {
      if (isAuthenticated) {
        const data = await GetMethod("/customers/all");
        setCustomers(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers]);

  const fetchAllOrders = useCallback(async () => {
    try {
      if (isAuthenticated) {
        const data = await GetMethod("/orders/all");
        setOrders(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  const fetchAllProducts = useCallback(async () => {
    try {
      if (isAuthenticated) {
        const data = await GetMethod("/products/all");
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const fetchAllPayments = useCallback(async () => {
    try {
      if (isAuthenticated) {
        const data = await GetMethod("/payments/all");
        setPayments(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllPayments();
  }, [fetchAllPayments]);

  const addProduct = (product: Omit<Product, "id" | "created_at">) => {
    const newProduct: Product = {
      ...product,
      id: String(Date.now()),
      created_at: new Date().toISOString(),
    };
    setProducts([...products, newProduct]);
    showToast("Product added successfully", "success");
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    showToast("Product updated successfully", "success");
  };

  const deleteProduct = async (id: string) => {
    await PutMethod("/products/delete", {
      id,
    });
    // setProducts(products.filter((p) => p.id !== id));
    showToast("Product deleted successfully", "success");
  };

  const addCustomer = (customer: Omit<Customer, "id" | "created_at">) => {
    const newCustomer: Customer = {
      ...customer,
      id: String(Date.now()),
      created_at: new Date().toISOString(),
    };
    setCustomers([...customers, newCustomer]);
    showToast("Customer added successfully", "success");
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(
      customers.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
    showToast("Customer updated successfully", "success");
  };

  const addPrescription = (
    prescription: Omit<Prescription, "id" | "created_at">,
  ) => {
    const newPrescription: Prescription = {
      ...prescription,
      id: String(Date.now()),
      created_at: new Date().toISOString(),
    };
    setPrescriptions([...prescriptions, newPrescription]);
    showToast("Prescription added successfully", "success");
  };

  const addOrder = (
    order: Omit<Order, "id" | "created_at">,
    items: Omit<OrderItem, "id" | "order_id">[],
  ) => {
    const orderId = String(Date.now());
    const newOrder: Order = {
      ...order,
      id: orderId,
      created_at: new Date().toISOString(),
    };
    const newOrderItems: OrderItem[] = items.map((item, index) => ({
      ...item,
      id: `${orderId}-${index}`,
      order_id: orderId,
    }));

    setOrders([...orders, newOrder]);
    setOrderItems([...orderItems, ...newOrderItems]);

    items.forEach((item) => {
      updateProduct(item.product_id, {
        stock_quantity:
          products.find((p) => p.id === item.product_id)!.stock_quantity -
          item.quantity,
      });
    });

    showToast("Order created successfully", "success");
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
    showToast("Order status updated successfully", "success");
  };

  const addPayment = (payment: Omit<Payment, "id">) => {
    const newPayment: Payment = {
      ...payment,
      id: String(Date.now()),
    };
    setPayments([...payments, newPayment]);
    showToast("Payment recorded successfully", "success");
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        customers,
        prescriptions,
        orders,
        orderItems,
        payments,
        toast,
        addProduct,
        updateProduct,
        deleteProduct,
        addCustomer,
        updateCustomer,
        addPrescription,
        addOrder,
        updateOrderStatus,
        addPayment,
        showToast,
        hideToast,
        fetchAllOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
