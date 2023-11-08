import Title from '../Title/Title';
import { Link, useNavigate,useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TITLE_MAP } from '@/assets/posts';
import { getPostsByCategoryId } from '@/services/post.services';
export default function SubCategory() {
  const { categoryId } = useParams();

  const [posts, setPosts] = useState([])

  useEffect( () => {
    const fetchPosts = async (categoryId) => {
      const posts = await getPostsByCategoryId(categoryId);
      setPosts(posts)
    }
    fetchPosts(categoryId)
  }, [])



  const navigate = useNavigate()

  const newPostNavigation = () => {
      navigate('posts/new')
  }
  const title = TITLE_MAP[categoryId];

  return (
    <div>
      <Title>{title}</Title>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            to={`posts/${post.id}`}
            className="text-blue-500 hover:underline"
          >
            {post.title}
          </Link>
        </li>
      ))}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={newPostNavigation}>
        New Post
      </button>
    </div>
  );
}

