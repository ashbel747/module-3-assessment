import { useEffect, useState } from 'react';
import PostCard from './PostCard';

const BlogFeed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:3500/api/posts?page=${page}&limit=10`);
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
        if (data.length === 0 && page > 1) {
        setPage(p => p - 1); // fallback if user clicks "Next" beyond available posts
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 py-16">
      <h2 className='font-bold text-3xl m-20'>EXPLORE OUR FEED</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-2">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogFeed;
