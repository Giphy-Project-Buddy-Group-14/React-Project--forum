import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title/Title';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper';

export default function Profile() {
  const { userData } = useContext(AuthContext);

  const navigate = useNavigate();
  const goToEditProfile = () => {
    navigate('/settings');
  };

  return (
    <ContentWrapper>
      <Title>Profile</Title>
      <div className="flex p-6">
        <div className="flex -space-x-2 overflow-hidden mr-4">
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div>
          <dir>{userData.firstName}</dir>
          <dir>{userData.lastName}</dir>
          <dir>{userData.email}</dir>
          <dir>{userData.username}</dir>
          <div className="mt-6">
            <Button onClick={goToEditProfile}> Edit profile </Button>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
