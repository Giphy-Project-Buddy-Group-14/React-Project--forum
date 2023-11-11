import { useEffect, useState } from 'react';
import { getCommentsByPostId, deleteCommentById } from '@/services/comments.service';
import Comment from './Comment';

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getCommentsByPostId(postId);
      setComments(comments);
    };
    fetchComments();
  }, [postId]);

  const deleteCommentHandler = (id) => {
    deleteCommentById(id)
    const remainingComments = comments.filter((comment) => comment.id !== id)
    setComments(remainingComments);
  }

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onDelete={deleteCommentHandler}
          />
        ))}
    </div>
  );
}
