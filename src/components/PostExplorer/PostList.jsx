import {
  getAllPosts,
  getMostCommentedPosts,
} from '@/services/post.services.js';
import { useContext, useEffect, useState } from 'react';
import { useToast } from '../ui/use-toast.js';
import PostCard from './PostCard.jsx';
import { Button } from '../ui/button.jsx';
import { AuthContext } from '@/context/AuthContext.jsx';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [showCount, setShowCount] = useState(10);
  const { toast } = useToast();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllPosts();
        setPosts(response);
      } catch (error) {
        toast({
          title: error.message,
        });
      }
    })();

    (async () => {
      try {
        const response = await getMostCommentedPosts();
        setPosts(response);
      } catch (error) {
        toast({
          title: error.message,
        });
      }
    })();
  }, []);

  const postToShow = posts.slice(0, showCount).map((el) => {
    return (
      <PostCard
        key={el.title}
        {...el}
      />
    );
  });

  const loadMore = () => {
    setShowCount((prevCount) => prevCount + 10);
  };

  return (
    <div>
      {posts && postToShow}
      {isLoggedIn && showCount < posts.length && (
        <Button
          onClick={loadMore}
          className=""
        >
          Load More
        </Button>
      )}
    </div>
  );
}
