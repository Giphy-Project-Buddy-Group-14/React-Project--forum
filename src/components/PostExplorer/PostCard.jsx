import { categories } from '@/common/common.js';
import { AuthContext } from '@/context/AuthContext.jsx';
import { getUserByUsername } from '@/services/users.services.js';
import moment from 'moment';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLikesCountByPost } from '@/services/post.services';

export default function PostCard(post) {
  const { isLoggedIn, userData } = useContext(AuthContext);
  const [author, setAuthor] = useState({});
  const [postLikesCount, setPostLikesCount] = useState(0);
  const [showPostLikes, setShowPostLikes] = useState(false);
  useEffect(() => {
    (async () => {
      const result = await getUserByUsername(post.author);
      setAuthor(result);
      const likesCount = await getLikesCountByPost(post.id);
      setPostLikesCount(likesCount);
      setShowPostLikes(true);
    })();
  }, [post.author, post.id, userData]);

  return (
    <div className="mb-5 mt-5 h-full py-3">
      <div className="w-full h-full lg:max-w-full lg:flex justify-start bg-white bg-opacity-90 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden">
        {post.images && (
          <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{ backgroundImage: `url(${post.images[0]})` }}
            title="Post Image">
          </div>
        )}
        <div className={`w-full p-4 flex flex-col justify-between leading-normal ${post.images ? '' : 'lg:pl-5'}`}>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              {!isLoggedIn && (
                <p className="flex items-center text-sm text-gray-600">
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  Members only
                </p>
              )}
              <Link to={`/forum/${post.categoryId}`}>
                <div className="inline-block bg-blue-50 px-2 py-0.5 rounded-full text-sm text-gray-500 hover:bg-teal-100 hover:text-teal-700 transition-colors duration-200">
                  {categories[post.categoryId]}
                </div>
              </Link>
              <div className="inline-block bg-blue-50 px-2 py-0.5 rounded-full text-sm text-gray-500 hover:bg-teal-100 hover:text-teal-700 transition-colors duration-200">
                Post views: {post.count}
              </div>
              {showPostLikes && (
                <div className="inline-block bg-blue-50 px-2 py-0.5 rounded-full text-sm text-gray-500 hover:bg-teal-100 hover:text-teal-700 transition-colors duration-200">
                  Post likes: {postLikesCount}
                </div>
              )}
            </div>
            <Link to={`/forum/${post.categoryId}/posts/${post.id}`}>
              <div className="text-gray-900 font-bold text-xl mb-2">
                {post.title}
              </div>
              <p className="text-gray-700 text-base">
                {post.description.slice(0, 150) + '...'}
              </p>
            </Link>
          </div>
          <div className="flex items-center">
            {!author?.profilePictureURL ? (
              <UserCircleIcon className="w-10 h-10 rounded-full mr-4 text-gray-300" />
            ) : (
              <img
                src={author?.profilePictureURL}
                alt="profile-img"
                className="w-10 h-10 rounded-full mr-4"
              />
            )}
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{post.author}</p>
              <p className="text-gray-600">
                {moment(post.createdOn).format('DD-MM-YYYY')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
