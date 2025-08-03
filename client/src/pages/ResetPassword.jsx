import React, { useState } from 'react';
import { FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3500/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Reset failed');
      }

      setMessage('Password successfully reset.');
    } catch (err) {
      setMessage(err.message || 'Failed to reset password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <p className='text-4xl ml-48 py-2'><FaKey /></p>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Reset Password
        </h2>
        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-100 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="border-none rounded w-full py-2 px-3 text-gray-600 bg-gray-200 dark:bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              className="border-none rounded w-full py-2 px-3 text-gray-600 bg-gray-200 dark:bg-gray-50"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-400 active:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded"
          >
            CONFIRM
          </button>

          {message && (
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-100">
              {message}
            </p>
          )}

          <div className='mt-4 text-center'>
            <Link to="/login" className="text-sm text-gray-900 hover:underline">
              Return back to Login Page
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
