export default function Title(props) {
  return (
    <div>
      <h3 className="text-1xl font-bold tracking-tight text-gray-900 sm:text-2xl">{props.children}</h3>
    </div>
  );
}
