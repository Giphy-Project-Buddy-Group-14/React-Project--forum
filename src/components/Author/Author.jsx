
export default function Author({ author }) {


  return (
    <div className="leading-6">
      <p className="text-gray-600">
        {author.firstName} {author.lastName}
      </p>
    </div>
  );
}
