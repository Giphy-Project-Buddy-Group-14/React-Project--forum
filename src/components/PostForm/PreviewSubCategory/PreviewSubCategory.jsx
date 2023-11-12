import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPostsByCategoryId } from '@/services/post.services';
export default function PreviewSubCategory({
  title,
  link,
  lastPost,
  categoryId,
}) {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  useEffect(() => {
    const fetchPosts = async (categoryId) => {
      const posts = await getPostsByCategoryId(categoryId);
      setPostCount(posts.length);
    };
    fetchPosts(categoryId);
  }, []);

  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg my-4 hover:bg-gray-200 transition-colors duration-200">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link
          to={link}
          className="text-blue-500 hover:underline"
        >
          View Posts
        </Link>
      </div>
      <div className="mt-2 text-gray-600">
        <div>
          <span className="font-semibold">Post Count:</span> {postCount}
        </div>
        <div>
          <span className="font-semibold">Last Post:</span> {lastPost}
        </div>
      </div>
    </div>
  );
}
