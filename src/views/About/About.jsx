import ContentWrapper from '@/components/ContentWrapper/ContentWrapper.jsx';
import { useEffect, useState } from 'react';
import { getUserByUsername } from '@/services/users.services';
export default function About() {
  const [users, setUsers] = useState([]);

  const fetchUser = async (username) => {
    const user = await getUserByUsername(username);
    return user;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const user1 = await fetchUser('niki');
      const user2 = await fetchUser('sruchi');
      const user3 = await fetchUser('koko');
      // const user4 = await fetchUser('test');
      const users = [user1, user2, user3]
      setUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <ContentWrapper>
      <div>
        <h1 className="h1-semibold mb-5 mt-8">About</h1>
        <div className="max-w-2xl">
          <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
            Meet our leadership
          </h3>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            At the heart of our organization, we are guided by a dedicated and
            dynamic leadership team. Meet the individuals whose unwavering
            commitment and innovative vision steer us towards success. They are
            the driving force behind our mission, setting the course for a
            bright and promising future.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2 mt-12"
        >
          {users &&
            users.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={person.profilePictureURL}
                    alt=""
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {person.firstName} {person.lastName}
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
    </ContentWrapper>
  );
}
