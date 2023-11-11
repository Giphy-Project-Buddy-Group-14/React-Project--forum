import Title from '../Title/Title';

export default function Category({ children, title }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div style={{fontSize: '2em', fontWeight: 'bold'}}>{title}</div>
      <div className="mb-8"></div>
      <div className="grid grid-rows-1 lg:grid-rows-1">
        <div>{children}</div>
      </div>
    </div>
  );
}