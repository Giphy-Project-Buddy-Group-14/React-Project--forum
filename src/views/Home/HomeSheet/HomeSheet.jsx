import Title from '@/components/Title/Title';
import { getPosts } from '@/services/post.services';
import { useEffect, useState } from 'react';

export default function HomeSheet() {
  const [posts, setPosts] = useState([]);
  // const [createdOnDate, setCreatedOnDate] = useState();
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true);

    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };
    fetchPosts();

    // setLoading(false);
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Most viewed
        </h2>
      </div>
      <div>
        {posts &&
          posts.map((post) => (
            <div
              key={post.id}
              className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
              <h1>{post.title}</h1>
            </div>
          ))}
      </div>
    </div>
  );
}
