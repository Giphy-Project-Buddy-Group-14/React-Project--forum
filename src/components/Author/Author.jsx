import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function Author() {
  const { userData } = useContext(AuthContext);

  return (
    <div className="text-sm leading-6">
      <p className="font-semibold text-gray-900">
        <span className="absolute inset-0" />
      </p>
      <p className="text-gray-600">
        {userData?.firstName} {userData?.lastName}
      </p>
    </div>
  );
}
