
import Title from '../Title/Title';

export default function Category({children, title}) {
  return (
    <div>
      <div className="mb-8">
        <Title>{title}</Title>
      </div>
      <div className="grid grid-rows-1 lg:grid-rows-1">
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
