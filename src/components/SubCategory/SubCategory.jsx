import Title from '../Title/Title';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TITLE_MAP } from '@/assets/posts';
import { getPostsByCategoryId } from '@/services/post.services';
import ContentWrapper from '../ContentWrapper/ContentWrapper.jsx';
import { Button } from '../ui/button';
import PostListItem from '@/views/Forum/SubCategory/PostListItem/PostListItem';
export default function SubCategory() {
  const { categoryId } = useParams();

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async (categoryId) => {
      const posts = await getPostsByCategoryId(categoryId);
      setPosts(posts)
    }
    fetchPosts(categoryId)
  }, [categoryId])

  const navigate = useNavigate()

  const newPostNavigation = () => {
    navigate('posts/new')
  }
  const title = TITLE_MAP[categoryId];

  console.log('posts', posts);

  return (
    <ContentWrapper>
      <div>
        <Title>{title}</Title>
        <ul role="list" className="divide-y divide-gray-100">
          {posts.map((post) => <PostListItem key={post.id} post={post} />)}
        </ul>

        <Button onClick={newPostNavigation}>
          New Post
        </Button>
      </div>
    </ContentWrapper>
  );
}

