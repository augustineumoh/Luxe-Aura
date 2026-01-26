// app/login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import api from "./api/axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      // app/login.tsx - Update the API endpoint
const response = await api.post('http://127.0.0.1:8000/api/auth/login/', {
  username,
  password,
});
      
      // Store tokens
      localStorage.setItem('token', response.data.tokens.access);
      localStorage.setItem('refresh_token', response.data.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect to shop_all (not /shop)
      navigate('/shop_all');  // ✅ Fixed route
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#FFFFF0] via-rose-100 to-[#FFFFF0]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-rose-900 mb-6 text-center">Welcome Back</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition font-semibold disabled:bg-rose-400"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <Link 
  to="/forgotPassword" 
  className="text-sm text-rose-600 hover:text-rose-500"
>
  Forgot your password?
</Link>
        </form>
        
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-rose-600 hover:text-rose-800 font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;