import { useState, useContext } from 'react';

import { createComment } from '@/services/comments.service';

import { AuthContext } from '@/context/AuthContext';

import Comments from './Comments';

import LoadingIndicator from '../ui/Loading';
export default function CommentForm({ postId }) {
  const [content, setContent] = useState();
  const [shouldLoadComments, setShouldLoadComments] = useState(true);

  const { userData } = useContext(AuthContext);

  const changeCommentHandler = async (event) => {
    event.preventDefault();
    setContent(event.target.value);
  };

  const addCommentHandler = async (event) => {
    event.preventDefault();
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
      setContent('');
      setShouldLoadComments(true);
    }
  };

  return (
    <>
      <form>
        <div className="col-span-full">
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Comment
          </label>
          <div className="mt-2">
            <textarea
              value={content}
              id="comment"
              name="comment"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={changeCommentHandler}
            />
          </div>
        </div>

        <div className="col-span-full">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addCommentHandler}
          >
            Add Comment
          </button>
        </div>
      </form>
      {shouldLoadComments ? <Comments postId={postId} /> : <LoadingIndicator />}
    </>
  );
}
