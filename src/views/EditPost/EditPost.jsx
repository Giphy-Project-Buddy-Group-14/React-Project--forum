import UpdatePostForm from '@/components/PostForm/UpdatePostForm';
import { useParams } from 'react-router-dom';
import { getPostById } from '@/services/post.services';
import { useEffect, useState } from 'react';
import LoadingIndicator from '@/components/ui/Loading';

export default function EditPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async (postId) => {
      const fetchedPost = await getPostById(postId);
      setPost(fetchedPost);
    };
    fetchPost(postId);
  }, [postId]);

  return post ? <UpdatePostForm post={post} /> : <LoadingIndicator />;
}
