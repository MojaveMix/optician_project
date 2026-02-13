import { useState, useMemo, useCallback, useEffect } from "react";
import { Plus } from "lucide-react";
import { Prescription } from "../data/mockData";
import Card from "../components/Card";
import Button from "../components/Button";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";
import { GetMethod, PostMethod } from "../api/methods";
import { useApp } from "../context/AppContext";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const { customers } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: "",
    right_eye_sphere: 0,
    right_eye_cylinder: 0,
    right_eye_axis: 0,
    left_eye_sphere: 0,
    left_eye_cylinder: 0,
    left_eye_axis: 0,
    addition: 0,
    doctor_name: "",
    prescription_date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const fetchAllPrescriptions = useCallback(async () => {
    try {
      const data = await GetMethod("/prescriptions/all");
      setPrescriptions(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllPrescriptions();
  }, [fetchAllPrescriptions]);

  const handleAdd = async () => {
    if (!formData.customer_id) {
      return;
    }
    await PostMethod("/prescriptions/create", formData);
    fetchAllPrescriptions();
    setIsAddModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      customer_id: "",
      right_eye_sphere: 0,
      right_eye_cylinder: 0,
      right_eye_axis: 0,
      left_eye_sphere: 0,
      left_eye_cylinder: 0,
      left_eye_axis: 0,
      addition: 0,
      doctor_name: "",
      prescription_date: new Date().toISOString().split("T")[0],
      notes: "",
    });
  };

  const prescriptionsWithCustomer = useMemo(() => {
    return prescriptions.map((prescription) => {
      const customer = customers.find((c) => c.id === prescription.customer_id);
      return { ...prescription, customer };
    });
  }, [prescriptions, customers]);

  const columns = [
    {
      header: "Customer",
      accessor: (row: (typeof prescriptionsWithCustomer)[0]) =>
        row.customer?.full_name || "Unknown",
    },
    {
      header: "Doctor",
      accessor: "doctor_name" as keyof Prescription,
    },
    {
      header: "Date",
      accessor: (row: Prescription) =>
        new Date(row.prescription_date).toLocaleDateString(),
    },
    {
      header: "Right Eye",
      accessor: (row: Prescription) => (
        <div className="text-sm">
          <div>SPH: {row.right_eye_sphere}</div>
          <div>CYL: {row.right_eye_cylinder}</div>
          <div>AXIS: {row.right_eye_axis}</div>
        </div>
      ),
    },
    {
      header: "Left Eye",
      accessor: (row: Prescription) => (
        <div className="text-sm">
          <div>SPH: {row.left_eye_sphere}</div>
          <div>CYL: {row.left_eye_cylinder}</div>
          <div>AXIS: {row.left_eye_axis}</div>
        </div>
      ),
    },
    {
      header: "Addition",
      accessor: "addition" as keyof Prescription,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Prescriptions</h1>
        <Button className="flex  mt-6" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Prescription
        </Button>
      </div>

      <Card>
        <Table data={prescriptionsWithCustomer} columns={columns} />
      </Card>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
        }}
        title="Add New Prescription"
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Customer"
              value={formData.customer_id}
              onChange={(e) =>
                setFormData({ ...formData, customer_id: e.target.value })
              }
              options={[
                { value: "", label: "Select a customer" },
                ...customers.map((c) => ({
                  value: c.id,
                  label: c.full_name,
                })),
              ]}
            />
            <Input
              label="Doctor Name"
              value={formData.doctor_name}
              onChange={(e) =>
                setFormData({ ...formData, doctor_name: e.target.value })
              }
              placeholder="Dr. John Doe"
              required
            />
            <Input
              label="Prescription Date"
              type="date"
              value={formData.prescription_date}
              onChange={(e) =>
                setFormData({ ...formData, prescription_date: e.target.value })
              }
              required
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Right Eye
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Sphere (SPH)"
                type="number"
                step="0.25"
                value={formData.right_eye_sphere}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    right_eye_sphere: parseFloat(e.target.value),
                  })
                }
                required
              />
              <Input
                label="Cylinder (CYL)"
                type="number"
                step="0.25"
                value={formData.right_eye_cylinder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    right_eye_cylinder: parseFloat(e.target.value),
                  })
                }
                required
              />
              <Input
                label="Axis"
                type="number"
                min="0"
                max="180"
                value={formData.right_eye_axis}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    right_eye_axis: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Left Eye
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Sphere (SPH)"
                type="number"
                step="0.25"
                value={formData.left_eye_sphere}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    left_eye_sphere: parseFloat(e.target.value),
                  })
                }
                required
              />
              <Input
                label="Cylinder (CYL)"
                type="number"
                step="0.25"
                value={formData.left_eye_cylinder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    left_eye_cylinder: parseFloat(e.target.value),
                  })
                }
                required
              />
              <Input
                label="Axis"
                type="number"
                min="0"
                max="180"
                value={formData.left_eye_axis}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    left_eye_axis: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>

          <Input
            label="Addition (ADD)"
            type="number"
            step="0.25"
            value={formData.addition}
            onChange={(e) =>
              setFormData({ ...formData, addition: parseFloat(e.target.value) })
            }
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Additional notes..."
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleAdd}
            className="flex-1"
            disabled={!formData.customer_id}
          >
            Add Prescription
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
    </div>
  );
}
