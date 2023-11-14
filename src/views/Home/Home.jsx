import ContentWrapper from '@/components/ContentWrapper/ContentWrapper.jsx';
import PostList from '@/components/PostExplorer/PostList.jsx';

export default function Home() {
  return (
    <div id='home'>
      <ContentWrapper>
        <h1 className='h1-semibold mb-5 mt-8 text-white'>Home</h1>
        <p className='mb-10'>Welcome to our travel hub! Dive into a community
          of fellow adventurers sharing tales, tips, and the sheer joy of exploration.
          Whether you`re a seasoned traveler or just starting your journey, connect with like-minded enthusiasts.
          <br />
          <br />From hidden gems to well-loved destinations, swap stories, seek advice, and celebrate the beauty of diverse global travel.
          <br /> Let`s explore the world together, one conversation at a time!</p>
        <h3 className='text-2xl font-semibold'>Recently added posts</h3>
        <PostList />

      </ContentWrapper>
    </div>
  );
}
