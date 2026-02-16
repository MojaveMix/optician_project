import { useState, useMemo, useCallback, useEffect } from "react";
import { Plus, Eye, Mail, Phone, MapPin, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Customer } from "../data/mockData";
import Card from "../components/Card";
import Button from "../components/Button";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Badge from "../components/Badge";
import { GetMethod, PostMethod, PutMethod } from "../api/methods";

export default function Customers() {
  const { prescriptions, orders } = useApp();
  const [customers, setCustomers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    shop_id: "1",
    full_name: "",
    phone: "",
    email: "",
    address: "",
    birth_date: "",
  });

  const openDeleteModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const fetchAllCustomers = useCallback(async () => {
    try {
      const data = await GetMethod("/customers/all");
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDelete = async () => {
    if (selectedCustomer) {
      await PutMethod("/customers/delete", {
        id: selectedCustomer?.id,
      });
      fetchAllCustomers();
      setIsDeleteModalOpen(false);
      setSelectedCustomer(null);
    }
  };
  const handleAdd = async () => {
    await PostMethod("/customers/create", formData);
    fetchAllCustomers();
    setIsAddModalOpen(false);
    resetForm();
  };

  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers]);

  const openViewModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      shop_id: "1",
      full_name: "",
      phone: "",
      email: "",
      address: "",
      birth_date: "",
    });
  };

  const customerPrescriptions = useMemo(() => {
    if (!selectedCustomer) return [];
    return prescriptions.filter((p) => p.customer_id === selectedCustomer.id);
  }, [selectedCustomer, prescriptions]);

  const customerOrders = useMemo(() => {
    if (!selectedCustomer) return [];
    return orders.filter((o) => o.customer_id === selectedCustomer.id);
  }, [selectedCustomer, orders]);

  const columns = [
    { header: "Name", accessor: "full_name" as keyof Customer },
    {
      header: "Contact",
      accessor: (row: Customer) => (
        <div>
          <div className="flex items-center gap-1 text-sm">
            <Phone className="w-3 h-3" />
            {row.phone}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Mail className="w-3 h-3" />
            {row.email}
          </div>
        </div>
      ),
    },
    {
      header: "Birth Date",
      accessor: (row: Customer) =>
        new Date(row.birth_date).toLocaleDateString(),
    },
    {
      header: "Actions",
      accessor: (row: Customer) => (
        <div className="flex items-center gap-3 ">
          <Button
            size="sm"
            className="flex items-center"
            onClick={() => openViewModal(row)}
          >
            <Eye className="w-4 h-4 mr-1" />
            View Profile
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={(e) => {
              e.stopPropagation();
              openDeleteModal(row);
            }}
            className="p-1.5 md:p-2 hover:bg-red-50 transition-colors duration-200"
            aria-label="Delete product"
          >
            <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
        <Button className="flex mt-6" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Customer
        </Button>
      </div>

      <Card>
        <Table data={customers} columns={columns} />
      </Card>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
        }}
        title="Add New Customer"
        size="lg"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
            required
          />
          <Input
            label="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <Input
            label="Birth Date"
            type="date"
            value={formData.birth_date}
            onChange={(e) =>
              setFormData({ ...formData, birth_date: e.target.value })
            }
            required
          />

          <div className="col-span-2">
            <Input
              label="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button onClick={handleAdd} className="flex-1">
            Add Customer
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setIsAddModalOpen(false);
              resetForm();
            }}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedCustomer(null);
        }}
        title="Customer Profile"
        size="xl"
      >
        {selectedCustomer && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">
                {selectedCustomer.full_name}
              </h2>
              <div className="space-y-1 text-blue-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {selectedCustomer.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {selectedCustomer.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {selectedCustomer.address}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Birth Date</p>
                <p className="font-medium">
                  {new Date(selectedCustomer.birth_date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">
                Prescription History ({customerPrescriptions.length})
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {customerPrescriptions.length > 0 ? (
                  customerPrescriptions.map((prescription) => (
                    <div
                      key={prescription.id}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex justify-between mb-2">
                        <p className="font-medium">
                          Dr. {prescription.doctor_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(
                            prescription.prescription_date,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Right Eye</p>
                          <p>SPH: {prescription.right_eye_sphere}</p>
                          <p>CYL: {prescription.right_eye_cylinder}</p>
                          <p>AXIS: {prescription.right_eye_axis}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Left Eye</p>
                          <p>SPH: {prescription.left_eye_sphere}</p>
                          <p>CYL: {prescription.left_eye_cylinder}</p>
                          <p>AXIS: {prescription.left_eye_axis}</p>
                        </div>
                      </div>
                      {prescription.notes && (
                        <p className="mt-2 text-sm text-gray-600 italic">
                          {prescription.notes}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No prescriptions found
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">
                Order History ({customerOrders.length})
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {customerOrders.length > 0 ? (
                  customerOrders.map((order) => {
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
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            ${order.total_price}
                          </p>
                          <Badge variant={statusVariant}>{order.status}</Badge>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No orders found
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCustomer(null);
        }}
        title="Delete Product"
      >
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete {selectedCustomer?.full_name}? This
          action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="danger" onClick={handleDelete} className="flex-1">
            Delete
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setIsDeleteModalOpen(false);
              setSelectedCustomer(null);
            }}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
