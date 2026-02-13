import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUsers = [
      {
        id: '1',
        shop_id: '1',
        full_name: 'John Anderson',
        email: 'admin@visionplus.com',
        password: 'admin123',
        role: 'ADMIN' as const,
        phone: '+1-555-0102',
        is_active: true,
        created_at: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        shop_id: '1',
        full_name: 'Sarah Miller',
        email: 'sarah@visionplus.com',
        password: 'seller123',
        role: 'SELLER' as const,
        phone: '+1-555-0103',
        is_active: true,
        created_at: '2024-01-20T10:00:00Z',
      },
    ];

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete (userWithoutPassword as { password?: string }).password;
      setUser(userWithoutPassword as User);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
