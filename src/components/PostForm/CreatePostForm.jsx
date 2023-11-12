import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { addPost } from '@/services/post.services';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useToast } from '../ui/use-toast';
import { MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH } from '@/helpers/consts';
export default function CreatePostForm() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const username = userData?.username;

  const { toast } = useToast();

  const createPostHandler = async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title.length < MIN_TITLE_LENGTH || title.length > MAX_TITLE_LENGTH) {
      toast(
        { title: 'Title must be between 16 and 64 characters', type: 'UPDATE_TOAST' },
        { appearance: 'error' }
      );
      return;
    }
    if (description.length < MIN_DESCRIPTION_LENGTH || description.length > MAX_DESCRIPTION_LENGTH) {
      toast(
        { title: 'Content must be between 32 and 8192 characters' },
        { appearance: 'error' }
      );
      return;
    }

    const content = {
      categoryId: categoryId,
      title: title,
      description: description,
    };

    const post = await addPost(content, username);
    if (post) {
      toast({ title: 'Post created successfully!' }, { appearance: 'success' });
      navigate(`../${post.id}`);
    }
  };

  const [localTitle, setLocalTitle] = useState('');
  const [localDescription, setLocalDescription] = useState('');

  const handleChangeTitle = (event) => {
    setLocalTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setLocalDescription(event.target.value);
  };

  return (
    <>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      value={localTitle}
                      id="title"
                      type="text"
                      name="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Post title"
                      onChange={handleChangeTitle}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Post Description
                </label>
                <div className="mt-2">
                  <textarea
                    value={localDescription}
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChangeDescription}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={createPostHandler}
                >
                  Create Post
                </button>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
