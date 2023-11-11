import { getPosts } from '@/services/post.services.js';
import { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast.js';
import PostCard from './PostCard.jsx';

export default function PostList() {

    const [posts, setPosts] = useState([]);
    const { toast } = useToast();

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

    const postToShow = posts.slice(0, 10).map((el) => {
        return <PostCard key={el.title} {...el} />
    })

    return (
        <div>{postToShow}</div>
    )
}
