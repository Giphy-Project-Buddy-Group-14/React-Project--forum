import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title/Title';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper';
import TimeStamp from '@/components/ui/TimeStamp';

export default function Profile() {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const goToEditProfile = () => {
    navigate('/settings');
  };

  return (
    <div id='profile'>
      <ContentWrapper>
        <div>
          <div className="font-sans w-full mt-24 flex flex-row justify-center items-center">
            <div className="card w-96 mx-auto bg-white bg-opacity-90 backdrop-blur-sm  rounded-2xl shadow-xl relative">
              <img
                className="inline-block h-20 w-20 rounded-full ring-white"
                style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '-40px' }}
                src={userData.profilePictureURL}
              />

              <div className="text-center mt-2 text-3xl font-medium pt-12">{userData.firstName} {userData.LastName}</div>
              <div className="text-center mt-2 font-light text-sm">@{userData.username}</div>
              <div className="text-center font-normal text-lg">{userData.email}</div>
              <div className="px-6 text-center pt-8">
                <Button onClick={goToEditProfile}> Edit profile </Button>
              </div>
              <hr className="mt-8" />
              <div className="flex p-4 justify-center">
                <div>
                  <TimeStamp date={userData.createdOn} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}
