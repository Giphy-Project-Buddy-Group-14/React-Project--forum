import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import {
  updatePostLike,
  getPostLikeByUsername,
  getLikesCountByPost,
} from '@/services/post.services';

import LoadingIndicator from './Loading';
export default function Heart({ post }) {
  const [likedPost, setLikedPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postLikesCount, setPostLikesCount] = useState(0);
  const [showPostLikes, setShowPostLikes] = useState(false);
  const { userData } = useContext(AuthContext);
  const { username } = userData;

  // const getLikesCountByPost = (post) => {
  //   const filteredLikes = Object.entries(post.likes)
  //     .filter(([_username, value]) => value === true)
  //     .map(([user]) => user);

  //   return filteredLikes.length;
  // };

  useEffect(() => {
    const fetchUserPostLike = async (postId) => {
      const userHasLikedPost = await getPostLikeByUsername(
        postId,
        userData.username
      );
      setLikedPost(userHasLikedPost);
    };
    fetchUserPostLike(post.id);

    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchPostCount = async (postId) => {
      const likesCount = await getLikesCountByPost(post.id);
      setPostLikesCount(likesCount);
      setShowPostLikes(true);
    };
    fetchPostCount(post.id);

    setLoading(false);
  }, []);

  const togglePostLikeHandler = async () => {
    setLoading(true);

    if (likedPost) {
      await updatePostLike(post.id, username, false);
      setLikedPost(false);
      setPostLikesCount((prevCount) => prevCount - 1);
    } else {
      await updatePostLike(post.id, username, true);
      setLikedPost(true);
      setPostLikesCount((prevCount) => prevCount + 1);
    }

    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingIndicator />}
      {!loading && (
        <div
          className={`${
            likedPost ? 'bg-red' : 'bg-gray-300'
          } text-white font-bold py-2 px-2 rounded`}
          onClick={togglePostLikeHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          {showPostLikes && postLikesCount}
        </div>
      )}
    </>
  );
}
