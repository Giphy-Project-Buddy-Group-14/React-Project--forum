import Title from '../Title/Title';

export default function Category({ children, title }) {
  return (
    <div>
      <Title>{title}</Title>
      <div className="mb-8"></div>
      <div className="grid grid-rows-1 lg:grid-rows-1">
        <div>{children}</div>
      </div>
    </div>
  );
}
