import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getPostById,
  deletePostById,
  incrementPostCount,
} from '@/services/post.services';
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
import { getUserByUsername } from '@/services/users.services';
import { INITIAL_POST_COUNT } from '@/helpers/consts';
import Slider from 'react-slick';

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [createdOnDate, setCreatedOnDate] = useState();
  const [loading, setLoading] = useState(true);
  const [postCount, setPostCount] = useState();
  const navigate = useNavigate();
  const [author, setAuthor] = useState({});
  const [showHeart, setShowHeart] = useState(false);

  const { userData } = useContext(AuthContext);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  useEffect(() => {
    setLoading(true);

    const fetchPost = async (postId) => {
      const post = await getPostById(postId);
      setPost(post);
      setShowHeart(true);
      const user = await getUserByUsername(post.author);
      setAuthor(user);
      setCreatedOnDate(post.createdOn);
      const count = await incrementPostCount(
        postId,
        post.count || INITIAL_POST_COUNT
      );
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
  };

  const EditOptions = () => {
    if (!userData || userData.username != post.author) {
      return null;
    }

    return (
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
    );
  };

  return (
    <ContentWrapper>
      <div className='bg-white bg-opacity-40 p-8 rounded-lg overflow-hidden backdrop-blur-sm'>
        {loading && <LoadingIndicator />}

        {!loading && (
          <div className="leading-6">
            <figure className="relative flex flex-col-reverse bg-slate-100 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
              <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
                <p>{post.description}</p>

                {post.images && !!post.images.length && (
                  <div className="mt-6 flex items-center justify-center" style={{ maxWidth: '500px', maxHeight: '500px' }}>
                    <Slider {...settings}>
                      {post.images.map((img) => {
                        return (
                          <img
                            src={img}
                            key={img}
                          />
                        );
                      })}
                    </Slider>
                  </div>
                )}
              </blockquote>
              <figcaption className="flex items-center space-x-4">
                <img
                  src={author?.profilePictureURL}
                  alt=""
                  className="flex-none w-14 h-14 rounded-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex-auto">
                  <div className="text-base text-slate-900 font-semibold dark:text-slate-300">
                    <div className="flex">
                      <div className="flex-1 text-lg flex">{post.title}</div>

                      <div className="flex gap-4">
                        {createdOnDate && (
                          <TimeStamp date={createdOnDate}></TimeStamp>
                        )}

                        <div>{showHeart && <Heart post={post} />}</div>

                        <div className="flex gap-1">
                          <CountView /> {postCount}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-0.5 flex">
                    <div className="flex-1">
                      {!!author && <Author author={author} />}
                    </div>
                    <div>
                      <EditOptions />
                    </div>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        )}


        <CommentSection postId={postId} />
      </div>
    </ContentWrapper>
  );
}
