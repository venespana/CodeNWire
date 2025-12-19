import { Link, Skeleton } from '@heroui/react';
import { CircleX } from 'lucide-react';

import { useCheckDependencies } from '../api/use-check-dependencies';

const validations = [
  {
    id: 'arduino-cli',
    label: 'Arduino CLI',
    href: 'https://docs.arduino.cc/arduino-cli/installation/',
  },
];

const Doctor = () => {
  const { data, isLoading } = useCheckDependencies(['arduino-cli']);
  console.log(data);

  return (
    <div className='flex flex-col'>
      <div>
        <h2 className='text-lg font-semibold'>Requirements analysis</h2>
      </div>
      <ul className='text-sm flex flex-col gap-2 py-1.5'>
        {validations.map(validation =>
          isLoading ? (
            <li key={validation.id} className='flex gap-2 items-center'>
              <Skeleton className='h-3 w-full rounded-md' />
            </li>
          ) : (
            <li key={validation.id} className='flex gap-2 items-center'>
              <CircleX size={14} className='text-red-500' />
              <Link isExternal showAnchorIcon href={validation.href as any} color='foreground' size='sm'>
                {validation.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Doctor;
