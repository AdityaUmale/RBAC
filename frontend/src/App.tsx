import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import BlogsPage from './components/BlogsPage';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import UnauthorizedPage from './components/UnauthorizedPage';


function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
      <Route path='/admindashboard' element={<AdminDashboard />} />
      </Route>
      <Route path='unauthorized' element={<UnauthorizedPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
    </AuthProvider>
  );
}

export default App;
