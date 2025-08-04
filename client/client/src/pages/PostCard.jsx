import { Link } from 'react-router-dom';
import { FaHeart, FaTelegramPlane } from 'react-icons/fa';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-600 shadow-md rounded flex flex-col h-auto">
      <img
        src={
            post.image
                ? new URL(`../assets/${post.image}`, import.meta.url).href
                : "https://via.placeholder.com/600x300?text=No+Image"
        }
        alt={post.title}
        className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-t"
        />
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="text-xs text-blue-500 truncate">{post.title}</h4>
        <h2 className="text-gray-900 dark:text-gray-100 mt-2 text-2xl line-clamp-2">{post.summary}</h2>
        <p className='pt-2 text-sm text-gray-700 dark:text-gray-200 line-clamp-3'>{post.content}</p>

        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-3">
            <img
                src={
                post.author.avatar
                    ? new URL(`../assets/${post.author.avatar}`, import.meta.url).href
                    : "https://i.pravatar.cc/150?u=default"
                }
                alt="Author"
                className="w-12 h-12 rounded-full object-cover"
            />
            <div>
                <p className='text-md text-black dark:text-white'>{post.author.name}</p>
                <p className="text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
        </div>


        <div className="flex justify-between items-center text-sm pt-4">
          <p className='p-2 flex items-center gap-2 w-24 rounded-3xl bg-gray-800 text-white'>
            <FaHeart className='text-red-600 p-2 w-8 h-8' />
            {post.likes} 24.5k
          </p>

          <p className='p-2 ml-3 flex items-center gap-2 w-24 rounded-3xl bg-gray-800 text-white'>
            <FaTelegramPlane className='text-gray-100 p-2 w-8 h-8' />
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
