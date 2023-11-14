import { getAllUsers } from '@/services/users.services.js';
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input } from '../ui/input.jsx';
import UserDetails from './UserDetails.jsx';
import { useToast } from '../ui/use-toast.js';
import searchImage from '@/assets/search.svg';

export default function ManageUsers() {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const initialUsers = useRef([]);

    const { toast } = useToast();

    const navigate = useNavigate();

    useEffect(() => {

        setLoading(true);

        (async function () {
            try {
                const data = await getAllUsers();
                setUsers(data);
                initialUsers.current = data;

            } catch (error) {
                toast({
                    title: error.message
                })
            }
        })();
    }, []);

    useEffect(() => {
        if (!users) {
            return;
        }
        const updatedUsers = initialUsers.current.filter(user => {
            return user.username.startsWith(searchValue) 
            || user.email.startsWith(searchValue)
            || user.firstName.startsWith(searchValue)
            || user.lastName.startsWith(searchValue)
            || (user.firstName + ' ' + user.lastName).startsWith(searchValue)
        });
        setUsers(updatedUsers);
    }, [searchValue])

    const userToShow = users.map(user => {
        return <UserDetails key={user.uid} {...user} />
    });

    return (
        <div className="explore-container text-black">
            <div className="explore-inner_container">
                <h2 className="h3-bold md:h2-bold w-full">Search and manage users</h2>
                <div className="flex gap-1 px-4 w-full rounded-lg bg-light-2">
                    <img
                        src={searchImage}
                        width={24}
                        height={24}
                        alt="search"
                        className='r-0'
                    />
                    <Input
                        type="text"
                        placeholder="Search by username, email or name"
                        className="explore-search"
                        value={searchValue}
                        onChange={(e) => {
                            const { value } = e.target;
                            setSearchValue(value);
                        }}
                    />
                </div>
            <div className='flex flex-wrap gap-10'>
            {userToShow}
            </div>
            </div>
        </div>
    );
}
