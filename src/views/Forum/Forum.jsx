import SubCategory from '../../components/SubCategory/SubCategory';
import Category from '../../components/Category/Category';

export default function Forum() {
  return (
    <div className="container mx-auto p-4">

      <Category title="Beginning">
        <SubCategory
          title="Welcome"
          link="/forum/welcome"
          postCount="123"
          lastPost="Last post from ..."
        />
        <SubCategory
          title="Forum rules"
          link="/forum/forum_rules"
          postCount="123"
          lastPost="Last post from ..."
        />
      </Category>

      <Category title="Holiday at the sea">
        <SubCategory
          title="BG sea"
          link="/forum/bg_sea"
          postCount="100"
          lastPost="Last post from ..."
        />
        <SubCategory
          title="World sea"
          link="/forum/world_sea"
          postCount="222"
          lastPost="Last post from ..."
        />
      </Category>

      <Category title="Holiday on a mountain">
        <SubCategory
          title="BG mountains"
          link="/forum/bg_mountains"
          postCount="33"
          lastPost="Last post from ..."
        />
        <SubCategory
          title="World mountains"
          link="/forum/world_mountains"
          postCount="13"
          lastPost="Last post from ..."
        />
      </Category>

      <Category title="Historical landmarks">
        <SubCategory
          title="BG landmarks"
          link="/forum/bg_landmarks"
          postCount="413"
          lastPost="Last post from ..."
        />
        <SubCategory
          title="World landmarks"
          link="/forum/world_landmarks"
          postCount="312"
          lastPost="Last post from ..."
        />
      </Category>
    </div>
  );
}
