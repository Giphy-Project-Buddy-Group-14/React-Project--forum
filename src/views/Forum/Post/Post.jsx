import Title from '../../../components/Title/Title';
import { useParams } from 'react-router-dom';
import { POSTS } from '../../../assets/posts';
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper.jsx';
export default function Post() {
  const { postId } = useParams();

  const post = POSTS.find((post) => post.postId === postId);

  return (
    <ContentWrapper>
      <div>
        <Title>{post.title}</Title>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article
            // key={post.id}
            className="flex max-w-xl flex-col items-start justify-between"
          >
            <div className="flex items-center gap-x-4 text-xs">
              <time
                dateTime={new Date()
                  .toISOString()
                  .slice(0, 10)
                  .split('-')
                  .reverse()
                  .join('/')}
                className="text-gray-500"
              >
                {new Date()
                  .toISOString()
                  .slice(0, 10)
                  .split('-')
                  .reverse()
                  .join('/')}
              </time>
              <Title>Count view</Title>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <p>
                  <span className="absolute inset-0" />
                  Post Title
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
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <span className="absolute inset-0" />
                </p>
                <p className="text-gray-600">FirstName LastName</p>

              </div>
            </div>
          </article>
        </div>
      </div>
    </ContentWrapper>
  );
}
