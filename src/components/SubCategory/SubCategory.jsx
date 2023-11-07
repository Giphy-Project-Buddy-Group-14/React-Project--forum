import { POSTS } from '@/assets/posts';
import Title from '../Title/Title';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { TITLE_MAP } from '@/assets/posts';
export default function SubCategory() {
  const { categoryId } = useParams();

  const navigate = useNavigate()

  const newPostNavigation = () => {

      navigate('posts/new')

  }
  const title = TITLE_MAP[categoryId];
  const selectedPosts = POSTS.filter((post) => post.categoryId === categoryId);
  return (
    <div>
      <Title>{title}</Title>
      {selectedPosts.map((post) => (
        <li key={post.postId}>
          <Link
            to={`posts/${post.postId}`}
            className="text-blue-500 hover:underline"
          >
            {post.title}
          </Link>
        </li>
      ))}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={newPostNavigation}>
        Click Me
      </button>
    </div>
  );
}

