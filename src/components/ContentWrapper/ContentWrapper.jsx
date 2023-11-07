export default function ContentWrapper(props) {
  return (
    <div className="bg-white py-5 sm:py-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">{props.children}</div>
      </div>
    </div>
  );
}
