import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-6 text-xl space-y-6 ml-64">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>

      <div className="space-x-4">
        <Link
          to="/create-post"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Post
        </Link>

        <Link
          to="/my-posts"
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          View My Posts
        </Link>
      </div>
    </div>
  );
}
