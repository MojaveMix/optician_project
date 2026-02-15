import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { GetMethod } from "../data/methodes";


// Create the context with undefined initially for proper checks
const DataContext = createContext({})

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppContextProvider");
  }
  return context;
};

// Context Provider component
const AppContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Fetch products from API
  const fetchAllProducts = useCallback(async () => {
    try {
      const data = await GetMethod("/products/all");
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, []);

  // Fetch products on mount
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const value = {
    products,
    fetchAllProducts,
  };

  return <DataContext.Provider value={value}>
        {children || null}

  </DataContext.Provider>;
};

export default AppContextProvider;
