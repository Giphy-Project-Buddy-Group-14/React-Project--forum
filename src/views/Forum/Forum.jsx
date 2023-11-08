import PreviewSubCategory from '../../components/PreviewSubCategory/PreviewSubCategory';
import Category from '../../components/Category/Category';
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper.jsx';

export default function Forum() {
  return (
    <ContentWrapper>
      <div className="container mx-auto p-4">
        <Category title="Beginning">
          <PreviewSubCategory
            title="Welcome"
            link="/forum/welcome"
            postCount="123"
            lastPost="Last post from ..."
          />

          <PreviewSubCategory
            title="Forum rules"
            link="/forum/forum_rules"
            postCount="123"
            lastPost="Last post from ..."
          />
        </Category>

        <Category title="Holiday at the sea">
          <PreviewSubCategory
            title="BG sea"
            link="/forum/bg_sea"
            postCount="100"
            lastPost="Last post from ..."
          />

          <PreviewSubCategory
            title="World sea"
            link="/forum/world_sea"
            postCount="222"
            lastPost="Last post from ..."
          />
        </Category>

        <Category title="Holiday on a mountain">
          <PreviewSubCategory
            title="BG mountains"
            link="/forum/bg_mountains"
            postCount="33"
            lastPost="Last post from ..."
          />

          <PreviewSubCategory
            title="World mountains"
            link="/forum/world_mountains"
            postCount="13"
            lastPost="Last post from ..."
          />
        </Category>

        <Category title="Historical landmarks">
          <PreviewSubCategory
            title="BG landmarks"
            link="/forum/bg_landmarks"
            postCount="413"
            lastPost="Last post from ..."
          />

          <PreviewSubCategory
            title="World landmarks"
            link="/forum/world_landmarks"
            postCount="312"
            lastPost="Last post from ..."
          />
        </Category>
      </div>
    </ContentWrapper>
  );
}
