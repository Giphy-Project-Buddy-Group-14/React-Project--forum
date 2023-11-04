export default function Title(props) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">{props.children}</h2>
    </div>
  );
}
