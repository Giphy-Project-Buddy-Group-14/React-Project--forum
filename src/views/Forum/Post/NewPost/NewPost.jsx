import CreatePostForm from '@/components/PostForm/CreatePostForm';

import ContentWrapper from '@/components/ContentWrapper/ContentWrapper.jsx';
export default function NewPost() {
  return (
    <ContentWrapper>
      <h1 className='h1-semibold mb-5 mt-8 text-white'>Create New Post</h1>
      <CreatePostForm></CreatePostForm>
    </ContentWrapper>
  );
}
