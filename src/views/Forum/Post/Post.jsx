import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById, deletePostById, incrementPostCount } from '@/services/post.services';
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper.jsx';
import { useEffect, useState, useContext } from 'react';
import Heart from '@/components/ui/Heart';
import CountView from '@/components/ui/CountView';
import LoadingIndicator from '@/components/ui/Loading';
import TimeStamp from '@/components/ui/TimeStamp';
import Author from '@/components/Author/Author';
import { AuthContext } from '@/context/AuthContext';

import CommentSection from '@/components/CommentsForm/CommentSection';

import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [createdOnDate, setCreatedOnDate] = useState();
  const [loading, setLoading] = useState(true);
  const [postCount, setPostCount] = useState();
  const navigate = useNavigate();

  const { userData } = useContext(AuthContext);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  useEffect(() => {
    setLoading(true);

    const fetchPost = async (postId) => {
      const post = await getPostById(postId);
      setPost(post);
      setCreatedOnDate(post.createdOn);
      const count = await incrementPostCount(postId, post.count);
      setPostCount(count);
    };
    fetchPost(postId);

    setLoading(false);
  }, [postId]);

  const editPost = (event) => {
    event.preventDefault();
    navigate(`edit`);
  };

  const deletePost = async () => {
    await deletePostById(postId);
    navigate(`../..`);
  };

  return (
    <ContentWrapper>
      {loading && <LoadingIndicator />}
      <div>
        <div id={postId}></div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-1 ">
          <article className="flex max-w-xl flex-col   justify-between">
            <div className="flex items-center gap-x-6 text-l">
              {userData?.username}

              <div className="bg-gray-300 hover:bg-red text-white font-bold py-2 px-2 rounded">
                <Heart />
              </div>

              <div className="bg-gray-300 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                <CountView />{postCount}
              </div>
              <div className="ml-auto">
                <Menu
                  as="div"
                  className="relative ml-1"
                >
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Options
                      <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            onClick={editPost}
                          >
                            Edit
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            onClick={deletePost}
                          >
                            Delete
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>

            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <p>
                  <span className="absolute inset-0" />
                  {post.title}
                </p>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {post.description}
              </p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
              <img
                src="https://marketplace.canva.com/EAFOWUXOOvs/1/0/1600w/canva-green-gradient-minimalist-simple-instagram-profile-picture-tBlf3wVYGhg.jpg"
                alt=""
                className="h-10 w-10 rounded-full bg-gray-50"
              />

              <Author />
              <div className="ml-auto flex items-center gap-x-6 text-xs">
                {createdOnDate && <TimeStamp date={createdOnDate}></TimeStamp>}
              </div>
            </div>
          </article>
        </div>
      </div>

      <CommentSection postId={postId} />
    </ContentWrapper>
  );
}
