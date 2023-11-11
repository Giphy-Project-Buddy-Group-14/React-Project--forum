import { getPosts } from '@/services/post.services.js';
import { useContext, useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast.js';
import PostCard from './PostCard.jsx';
import { Button } from '../ui/button.jsx';
import { AuthContext } from '@/context/AuthContext.jsx';

export default function PostList() {

    const [posts, setPosts] = useState([]);
    const [showCount, setShowCount] = useState(10); // New state for number of posts to show
    const { toast } = useToast();
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            try {
                const response = await getPosts()
                setPosts(response)
            } catch (error) {
                toast({
                    title: error.message
                })
            }
        })();
    }, []);

    const postToShow = posts.slice(0, showCount).map((el) => { // Use showCount instead of 10
        return <PostCard key={el.title} {...el} />
    })

    const loadMore = () => { // New function to load more posts
        setShowCount(prevCount => prevCount + 10);
    }

    return (
        <div>
            {postToShow}
            {isLoggedIn && showCount < posts.length && (<Button onClick={loadMore} className=''>Load More</Button>)}
        </div>
    )
}
