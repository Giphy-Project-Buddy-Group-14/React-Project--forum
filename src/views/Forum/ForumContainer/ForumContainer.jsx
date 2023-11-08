import ContentWrapper from '@/components/ContentWrapper/ContentWrapper.jsx';
import { Outlet } from 'react-router-dom';
export default function ForumContainer() {
  return (
    <ContentWrapper>
      <div>
        <Outlet />
      </div>
    </ContentWrapper>
  );
}
