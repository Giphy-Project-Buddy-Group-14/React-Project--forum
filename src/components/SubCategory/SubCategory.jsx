import { POSTS } from '@/assets/posts';
import Title from '../Title/Title';
import { Link } from 'react-router-dom';
export default function SubCategory({ title, categoryId }) {
  console.log("SubCategory -> ")
  const selectedPosts = POSTS.filter((m) => m.categoryId === categoryId);
  // console.log("selectedPosts -> " + selectedPosts)
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
