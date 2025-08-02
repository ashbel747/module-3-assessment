import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Create Your Account
        </h2>
        <p className='py-2 mb-4 text-gray-800 dark:text-white font-bold'>"Join our inclusive community and start sharing your voice."</p>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-100 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              className="border-none rounded w-full py-2 px-3 text-gray-600 dark:text-gray-100 bg-gray-200 dark:bg-gray-50"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-100 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="border-none rounded w-full py-2 px-3 text-gray-600 dark:text-gray-100 bg-gray-200 dark:bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 dark:text-gray-100 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="border-none rounded w-full py-2 px-3 text-gray-600 dark:text-gray-100 bg-gray-200 dark:bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-400 active:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
