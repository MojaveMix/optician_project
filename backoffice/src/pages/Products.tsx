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
import { GetMethod, PostMethod, PostMethodHead, PutMethod } from "../api/methods";

export default function Products() {
  const { deleteProduct } = useApp();
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
   img_path : "",
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
    const data =   await PostMethod("/products/create", formData);
    const formDataToSend = new FormData();
    if(data.id){
      formDataToSend.append('id' , data.id)
      Object.keys(formData).forEach((key) => {
          if (key === "img_path" &&  formData[key] instanceof File) {
            formDataToSend.append("image", formData[key]); // field name 'image' must match backend
          } else {
            formDataToSend.append(key, formData[key]);
          }
        });
    await PostMethodHead("/products/upload", formDataToSend,{
      headers: {
                "Content-Type": "multipart/form-data",
      },
    });
    fetchAllProducts();
    }

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
    const formDataToSend = new FormData();

    if(selectedProduct.id){
      formDataToSend.append('id' , selectedProduct.id)
      Object.keys(formData).forEach((key) => {
          if (key === "img_path" &&  formData[key] instanceof File) {
            formDataToSend.append("image", formData[key]); // field name 'image' must match backend
          } else {
            formDataToSend.append(key, formData[key]);
          }
        });
    await PostMethodHead("/products/upload", formDataToSend,{
      headers: {
                "Content-Type": "multipart/form-data",
      },
    });
    fetchAllProducts();
    }
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
      img_path : product.img_path ,
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
      img_path : "",
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
  { 
    header: "Image", 
    accessor: (row: Product) => (
      <div className="flex justify-center">
        <img
          src={row.img_path ? import.meta.env.VITE_URL_IMG + row.id : "/img/box.png"}
          alt={row.name}
          className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-all duration-200"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-image.jpg'; // Add a placeholder image path
          }}
        />
      </div>
    ) 
  },
  { 
    header: "Name", 
    accessor: "name" as keyof Product,
    cellClassName: "font-medium text-gray-900"
  },
  { 
    header: "Category", 
    accessor: "category" as keyof Product,
    responsive: {
      hideOnMobile: true // Optional: hide on mobile if needed
    }
  },
  { 
    header: "Brand", 
    accessor: "brand" as keyof Product,
    responsive: {
      hideOnMobile: true // Optional: hide on mobile if needed
    }
  },
  {
    header: "Stock",
    accessor: (row: Product) => {
      const isLow = row.stock_quantity <= row.min_stock;
      const isOutOfStock = row.stock_quantity === 0;
      
      return (
        <div className="flex items-center gap-2">
          <span className={`font-medium ${
            isOutOfStock ? 'text-red-600' : 
            isLow ? 'text-orange-600' : 
            'text-green-600'
          }`}>
            {row.stock_quantity}
          </span>
          {isLow && (
            <Badge 
              variant={isOutOfStock ? "danger" : "warning"}
              className="hidden sm:inline-flex"
            >
              <AlertTriangle className="w-3 h-3" />
              <span className="ml-1 hidden md:inline">
                {isOutOfStock ? 'Out of Stock' : 'Low Stock'}
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
      const price = parseFloat(row?.selling_price || '0');
      return (
        <div className="font-semibold text-gray-900">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
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
        <div className="grid grid-cols-2 gap-4">

          <div className="mb-4 col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            
            <div className="flex items-start gap-6">
              {/* Image Preview */}
              <div className="relative">
                {formData.img_path ? (
                  <div className="relative group">
                    <img
                      src={
                        typeof formData.img_path === "string"
                          ? formData.img_path
                          : URL.createObjectURL(formData.img_path)
                      }
                      alt="Product preview"
                      className="w-40 h-40 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, img_path: null })}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="w-40 h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">No image</span>
                  </div>
                )}
              </div>

              {/* Upload Area */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        // Optional: Validate file size (e.g., max 5MB)
                        if (file.size > 5 * 1024 * 1024) {
                          alert('File size should be less than 5MB');
                          return;
                        }
                        // Optional: Validate file type
                        if (!file.type.startsWith('image/')) {
                          alert('Please upload an image file');
                          return;
                        }
                        setFormData({ ...formData, img_path: file });
                      }
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Choose Image
                  </label>
                  
                  {/* File name display */}
                  {formData.img_path && typeof formData.img_path !== "string" && (
                    <div className="mt-2 text-sm text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {formData.img_path?.name}
                    </div>
                  )}
                  
                  {/* Helper text */}
                  <p className="mt-2 text-xs text-gray-500">
                    Supported formats: JPG, PNG, GIF, WebP (Max size: 5MB)
                  </p>
                </div>
              </div>
            </div>
          </div>
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
    <div className="mb-4 col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Product Image
      </label>
      
      <div className="flex items-start gap-6">
        {/* Image Preview - FIXED */}
        <div className="relative">
          {formData.img_path ? (
            <div className="relative group">
              <img
                src={
                  typeof formData.img_path === "string"
                    ? import.meta.env.VITE_URL_IMG+ selectedProduct?.id // For existing images (URL string)
                    : URL.createObjectURL(formData.img_path) // For new uploads (File object)
                }
                alt="Product preview"
                className="w-40 h-40 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                onLoad={(e) => {
                  // Clean up object URL after image loads (for new uploads)
                  if (typeof formData.img_path !== "string") {
                    URL.revokeObjectURL(e.currentTarget.src);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, img_path: null })}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="w-40 h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs">No image</span>
            </div>
          )}
        </div>

        {/* Upload Area */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              id="edit-image-upload" // Changed ID to avoid conflict with add modal
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                // Validate size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                  alert("File size must be less than 5MB");
                  e.target.value = ""; // reset input
                  return;
                }

                // Validate type
                if (!file.type.startsWith("image/")) {
                  alert("Please upload a valid image file");
                  e.target.value = ""; // reset input
                  return;
                }
                setFormData((prev) => ({
                  ...prev,
                  img_path: file, // File object
                }));
              }}
            />  

            <label
              htmlFor="edit-image-upload"
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Choose Image
            </label>
            
            {/* File name display - FIXED */}
            {formData.img_path && typeof formData.img_path !== "string" && (
              <div className="mt-2 text-sm text-gray-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {formData.img_path.name} {/* Fixed: was formData.img_path instead of formData.img_path.name */}
              </div>
            )}
            
            {/* Show current image filename if it's an existing image */}
            {formData.img_path && typeof formData.img_path === "string" && (
              <div className="mt-2 text-sm text-gray-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Current image
              </div>
            )}
            
            {/* Helper text */}
            <p className="mt-2 text-xs text-gray-500">
              Supported formats: JPG, PNG, GIF, WebP (Max size: 5MB)
            </p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Rest of your form fields... */}
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
