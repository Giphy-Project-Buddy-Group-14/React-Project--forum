
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { updatePost } from '@/services/post.services';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH } from '@/helpers/consts';
import { useToast } from '../ui/use-toast';
import FileUploader from '../FileUploader/FileUploader.jsx';
import _ from 'lodash';

export default function UpdatePostForm({ post }) {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState(post.images);
  const { toast } = useToast();

  const updatePostHandler = async (event) => {
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
      title: title,
      description: description,
    };
    if (!_.isEqual(post.images, images)) {
      content.images = images;
    }
    const updatedPost = await updatePost(post?.id, content);

    if (updatedPost) {
      navigate(`..`);
    }
  };

  const [localTitle, setLocalTitle] = useState(post?.title);
  const [localDescription, setLocalDescription] = useState(post?.description);

  const handleChangeTitle = (event) => {
    setLocalTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setLocalDescription(event.target.value);
  };

  return (
    <div>
      <h1 className="h1-semibold mb-5 text-white">Edit</h1>
      <form className='bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-lg overflow-hidden'>
        <div>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-900"
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
                      className="block flex-1 px-3 border-0 bg-transparent rounded-md py-1.5 pl-3 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChangeDescription}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={updatePostHandler}
                >
                  Update Post
                </button>
              </div>

              <FileUploader setImages={setImages} mediaUrl={post.images?.[0]} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
