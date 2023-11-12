import PreviewSubCategory from '../../components/PostForm/PreviewSubCategory/PreviewSubCategory';
import Category from '../../components/Category/Category';
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper.jsx';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function Forum() {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return (
      <ContentWrapper>
        <div className="container mx-auto p-4">
          Please login to see the forum!
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper>
      <div className="container mx-auto p-4">
        <Category title="Beginning">
          <PreviewSubCategory
            title="Welcome"
            link="/forum/welcome"
            categoryId="welcome"
            lastPost="Last post from ..."
          />

          <PreviewSubCategory
            title="Forum rules"
            link="/forum/forum_rules"
            categoryId="forum_rules"
            lastPost="Last post from ..."
          />
        </Category>

        <Category title="Holiday at the sea">
          <PreviewSubCategory
            title="BG sea"
            link="/forum/bg_sea"
            categoryId="bg_sea"
            lastPost="Last post from ..."
          />

          <PreviewSubCategory
            title="World sea"
            link="/forum/world_sea"
            categoryId="world_sea"
            lastPost="Last post from ..."
          />
        </Category>

        <Category title="Holiday on a mountain">
          <PreviewSubCategory
            title="BG mountains"
            link="/forum/bg_mountains"
            categoryId="bg_mountains"
            lastPost="Last post from ..."
          />

          <PreviewSubCategory
            title="World mountains"
            link="/forum/world_mountains"
            categoryId="world_mountains"
            lastPost="Last post from ..."
          />
        </Category>

        <Category title="Historical landmarks">
          <PreviewSubCategory
            title="BG landmarks"
            link="/forum/bg_landmarks"
            categoryId="world_mountains"
            lastPost="Last post from ..."
          />

          <PreviewSubCategory
            title="World landmarks"
            link="/forum/world_landmarks"
            categoryId="world_landmarks"
            lastPost="Last post from ..."
          />
        </Category>
      </div>
    </ContentWrapper>
  );
}
