import { useState } from 'react';
import { EMPTY_STRING } from '@/helpers/consts';
export default function EditCommentForm({ comment, onSave, onCancel }) {
  const [content, setContent] = useState(comment.content);
  const isContentDisable = content.length === 0;

  const changeCommentHandler = async (event) => {
    event.preventDefault();
    setContent(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    onSave(content);
    setContent(EMPTY_STRING);
  };

  const cancelCommentHandler = async (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <>
      <form onSubmit={submitHandler}>
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
        <div className="col-span-full flex justify-center py-4">
          <button
            type="submit"
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            disabled={isContentDisable}
          >
            Save Comment
          </button>

          <button
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            disabled={isContentDisable}
            onClick={cancelCommentHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
