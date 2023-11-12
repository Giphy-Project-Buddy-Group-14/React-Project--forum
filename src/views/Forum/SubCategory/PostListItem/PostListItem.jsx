import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

dayjs.extend(relativeTime);

export default function PostListItem({ post }) {

  return (
    <li key={post.id} className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            <Link
              to={`posts/${post.key}`}
              className="text-blue-500 hover:underline"
            >
              {post.title} ({post.count || 0} likes)
            </Link>
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{post.description}</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{post.author}</p>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          <time dateTime={dayjs(post.createdOn).fromNow()}>{dayjs(post.createdOn).fromNow()}</time>
        </p>
      </div>
    </li>
  )
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdOn: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
};

