import Select from "../../components/Select";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import { PostMethodHead, PutMethod } from "../../api/methods";

interface Product {
  id: string | number;
  category: "FRAME" | "LENS" | "SUNGLASSES" | "ACCESSORY";
}

interface CreateProductProps {
  formData: {
    name: string;
    category: string;
    brand: string;
    model: string;
    color: string;
    size: string;
    barcode: string;
    purchase_price: number;
    selling_price: number;
    stock_quantity: number;
    min_stock: number;
    description: string;
    img_path: string | File | null;
  };
  setFormData: (formData: any) => void;

  setIsEditModalOpen: (isOpen: boolean) => void;
  fetchAllProducts: () => void;
  selectedProduct: Product;
  setSelectedProduct: (selectedProduct: any) => void;
}

const EditProduct = ({
  setIsEditModalOpen,
  setFormData,
  formData,
  fetchAllProducts,
  selectedProduct,
  setSelectedProduct,
}: CreateProductProps) => {
  const resetForm = () => {
    setFormData({
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
      img_path: null,
    });
  };

  const handleEdit = async () => {
    if (selectedProduct) {
      await PutMethod("/products/update", {
        id: selectedProduct?.id,
        ...formData,
      });
      const formDataToSend = new FormData();

      if (selectedProduct.id) {
        formDataToSend.append("id", String(selectedProduct.id));
        Object.keys(formData).forEach((key) => {
          if (key === "img_path" && formData[key] instanceof File) {
            formDataToSend.append("image", formData[key]); // field name 'image' must match backend
          } else {
            formDataToSend.append(key, formData[key]);
          }
        });
        await PostMethodHead("/products/upload", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      await fetchAllProducts();
      setIsEditModalOpen(false);
      setSelectedProduct(null);
      resetForm();
    }
  };
  return (
    <>
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
                        ? import.meta.env.VITE_URL_IMG + selectedProduct?.id // For existing images (URL string)
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
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

                    // Validate size (max 10MB)
                    if (file.size > 10 * 1024 * 1024) {
                      alert("File size must be less than 10MB");
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Choose Image
                </label>

                {/* File name display - FIXED */}
                {formData.img_path && typeof formData.img_path !== "string" && (
                  <div className="mt-2 text-sm text-gray-600 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {formData.img_path?.name}{" "}
                    {/* Fixed: was formData.img_path instead of formData.img_path.name */}
                  </div>
                )}

                {/* Show current image filename if it's an existing image */}
                {formData.img_path && typeof formData.img_path === "string" && (
                  <div className="mt-2 text-sm text-gray-600 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Current image
                  </div>
                )}

                {/* Helper text */}
                <p className="mt-2 text-xs text-gray-500">
                  Supported formats: JPG, PNG, GIF, WebP (Max size: 10MB)
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
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          required
        />
        <Input
          label="Model"
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          required
        />
        <Input
          label="Color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
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

        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
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

export default EditProduct;
