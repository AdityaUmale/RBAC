import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import BlogsPage from './components/BlogsPage';
import AdminDashboard from './components/AdminDashboard';


function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path='/admindashboard' element={<AdminDashboard />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      {/* Other routes will be added later */}
    </Routes>
    </AuthProvider>
  );
}

export default App;
