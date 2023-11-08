import { getAllUsers } from '@/services/users.services.js';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function ManageUsers() {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {

        setLoading(true);

        (async function () {
            try {
                const data = await getAllUsers();
                setUsers(data);

            } catch (error) {
                console.log(error.message)
            }
        })();
    }, []);
        return 
}
