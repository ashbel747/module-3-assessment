import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import loginImage from '../assets/login-image.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Trying to log in with:", email, password);
      const res = await fetch('http://localhost:3500/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.accessToken);

      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.message);
      alert('Invalid email or password');
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800'>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-6xl flex flex-col md:flex-row">
            {/* Login Form */}
            <div className='flex-1 pr-8'>
                <h2 className='text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white relative'>
                    LOGIN
                </h2>
                <h4 className='text-2xl font-bold mt-4 text-center text-gray-800 dark:text-white'>
                    Welcome Back! Please Enter your Details.
                </h4>
                <form onSubmit={handleLogin}>
                    <div className='mb-4'>
                        <label className='block text-gray-600 dark:text-gray-100 text-sm font-bold mb-2'>
                            Email
                        </label>
                        <input 
                            placeholder='name@gmail.com'
                            type="email" 
                            className='border-none rounded w-full py-3 px-6 text-gray-600 bg-gray-200 dark:bg-gray-50'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-600 dark:text-gray-100 text-sm font bold mb-2'>
                            Password
                        </label>
                        <input 
                            placeholder='Password'
                            type='password'
                            className='border-none rounded w-full py-3 px-6 text-gray-600 bg-gray-200 dark:bg-gray-50'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        className='bg-blue-800 hover:bg-blue-400 active:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded'
                    >
                        LOGIN
                    </button>

                    <div className='mt-4 text-left'>
                        <Link to="/reset-password" className="text-sm text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </div>

            {/* Login Image */}
            <div 
                className='flex-1 bg-cover bg-center bg-no-repeat rounded'
                style={{ backgroundImage: `url(${loginImage})`, minHeight: '400px'}}
            ></div>
        </div>
    </div>
  );
};

export default Login;
