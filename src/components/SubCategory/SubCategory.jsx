import { POSTS } from '@/assets/posts';
import Title from '../Title/Title';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { TITLE_MAP } from '@/assets/posts';
export default function SubCategory() {
  const { categoryId } = useParams();

  const title = TITLE_MAP[categoryId];
  const selectedPosts = POSTS.filter((post) => post.categoryId === categoryId);

  return (
    <div>
      <Title>{title}</Title>
      {selectedPosts.map((post) => (
        <li key={post.postId}>
          <Link
            to={`${post.postId}`}
            className="text-blue-500 hover:underline"
          >
            {post.title}
          </Link>
        </li>
      ))}
    </div>
  );
}
