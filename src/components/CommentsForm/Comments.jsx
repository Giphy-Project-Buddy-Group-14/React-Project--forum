import { useEffect, useState } from 'react';
import { getCommentsByPostId } from '@/services/comments.service';
import Comment from './Comment';
export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsByPostId(postId).then((data) => {
      setComments(data);
    });
    const fetchComments = async () => {
      const comments = await getCommentsByPostId(postId);
      setComments(comments);
    };
    fetchComments();
  }, [postId]);

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
          />
        ))}
    </div>
  );
}
