import { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast.js';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import _ from "lodash";
import moment from 'moment';
import { blockUser, makeAdminUser, removeAdminUser, unblockUser } from '@/services/users.services.js';
import { getPostsByAuthor } from '@/services/post.services.js';

export default function UserDetails(user) {

    const [postCount, setPostCount] = useState('');
    const [isBlocked, setIsBlocked] = useState(user.isBlocked);
    const [isAdmin, setIsAdmin] = useState(user.role === 'admin');
    const { toast } = useToast();

    const handleBlock = async () => {
        try {
            await blockUser(user.username);
            setIsBlocked(true);
        } catch (error) {
            toast({
                title: error.message
            })
        }
    }

    const handleUnblock = async () => {
        try {
            await unblockUser(user.username);
            setIsBlocked(false);
        } catch (error) {
            toast({
                title: error.message
            });
        }
    }

    const handleMakeAdmin = async () => {
        try {
            await makeAdminUser(user.username);
            setIsAdmin(true);
        } catch (error) {
            toast({
                title: error.message
            });
        }
    }

    const handleRemoveAdmin = async () => {
        try {
            await removeAdminUser(user.username);
            setIsAdmin(false);
        } catch (error) {
            toast({
                title: error.message
            });
        }
    }

    useEffect(() => {

       (async () => {
        try {
           const countPost = (await getPostsByAuthor(user.username)).length
           setPostCount(countPost);
        } catch (error) {
            toast({
                title: error.message
            });
        }
       })();
    });

    return (
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg"
            style={{ width: '300px' }}>
            <div className="border-b px-4 pb-6">
                <div className="text-center my-4">
                    {!user?.profilePictureURL ? (<UserCircleIcon
                        className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4 text-gray-300" />
                    ) : (
                        <img src={user.profilePictureURL} alt="profile-img"
                            className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4" />)}
                    <div className="py-2">
                        <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{user.firstName + ' ' + user.lastName}</h3>
                        <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                            @ {user.username}
                        </div>
                        <p className="text-gray-500">Email: {user.email}</p>
                        <p className="text-gray-500">Created on: {moment(user.createdOn).format('DD-MM-YYYY')}</p>
                    </div>
                </div>
                <div className="flex gap-2 px-2">

                    {isBlocked ? (
                        <button onClick={handleUnblock}
                            className="flex-1 rounded-full bg-gray-600 dark:bg-gray-800 text-white dark:text-white antialiased font-bold hover:bg-gray-800 dark:hover:bg-gray-900 px-4 py-2">
                            Unblock
                        </button>
                    ) : (
                        <button onClick={handleBlock}
                            className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                            Block
                        </button>)}
                    {isAdmin ? (
                        <button onClick={handleRemoveAdmin}
                            className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                            Demote
                        </button>) : (
                        <button onClick={handleMakeAdmin}
                            className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                            Admin
                        </button>)}
                </div>
            </div>
            <div className="px-4 py-4">
                <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
                    <span><strong className="text-black dark:text-white">{postCount}</strong> Posts created</span>
                </div>
            </div>
        </div>
    );
}
