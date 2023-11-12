import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function Author({author}) {


  return (
    <div className="text-sm leading-6">
      <p className="font-semibold text-gray-900">
        <span className="absolute inset-0" />
      </p>
      <p className="text-gray-600">
        {author.firstName} {author.lastName}
      </p>
    </div>
  );
}
