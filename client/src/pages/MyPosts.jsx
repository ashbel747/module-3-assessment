import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:3500/api/posts');
        const data = await res.json();
        const myPosts = data.filter((post) => post.author._id === userId);
        setPosts(myPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`http://localhost:3500/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p._id !== postId));
      } else {
        alert('Failed to delete post.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold mb-4">My Posts</h1>
          <Link
            to={`/dashboard/create-post`}
            className="bg-blue-800 hover:bg-blue-400 active:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-auto"
          >
            New Post
          </Link>
      </div>

      <div className='flex space-x-52 items-center my-3'>
        <h2 className='ml-16 underline text-2xl'>
          TITLE
        </h2>
        <h2 className='underline text-2xl'>
          DATE CREATED
        </h2>

      </div>

      {posts.map((post) => (
        <div key={post._id} className="bg-white p-4 shadow rounded flex justify-between items-center mb-2">
          <h2 className=" font-semibold">{post.summary}</h2>
          <p className="text-gray-700">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/dashboard/edit-post/${post._id}`)}
              className="text-blue-500 px-4 py-1 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post._id)}
              className="text-red-600 px-4 py-1 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
