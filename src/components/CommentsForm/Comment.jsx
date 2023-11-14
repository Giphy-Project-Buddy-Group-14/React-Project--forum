import { Link } from 'react-router-dom';
import TimeStamp from '../ui/TimeStamp';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { Menu, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect, useContext } from 'react';
import EditCommentForm from './EditCommentForm';
import { updateComment } from '@/services/comments.service';
import { getUserByUsername } from '@/services/users.services';
import { AuthContext } from '@/context/AuthContext';
export default function Comment({ comment, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentComment, setCurrentComment] = useState(comment);

  const [author, setAuthor] = useState({});
  const [isAuthorLoaded, setIsAuthorLoaded] = useState(false);

  const { userData } = useContext(AuthContext);
  const loggedInUsername = userData.username;

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const editCommentHandler = (event) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const updateCommentHandler = (content) => {
    updateComment(comment.id, content);

    setCurrentComment((previousState) => ({
      ...previousState,
      content: content,
    }));

    setIsEditing(false);
  };

  const cancelCommentHandler = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    (async () => {
      const result = await getUserByUsername(comment.username);
      setAuthor(result.val());
      setIsAuthorLoaded(true);
    })();
  }, []);

  return (
    <>
      {isEditing && (
        <EditCommentForm
          comment={comment}
          onSave={updateCommentHandler}
          onCancel={cancelCommentHandler}
        />
      )}
      {!isEditing && (
        <div>
          <article className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900 ">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src={author ? author.profilePictureURL : ''}
                    alt={author ? author.username : '-'}
                  />
                  {currentComment.username}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <TimeStamp date={currentComment.createdOn} />
                </p>
              </div>
              {isAuthorLoaded &&
                ((currentComment.username === userData.username &&
                  !userData.isBlocked) ||
                  userData.role === 'admin') && (
                  <Menu
                    as="div"
                    className="relative ml-3"
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
                              onClick={editCommentHandler}
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
                              onClick={() => onDelete(currentComment.id)}
                            >
                              Delete
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
            </footer>
            <p className="text-gray-500 dark:text-gray-400">
              {currentComment.content}
            </p>
          </article>
        </div>
      )}
    </>
  );
}
