export default function TimeStamp({date}) {

  return (
    <time
      dateTime={date}
      className="text-gray-500"
    >
      {date}
    </time>
  );
}
