export default function Title(props) {
  return (
    <div>
      <h3 className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 ">{props.children}</h3>
    </div>
  );
}
