import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({}); 

  const navigate = useNavigate();         
  const { login } = useAuth();             

  const validateForm = () => {
    const errors = {};

    if (!username.trim()) {
      errors.username = 'Username is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    return errors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors); 
      return;
    }

    setFormErrors({});

    try {
      const res = await fetch('https://module-3-assessment.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      if (data.token) {
        login(data.token);           
        navigate('/dashboard');       
      } else {
        alert("Signup successful! Please log in.");
        navigate('/login');         
      }
    } catch (err) {
      console.error('Signup error:', err.message);
      alert(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-gray-900  px-4 py-6 sm:px-6 md:px-8">
      <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 w-full sm:max-w-md md:max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Create Your Account
        </h2>
        <p className='py-2 mb-4 text-gray-800 dark:text-white font-bold'>
          "Join our inclusive community and start sharing your voice."
        </p>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-100 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              className="border-none rounded w-full py-2 px-3 text-gray-600 bg-gray-200 dark:bg-gray-50"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {formErrors.username && (
              <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-100 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="border-none rounded w-full py-2 px-3 text-gray-600 bg-gray-200 dark:bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 dark:text-gray-100 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="border-none rounded w-full py-2 px-3 text-gray-600 bg-gray-200 dark:bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
            <p className="mt-4 text-left text-sm text-gray-600 dark:text-gray-100">
              Be at least 8 characters <br />
              Include a number <br />
              Include a special character (!@#$%)
            </p>
          </div>

          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-400 active:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded"
          >
            Sign Up
          </button>

          <div className='mt-4 text-center'>
            <span>
              Already have an account?
              <Link to="/login" className=" ml-1 text-blue-600 hover:underline">
                Log in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
