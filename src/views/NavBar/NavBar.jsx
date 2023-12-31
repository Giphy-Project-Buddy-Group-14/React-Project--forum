
import { Fragment, useContext, useEffect, useState } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext.jsx';
import { logoutUser } from '@/services/auth.services.js';
import { useToast } from '@/components/ui/use-toast.js';
import { Button } from '@/components/ui/button.jsx';
import logoImage from '@/assets/logo.png';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/forum' },
  { name: 'About', href: '/about' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUser, isLoggedIn, userData } = useContext(AuthContext);
  const [picture, setPicture] = useState(userData?.profilePictureURL);

  useEffect(() => {

    userData && setPicture(userData?.profilePictureURL);
  }, [userData])

  const handleLogOut = async () => {
    try {
      await logoutUser();
      setUser({
        user: null,
        userData: {}
      })
      toast({
        title: "Successful log out",
      });

      setTimeout(() => {
        navigate('/home');
      }, 500);
    } catch (error) {
      toast({
        title: "Error log out",
        description: error.message,
      })
    }
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items- stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src={logoImage}
                    alt="Group 14"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
                {(isLoggedIn && !userData.isBlocked) && <Button className='ml-5' asChild>
                  <Link to='forum/welcome/posts/new'>Create Post</Link>
                </Button>}
              </div>
              {userData.isBlocked && (<Button className='bg-red' asChild>
                <Link to='/about'>You are currently blocked. Contact admin for info.</Link>
              </Button>)}
              {isLoggedIn ? (<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {!picture ? (<UserCircleIcon
                        className="h-8 w-8 rounded-full text-gray-300"
                      />) : (<img src={picture} alt="profile-img"
                        className="h-8 w-8 rounded-full" />)}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </NavLink>
                        )}
                      </Menu.Item>
                      {userData.role === 'admin' && (<Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/manage-users"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Manage users
                          </NavLink>
                        )}
                      </Menu.Item>)}
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/settings"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={handleLogOut}
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>)
                : (
                  <>
                    <Button className="mr-5" asChild>
                      <Link to="/sign-in">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/sign-up">Register</Link>
                    </Button>
                  </>
                )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}