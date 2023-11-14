import loaderImage from '@/assets/loader.svg';

export default function Loader() {
  return (
    <div className="flex-center w-full">
      <img
        src={loaderImage}
        alt="loader"
        width={24}
        height={24}
      />
    </div>
  );
}
