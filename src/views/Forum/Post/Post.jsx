import PostBody from '../../../components/PostBody/PostBody';
import Title from '../../../components/Title/Title';

import { useParams } from 'react-router-dom';

import { POSTS } from '../../../assets/posts';
export default function Post() {
  const { postId } = useParams();

  const post = POSTS.find((post) => post.postId === postId);

  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <Title>{post.title}</Title>
            <PostBody>{post.description}</PostBody>
          </div>
        </div>
      </div>
    </div>
  );
}
