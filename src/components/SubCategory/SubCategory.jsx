import Title from '../Title/Title';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { TITLE_MAP } from '@/assets/posts';
import { getPostsByCategoryId } from '@/services/post.services';
import ContentWrapper from '../ContentWrapper/ContentWrapper.jsx';
import { Button } from '../ui/button';
import PostListItem from '@/views/Forum/SubCategory/PostListItem/PostListItem';
import { AuthContext } from '@/context/AuthContext.jsx';
import { getAllUsers } from '@/services/users.services';
import Filter from '@/views/Filter/Filter';
import DropDown from '@/views/DropDown/DropDown';

export default function SubCategory() {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState('createdOn');
  const [filters, setFilters] = useState({ Author: '' });
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async (categoryId, sortKey) => {
      const posts = await getPostsByCategoryId(categoryId, sortKey, filters);
      setPosts(posts);
    };
    fetchPosts(categoryId, sort);
  }, [categoryId, sort, filters]);

  useEffect(() => {
    (async function () {
      try {
        const data = await getAllUsers();
        const names = data.map((user) => ({
          label: user.username,
          checked: undefined,
        }));

        setFilters({ Authors: names });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const navigate = useNavigate();

  const newPostNavigation = () => {
    navigate('posts/new');
  };
  const title = TITLE_MAP[categoryId];

  return (
    <ContentWrapper>
      <div className="flex gap-8">
        <div>
          <Filter
            filters={filters}
            onChange={(selectedFilters) => {
              setFilters(selectedFilters);
            }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4 pb-4 text-sm justify-end">
            <div className="flex-1">
              <Title>{title}</Title>
            </div>
            Sorted by:
            <DropDown
              items={['author', 'title', 'createdOn', 'count']}
              onChange={(selectedItem) => {
                setSort(selectedItem);
              }}
              selected={sort}
              placeholder="Select a sort option"
            />
          </div>

          <ul
            role="list"
            className="divide-y divide-gray-100"
          >
            {(posts || []).map((post) => (
              <PostListItem
                key={post.id}
                post={post}
              />
            ))}
          </ul>

          {!userData.isBlocked && (
            <Button onClick={newPostNavigation}>Create Post</Button>
          )}
        </div>
      </div>
    </ContentWrapper>
  );
}
