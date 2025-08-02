import { Link } from 'react-router-dom';
import { FaHeart, FaTelegramPlane } from 'react-icons/fa';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-600 shadow-md rounded overflow-hidden">
      <img
        src={
            post.image
                ? new URL(`../assets/${post.image}`, import.meta.url).href
                : "https://via.placeholder.com/600x300?text=No+Image"
        }
        alt={post.title}
        className="w-full h-54 p-2 object-center"
        />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{post.summary}</p>

        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-3">
            <img
                src={
                post.author.avatar
                    ? new URL(`../assets/${post.author.avatar}`, import.meta.url).href
                    : "https://i.pravatar.cc/150?u=default"
                }
                alt="Author"
                className="w-16 h-16 rounded-full"
            />
            <div>
                <p className='text-md text-black'>{post.author.name}</p>
                <p className="text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
        </div>


        <div className="flex justify-between items-center text-sm mt-3">
          <p className='p-3 flex items-center gap-2 w-24 rounded-3xl bg-gray-800 text-white'>
            <FaHeart className='text-red-600 p-2 w-8 h-8 rounded flex-shrink-0' />
            {post.likes} 24.5k
          </p>

          <p className='p-3 ml-3 flex items-center gap-2 w-24 rounded-3xl bg-gray-800 text-white'>
            <FaTelegramPlane className='text-gray-100 p-2 w-8 h-8 rounded flex-shrink-0' />
            {post.commentsCount}
          </p>

          <Link
            to={`/posts/${post._id}`}
            className="text-blue-600 hover:underline ml-auto"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
