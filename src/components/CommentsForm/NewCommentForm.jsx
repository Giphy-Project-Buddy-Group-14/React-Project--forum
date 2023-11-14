import { useContext, useState } from 'react';
import { EMPTY_STRING } from '@/helpers/consts';
import { AuthContext } from '@/context/AuthContext.jsx';

export default function NewCommentForm({ onSubmit }) {
  const [content, setContent] = useState(EMPTY_STRING);
  const isContentDisable = content.length === 0;
  const { userData } = useContext(AuthContext);

  const changeCommentHandler = async (event) => {
    event.preventDefault();
    setContent(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    onSubmit(content);
    setContent(EMPTY_STRING);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="col-span-full">
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-gray-900 mt-4"
          >
            Comment
          </label>
          <div className="mt-2 w-1/2">
            <textarea
              value={content}
              id="comment"
              name="comment"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={changeCommentHandler}
            />
          </div>
        </div>
        <div className="col-span-full flex py-4">
          {!userData.isBlocked && (<button
            type="submit"
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            disabled={isContentDisable}
          >
            Add Comment
          </button>)}
        </div>
      </form>
    </div>
  );
}
