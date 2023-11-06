import { Link } from 'react-router-dom';

export default function PreviewSubCategory({ title, link, postCount, lastPost }) {
  return (
    <div className="bg-blue-200 shadow-md p-4 rounded-lg my-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link
          to={link}
          className="text-blue-500 hover:underline"
        >
          {title}
        </Link>
      </div>
      <div className="mt-2 text-gray-600">
        <div>
          <span className="font-semibold">Post Count:</span> {postCount}
        </div>
        <div>
          <span className="font-semibold">Last Post:</span> {lastPost}
        </div>
      </div>
    </div>
  );
}
