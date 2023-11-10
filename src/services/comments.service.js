import { ref, push, get, set, remove, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';


const fromCommentsDocument = async snapshot => {
  try {
      const commentsDocument = snapshot.val();

      return Object.keys(commentsDocument).map(key => {
          const comment = commentsDocument[key];

          return {
              ...comment,
              id: key,
              createdOn: new Date(comment.createdOn),
              likedBy: comment.likedBy ? Object.keys(comment.likedBy) : [],
          };
      });
  } catch (error) {
      console.error(error);
  }
};

export const createComment = async (username, postId, contentObject) => {
  try {
      const result = await push(
          ref(db, 'comments'),
          {
              ...contentObject,
              username: username,
              postId: postId,
              createdOn: Date.now(),
          },
      );

      return getCommentById(result.key);
  } catch (error) {
      console.error(error);
  }
};

export const getCommentById = async (id) => {
  try {
      const result = await get(ref(db, `comments/${id}`));

      if (!result.exists()) {
          throw new Error(`Comment with id ${id} does not exist!`);
      }

      const comment = result.val();
      comment.id = id;
      comment.createdOn = new Date(comment.createdOn);
      if (!comment.likedBy) comment.likedBy = [];

      return comment;
  } catch (error) {
      console.error(error);
  }
};

export const getCommentsByPostId = async (postId) => {
  try {
      const snapshot = await get(query(ref(db, 'comments'), orderByChild('postId'), equalTo(postId)));

      if (!snapshot.exists()) {
          return [];
      }

      return fromCommentsDocument(snapshot);
  } catch (error) {
      console.error(error);
  }
};