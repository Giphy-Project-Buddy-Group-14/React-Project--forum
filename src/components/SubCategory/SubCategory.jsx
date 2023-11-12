import Title from '../Title/Title';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { TITLE_MAP } from '@/assets/posts';
import { getPostsByCategoryId } from '@/services/post.services';
import ContentWrapper from '../ContentWrapper/ContentWrapper.jsx';
import { Button } from '../ui/button';
import PostListItem from '@/views/Forum/SubCategory/PostListItem/PostListItem';
import DropDown from '@/views/sharedComponents/DropDown/DropDown';
import { AuthContext } from '@/context/AuthContext.jsx';


export default function SubCategory() {

  const { categoryId } = useParams();
  const [posts, setPosts] = useState([])
  const [sort, setSort] = useState('createdOn');
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async (categoryId, sortKey) => {
      const posts = await getPostsByCategoryId(categoryId, sortKey);
      setPosts(posts)
    }
    fetchPosts(categoryId, sort)
  }, [categoryId, sort])

  const navigate = useNavigate()

  const newPostNavigation = () => {
    navigate('posts/new')
  }
  const title = TITLE_MAP[categoryId];

  console.log('posts', posts);

  return (
    <ContentWrapper>
      <div>
        <Title>{title}</Title>

        <div className='flex items-center gap-2'>
          Sorted by:
          <DropDown
            items={['author', 'title', 'createdOn', 'count']}
            onChange={(selectedItem) => { setSort(selectedItem) }}
            selected={sort}
            placeholder="Select a sort option"
          />
        </div>

        <ul role="list" className="divide-y divide-gray-100">
          {(posts || []).map((post) => <PostListItem key={post.id} post={post} />)}
        </ul>

        {!userData.isBlocked && (<Button onClick={newPostNavigation}>
          New Post
        </Button>)}
      </div>
    </ContentWrapper>
  );
}

