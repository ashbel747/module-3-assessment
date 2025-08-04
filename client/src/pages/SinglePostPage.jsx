import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PostPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch post by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://module-3-assessment.onrender.com/api/posts/${id}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Submit comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await fetch(`https://module-3-assessment.onrender.com/api/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ text: commentText }),
      });

      if (!res.ok) throw new Error('Failed to post comment');
      const updatedPost = await res.json();
      setPost(updatedPost);
      setCommentText('');
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  if (loading) return <p className="text-center">Loading post...</p>;
  if (!post) return <p className="text-center text-red-500">Post not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        By {post.author.username} • {new Date(post.createdAt).toLocaleDateString()} • {post.views} views
      </div>

      {post.image && (
        <img
          src={new URL(`../assets/${post.image}`, import.meta.url).href}
          alt={post.title}
          className="w-full h-48 sm:h-48 md:h-96 object-cover rounded"
        />
      )}

      <div className="prose dark:prose-invert mb-6">
        <p  className='pt-2 text-2xl text-gray-700 dark:text-gray-200 line-clamp-3'>{post.content}</p>
      </div>

      <hr className="my-6" />

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Comments ({post.comments.length})</h2>

        {post.comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          post.comments.map((comment) => (
            <div key={comment._id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-2">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {comment.user.username}
              </div>
              <div className="text-sm text-gray-800 dark:text-gray-200">{comment.text}</div>
              <div className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleCommentSubmit} className="mt-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          rows="3"
          placeholder="Write your comment..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
}
