
import { Link } from 'react-router-dom';
import Title from '../../components/Title/Title';

export const Category = ({ title, link, postCount, lastPost }) => (
  <div className="bg-red-200 shadow-md p-4 rounded-lg my-4">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Link to={link} className="text-blue-500 hover:underline">
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

export default function Forum() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <Title>Beginning</Title>
      </div>
      <div className="grid grid-rows-1 lg:grid-rows-3">
        <div>
          <Category
            title="Welcome"
            link="/welcome"
            postCount="123"
            lastPost="Last post from ..."
          />
          <Category
          title="Forum rules"
          link="/forum_rules"
          postCount="123"
          lastPost="Last post from ..."
        />
        </div>
      </div>
      {/* <Title>Holiday at the sea</Title> */}
      
      <div className="mb-8">
        <Title>Holiday at the sea</Title>
      </div>
      <div className="grid grid-rows-1 lg:grid-rows-3">
        <div>
          <Category
            title="BG sea"
            link="/bg_sea"
            postCount="100"
            lastPost="Last post from ..."
          />
          <Category
          title="World sea"
          link="/world_sea"
          postCount="222"
          lastPost="Last post from ..."
        />
        </div>
      </div>

      <div className="mb-8">
        <Title>Holiday on a mountain</Title>
      </div>
      <div className="grid grid-rows-1 lg:grid-rows-3">
        <div>
          <Category
            title="BG mountains"
            link="/bg_mountains"
            postCount="33"
            lastPost="Last post from ..."
          />
          <Category
          title="World mountains"
          link="/world_mountains"
          postCount="13"
          lastPost="Last post from ..."
        />
        </div>
      </div>

      <div className="mb-8">
        <Title>Historical landmarks</Title>
      </div>
      <div className="grid grid-rows-1 lg:grid-rows-3">
        <div>
          <Category
            title="BG landmarks"
            link="/bg_landmarks"
            postCount="413"
            lastPost="Last post from ..."
          />
          <Category
          title="World landmarks"
          link="/world_landmakrs"
          postCount="312"
          lastPost="Last post from ..."
        />
        </div>
      </div>

    </div>
    
  );
}
