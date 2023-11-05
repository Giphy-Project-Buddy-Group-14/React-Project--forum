import { Link } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import { POSTS } from '@/assets/posts';

export default function Welcome() {

  return (
    <div>
      <Title>Welcome</Title>
      {POSTS.map((post) => (
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
