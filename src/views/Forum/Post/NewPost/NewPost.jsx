import CreatePostForm from '@/components/PostForm/CreatePostForm';
import Title from '@/components/Title/Title';

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper.jsx';
export default function NewPost() {
  return (
    <ContentWrapper>
      <Title>Create New Post</Title>
      <CreatePostForm></CreatePostForm>
    </ContentWrapper>
  );
}
