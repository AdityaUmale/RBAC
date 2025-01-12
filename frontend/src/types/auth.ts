export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
  }