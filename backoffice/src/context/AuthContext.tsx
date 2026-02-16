import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { User } from "../data/mockData";
import { GetMethod, PostMethod } from "../api/methods";
import { decodeUserToken, isTokenExpired } from "../utils/DecodeTokenJwt";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem("userToken");

  const isAuthenticated = token ? !isTokenExpired(token) : false;
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await PostMethod("/auth/login", {
        email,
        password,
      });

      if (data?.token) {
        localStorage.setItem("userToken", data?.token);
        setUser(data?.user);
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const fetchUserById = useCallback(async () => {
    try {
      if (!isTokenExpired(token)) {
        const decodedToken = decodeUserToken(token) as any;
        if (decodedToken?.id) {
          const data = await GetMethod(`/user/${decodedToken?.id}`);
          setUser(data);
          console.log(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchUserById();
  }, [fetchUserById]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
