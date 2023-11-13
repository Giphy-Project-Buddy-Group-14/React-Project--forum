export default function Title(props) {
  return (
    <div>
      <h3 className="relative z-10 rounded-full bg-gray-800 px-3 py-1.5 font-medium text-white">{props.children}</h3>
    </div>
  );
}
