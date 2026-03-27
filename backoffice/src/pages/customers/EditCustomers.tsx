import { useEffect } from "react";
import { PutMethod } from "../../api/methods";
import Button from "../../components/Button";
import Input from "../../components/Input";

interface CreateCustomersProps {
  formData: {
    id: string;
    full_name: string;
    phone: string;
    email: string;
    birth_date: string;
    address: string;
  };
  setFormData: (data: CreateCustomersProps["formData"]) => void;
  setIsUpdateModalOpen: (open: boolean) => void;
  fetchAllCustomers: () => void;
}

const EditCustomers = ({
  formData,
  setFormData,
  fetchAllCustomers,
  setIsUpdateModalOpen,
}: CreateCustomersProps) => {
  const resetForm = () => {
    setFormData({
      id: "",
      full_name: "",
      phone: "",
      email: "",
      birth_date: "",
      address: "",
    });
  };

  const handleEdit = async () => {
    await PutMethod("/customers/update", formData);
    fetchAllCustomers();
    setIsUpdateModalOpen(false);
    resetForm();
  };

  useEffect(() => {
    if (formData) {
      setFormData({
        ...formData,
        birth_date: formData.birth_date?.slice(0, 10) || "",
      });
    }
  }, [formData]);
  return (
    <>
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
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          label="Birth Date"
          type="date"
          value={formData.birth_date || ""}
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
        <Button onClick={handleEdit} className="flex-1">
          Update Customer
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setIsUpdateModalOpen(false);
            resetForm();
          }}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default EditCustomers;
