import { useCallback, useEffect, useState } from "react";
import { Plus, Edit2, Trash2, AlertTriangle } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Product } from "../../data/mockData";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Badge from "../../components/Badge";
import { GetMethod } from "../../api/methods";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";

export default function Products() {
  const { deleteProduct } = useApp();
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    img_path: "",
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
    description: "",
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

  const handleDelete = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct.id);
      fetchAllProducts();
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      img_path: product.img_path,
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
      description: product.description,
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      img_path: "",
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
      description: "",
    });
  };

  const columns = [
    {
      header: "Image",
      accessor: (row: Product) => (
        <div className="flex justify-center">
          <img
            src={
              row.img_path
                ? import.meta.env.VITE_URL_IMG + row.id
                : "/img/box.png"
            }
            alt={row.name}
            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-all duration-200"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-image.jpg"; // Add a placeholder image path
            }}
          />
        </div>
      ),
    },
    {
      header: "Name",
      accessor: "name" as keyof Product,
      cellClassName: "font-medium text-gray-900",
    },
    {
      header: "Category",
      accessor: "category" as keyof Product,
      responsive: {
        hideOnMobile: true, // Optional: hide on mobile if needed
      },
    },
    {
      header: "Brand",
      accessor: "brand" as keyof Product,
      responsive: {
        hideOnMobile: true, // Optional: hide on mobile if needed
      },
    },
    {
      header: "Stock",
      accessor: (row: Product) => {
        const isLow = row.stock_quantity <= row.min_stock;
        const isOutOfStock = row.stock_quantity === 0;

        return (
          <div className="flex items-center gap-2">
            <span
              className={`font-medium ${
                isOutOfStock
                  ? "text-red-600"
                  : isLow
                    ? "text-orange-600"
                    : "text-green-600"
              }`}
            >
              {row.stock_quantity}
            </span>
            {isLow && (
              <Badge
                variant={isOutOfStock ? "danger" : "warning"}
                className="hidden sm:inline-flex"
              >
                <AlertTriangle className="w-3 h-3" />
                <span className="ml-1 hidden md:inline">
                  {isOutOfStock ? "Out of Stock" : "Low Stock"}
                </span>
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      header: "Price",
      accessor: (row: Product) => {
        const price = parseFloat(row?.selling_price || "0");
        return (
          <div className="font-semibold text-gray-900">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(price)}
          </div>
        );
      },
    },
    {
      header: "Actions",
      accessor: (row: Product) => (
        <div className="flex gap-1 md:gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              openEditModal(row);
            }}
            className="p-1.5 md:p-2 hover:bg-blue-50 transition-colors duration-200"
            aria-label="Edit product"
          >
            <Edit2 className="w-3 h-3 md:w-4 md:h-4" />
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
        <CreateProduct
          fetchAllProducts={fetchAllProducts}
          formData={formData}
          setIsAddModalOpen={setIsAddModalOpen}
          isAddModalOpen={isAddModalOpen}
          setFormData={setFormData}
        />
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
        {selectedProduct && (
          <EditProduct
            fetchAllProducts={fetchAllProducts}
            formData={formData}
            selectedProduct={selectedProduct}
            setFormData={setFormData}
            setIsEditModalOpen={setIsEditModalOpen}
            setSelectedProduct={setSelectedProduct}
          />
        )}
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
