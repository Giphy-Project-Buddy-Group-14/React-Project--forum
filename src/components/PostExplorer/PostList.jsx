import {
  getAllPosts
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
  }, []);

  const postToShow = posts.slice(0, showCount).map((el) => {
    return (
      <div key={el.title} style={{ flexBasis: '50%' }} className='px-3'>
        <PostCard {...el} />
      </div >
    );
  });

  const loadMore = () => {
    setShowCount((prevCount) => prevCount + 10);
  };

  return (
    <>
      <div className='flex flex-wrap'>
        {posts && postToShow}
      </div>
      <div className='mt-8'>
        {isLoggedIn && showCount < posts.length && (
          <Button
            onClick={loadMore}
            className=""
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
}
