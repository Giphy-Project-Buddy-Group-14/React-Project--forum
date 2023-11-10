import convertDate from '@/helpers/dateFormat';
export default function TimeStamp({ date }) {
  const timestamp = convertDate(date);

  return (
    <time
      dateTime={date}
      title={timestamp}
      className="text-gray-500"
    >
      {timestamp}
    </time>
  );
}
