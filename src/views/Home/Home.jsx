import Content from '../Content/Content';
import Title from '../../components/Title/Title';
import PostBody from '../../components/PostBody/PostBody';
export default function Home() {
  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <Title>Home</Title>
            <PostBody>
              Learn how to grow your business with our expert advice.
            </PostBody>
          </div>
        </div>
      </div>
      <Content />
    </>
  );
}
