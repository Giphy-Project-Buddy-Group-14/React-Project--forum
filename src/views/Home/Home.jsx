import ContentWrapper from '@/components/ContentWrapper/ContentWrapper.jsx';
import Title from '../../components/Title/Title';
import HomeSheet from './HomeSheet/HomeSheet';

export default function Home() {
  return (
    <ContentWrapper>
      <h1 className='mb-5'>Home</h1>
      <p className='mb-10'>Welcome to our travel hub! Dive into a community 
        of fellow adventurers sharing tales, tips, and the sheer joy of exploration.
         Whether you're a seasoned traveler or just starting your journey, connect with like-minded enthusiasts. 
         From hidden gems to well-loved destinations, swap stories, seek advice, and celebrate the beauty of diverse global travel. 
        <br /> Let's explore the world together, one conversation at a time!</p>
      <HomeSheet></HomeSheet>

    </ContentWrapper>
  );
}
