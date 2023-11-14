import ContentWrapper from '@/components/ContentWrapper/ContentWrapper.jsx';
import { useEffect, useState } from 'react';
import { getUserByUsername } from '@/services/users.services';
import { TEAM_LIST } from '@/helpers/consts';

export default function About() {
  const [users, setUsers] = useState([]);

  const fetchUser = async (username) => {
    const user = await getUserByUsername(username);
    return user;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usernames = TEAM_LIST;
      const userPromises = usernames.map(async (username) => {
        const user = await fetchUser(username);
        return user;
      });

      const fetchedUsers = await Promise.all(userPromises);

      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  return (
    <div id='about'>
      <ContentWrapper>
        <div>
          <h1 className="h1-semibold mb-5 mt-8 text-white">About</h1>
          <div className="max-w-2xl">
            <h3 className="text-2xl font-semibold tracking-tight text-gray-900 text-white">
              Meet our leadership
            </h3>
          </div>

          <p className="mt-6 text-lg leading-8 text-black bg-white backdrop-blur-sm bg-opacity-90 rounded-lg overflow-hidden p-8">
            At the heart of our organization, we are guided by a dedicated and
            dynamic leadership team. Meet the individuals whose unwavering
            commitment and innovative vision steer us towards success. They are
            the driving force behind our mission, setting the course for a
            bright and promising future.
          </p>

          <div className="mt-6 text-lg leading-8 text-black bg-white backdrop-blur-sm bg-opacity-90 rounded-lg overflow-hidden p-8">
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              {users &&
                users.map((user) => (
                  <li key={user.uid}>
                    <div className="flex items-center gap-x-6">
                      <img
                        className="h-16 w-16 rounded-full"
                        src={user.profilePictureURL}
                        alt=""
                      />
                      <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm font-semibold leading-6 text-indigo-600">
                          Front-end Developer
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}
