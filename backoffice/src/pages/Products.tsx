import { useCallback, useEffect, useState } from "react";
import { Plus, Edit2, Trash2, AlertTriangle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Product } from "../data/mockData";
import Card from "../components/Card";
import Button from "../components/Button";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Select from "../components/Select";
import Badge from "../components/Badge";
import { GetMethod, PostMethod, PutMethod } from "../api/methods";

export default function Products() {
  const { deleteProduct } = useApp();
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    shop_id: "1",
    name: "",
    category: "FRAME" as Product["category"],
    brand: "",
    model: "",
    color: "",
    size: "",
    barcode: "",
    purchase_price: 0,
    selling_price: 0,
    stock_quantity: 0,
    min_stock: 0,
  });

  const fetchAllProducts = useCallback(async () => {
    try {
      const data = await GetMethod("/products/all");
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const handleAdd = async () => {
    try {
      // addProduct(formData);
      await PostMethod("/products/create", formData);
      fetchAllProducts();

      setIsAddModalOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async () => {
    if (selectedProduct) {
      await PutMethod("/products/update", {
        id: selectedProduct.id,
        ...formData,
      });
      fetchAllProducts();
      setIsEditModalOpen(false);
      setSelectedProduct(null);
      resetForm();
    }
  };

  const handleDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id);
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      shop_id: product.shop_id,
      name: product.name,
      category: product.category,
      brand: product.brand,
      model: product.model,
      color: product.color,
      size: product.size,
      barcode: product.barcode,
      purchase_price: product.purchase_price,
      selling_price: product.selling_price,
      stock_quantity: product.stock_quantity,
      min_stock: product.min_stock,
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      shop_id: "1",
      name: "",
      category: "FRAME",
      brand: "",
      model: "",
      color: "",
      size: "",
      barcode: "",
      purchase_price: 0,
      selling_price: 0,
      stock_quantity: 0,
      min_stock: 0,
    });
  };

  const columns = [
    { header: "Name", accessor: "name" as keyof Product },
    { header: "Category", accessor: "category" as keyof Product },
    { header: "Brand", accessor: "brand" as keyof Product },
    {
      header: "Stock",
      accessor: (row: Product) => {
        const isLow = row.stock_quantity <= row.min_stock;
        return (
          <div className="flex items-center gap-2">
            <span>{row.stock_quantity}</span>
            {isLow && (
              <Badge variant="danger">
                <AlertTriangle className="w-3 h-3" />
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      header: "Price",
      accessor: (row: Product) => `${row?.selling_price}`,
    },
    {
      header: "Actions",
      accessor: (row: Product) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              openEditModal(row);
            }}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={(e) => {
              e.stopPropagation();
              openDeleteModal(row);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl  font-bold text-gray-800">Products</h1>
        <Button className="flex mt-6" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Button>
      </div>

      <Card>
        <Table data={products} columns={columns} />
      </Card>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
        }}
        title="Add New Product"
        size="lg"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value as Product["category"],
              })
            }
            options={[
              { value: "FRAME", label: "Frame" },
              { value: "LENS", label: "Lens" },
              { value: "SUNGLASSES", label: "Sunglasses" },
              { value: "ACCESSORY", label: "Accessory" },
            ]}
          />
          <Input
            label="Brand"
            value={formData.brand}
            onChange={(e) =>
              setFormData({ ...formData, brand: e.target.value })
            }
            required
          />
          <Input
            label="Model"
            value={formData.model}
            onChange={(e) =>
              setFormData({ ...formData, model: e.target.value })
            }
            required
          />
          <Input
            label="Color"
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            required
          />
          <Input
            label="Size"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            required
          />
          <Input
            label="Barcode"
            value={formData.barcode}
            onChange={(e) =>
              setFormData({ ...formData, barcode: e.target.value })
            }
            required
          />
          <Input
            label="Purchase Price"
            type="number"
            step="0.01"
            value={formData.purchase_price}
            onChange={(e) =>
              setFormData({
                ...formData,
                purchase_price: parseFloat(e.target.value),
              })
            }
            required
          />
          <Input
            label="Selling Price"
            type="number"
            step="0.01"
            value={formData.selling_price}
            onChange={(e) =>
              setFormData({
                ...formData,
                selling_price: parseFloat(e.target.value),
              })
            }
            required
          />
          <Input
            label="Stock Quantity"
            type="number"
            value={formData.stock_quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                stock_quantity: parseInt(e.target.value),
              })
            }
            required
          />
          <Input
            label="Minimum Stock"
            type="number"
            value={formData.min_stock}
            onChange={(e) =>
              setFormData({ ...formData, min_stock: parseInt(e.target.value) })
            }
            required
          />
        </div>
        <div className="flex gap-3 mt-6">
          <Button onClick={handleAdd} className="flex-1">
            Add Product
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
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
          resetForm();
        }}
        title="Edit Product"
        size="lg"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value as Product["category"],
              })
            }
            options={[
              { value: "FRAME", label: "Frame" },
              { value: "LENS", label: "Lens" },
              { value: "SUNGLASSES", label: "Sunglasses" },
              { value: "ACCESSORY", label: "Accessory" },
            ]}
          />
          <Input
            label="Brand"
            value={formData.brand}
            onChange={(e) =>
              setFormData({ ...formData, brand: e.target.value })
            }
            required
          />
          <Input
            label="Model"
            value={formData.model}
            onChange={(e) =>
              setFormData({ ...formData, model: e.target.value })
            }
            required
          />
          <Input
            label="Color"
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            required
          />
          <Input
            label="Size"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            required
          />
          <Input
            label="Barcode"
            value={formData.barcode}
            onChange={(e) =>
              setFormData({ ...formData, barcode: e.target.value })
            }
            required
          />
          <Input
            label="Purchase Price"
            type="number"
            step="0.01"
            value={formData.purchase_price}
            onChange={(e) =>
              setFormData({
                ...formData,
                purchase_price: parseFloat(e.target.value),
              })
            }
            required
          />
          <Input
            label="Selling Price"
            type="number"
            step="0.01"
            value={formData.selling_price}
            onChange={(e) =>
              setFormData({
                ...formData,
                selling_price: parseFloat(e.target.value),
              })
            }
            required
          />
          <Input
            label="Stock Quantity"
            type="number"
            value={formData.stock_quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                stock_quantity: parseInt(e.target.value),
              })
            }
            required
          />
          <Input
            label="Minimum Stock"
            type="number"
            value={formData.min_stock}
            onChange={(e) =>
              setFormData({ ...formData, min_stock: parseInt(e.target.value) })
            }
            required
          />
        </div>
        <div className="flex gap-3 mt-6">
          <Button onClick={handleEdit} className="flex-1">
            Save Changes
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setIsEditModalOpen(false);
              setSelectedProduct(null);
              resetForm();
            }}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        title="Delete Product"
      >
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete {selectedProduct?.name}? This action
          cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="danger" onClick={handleDelete} className="flex-1">
            Delete
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setIsDeleteModalOpen(false);
              setSelectedProduct(null);
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
