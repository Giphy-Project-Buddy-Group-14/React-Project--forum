import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title/Title';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper';

export default function Profile() {
  const { userData } = useContext(AuthContext);
  const { profilePictureURL, firstName, lastName, email, username } = userData;
  const fullName = `${firstName} ${lastName}`;
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
            className="inline-block h-40 w-40 rounded-full ring-2 ring-white"
            src={profilePictureURL}
            alt={firstName}
          />
        </div>
        <div>
          <dir>Name: {fullName}</dir>
          <dir>Email: {email}</dir>
          <dir>Username: {username}</dir>
          <div className="mt-6">
            <Button onClick={goToEditProfile}> Edit profile </Button>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
