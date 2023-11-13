import { useState, useContext } from 'react';
import { createComment } from '@/services/comments.service';
import { AuthContext } from '@/context/AuthContext';
import Comments from './Comments';
import LoadingIndicator from '../ui/Loading';
import NewCommentForm from './NewCommentForm';

export default function CommentSection({ postId }) {
  const [shouldLoadComments, setShouldLoadComments] = useState(true);
  const { userData } = useContext(AuthContext);

  const addCommentHandler = async (content) => {
    setShouldLoadComments(false);

    const contentObject = {
      content: content,
    };

    const createdComment = await createComment(
      userData.username,
      postId,
      contentObject
    );

    if (createdComment) {
      setShouldLoadComments(true);
    }
  };

  return (
    <>
      {!userData.isBlocked && (<NewCommentForm onSubmit={addCommentHandler} />)}
      {shouldLoadComments
        ? <Comments postId={postId} />
        : <LoadingIndicator />}
    </>
  );
}
