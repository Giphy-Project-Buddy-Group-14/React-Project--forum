export default function ContentWrapper(props) {
  return (
    <div className="py-5 sm:py-5">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-7xl lg:mx-0">{props.children}</div>
      </div>
    </div>
  );
}
