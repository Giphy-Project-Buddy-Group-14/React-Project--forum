import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, deletePostById } from '@/services/post.services';
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper.jsx';
import { useEffect, useState, useContext } from 'react';
import Heart from '@/components/ui/Heart';
import CountView from '@/components/ui/CountView';
import LoadingIndicator from '@/components/ui/Loading';
import convertDate from '@/helpers/dateFormat';
import TimeStamp from '@/components/ui/TimeStamp';
import Author from '@/components/Author/Author';
export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [createdOnDate, setCreatedOnDate] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const fetchPost = async (postId) => {
      const post = await getPostById(postId);
      setPost(post);
      const date = convertDate(post.createdOn);
      setCreatedOnDate(date);
    };
    fetchPost(postId);

    setLoading(false);
  }, [postId]);

  const editPost = () => {
    navigate(`edit`);
  };

  const deletePost = async () => {
    await deletePostById(postId);
    navigate(`../..`);
  };

  return (
    <ContentWrapper>
      {loading && <LoadingIndicator />}
      <div>
        <div id={postId}></div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
              {createdOnDate && <TimeStamp date={createdOnDate}></TimeStamp>}

              <div className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                <Heart />
              </div>

              <div className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                <CountView />
              </div>
            </div>

            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <p>
                  <span className="absolute inset-0" />
                  {post.title}
                </p>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {post.description}
              </p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
              <img
                src="https://marketplace.canva.com/EAFOWUXOOvs/1/0/1600w/canva-green-gradient-minimalist-simple-instagram-profile-picture-tBlf3wVYGhg.jpg"
                alt=""
                className="h-10 w-10 rounded-full bg-gray-50"
              />

              <Author />
            </div>
          </article>

          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={editPost}
            >
              Edit Post
            </button>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={deletePost}
            >
              Delete Post
            </button>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
