import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

dayjs.extend(relativeTime);

export default function PostListItem({ post }) {

  return (
    <li key={post.id} className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="ml-4 mt-1">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
          </svg>
        </div>
        <div className="min-w-0 flex-auto">
          <p className="font-semibold leading-6 text-gray-900">
            <Link
              to={`posts/${post.id}`}
              className="text-blue-500 hover:underline"
            >
              {post.title} ({post.count || 0} likes)
            </Link>
          </p>
          <p className="mt-1 text-sm leading-5 text-gray-500">{post.description}</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">
          {post.author}
        </p>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          <time dateTime={dayjs(post.createdOn).fromNow()}>
            {dayjs(post.createdOn).fromNow()}
          </time>
        </p>
      </div>
    </li>
  )
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdOn: PropTypes.number.isRequired,
    count: PropTypes.number
  })
};

