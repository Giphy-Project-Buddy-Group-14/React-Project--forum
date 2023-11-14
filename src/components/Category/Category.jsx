import Title from '../Title/Title';

export default function Category({ children, title }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-6 bg-opacity-50 backdrop-blur-md">
      <div className="mb-2 text-white text-2xl font-bold">{title}</div>
      <div className="grid grid-rows-1 lg:grid-rows-1">
        <div>{children}</div>
      </div>
    </div>
  );
}