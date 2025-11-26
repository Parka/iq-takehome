'use client'

import { useRouter } from 'next/navigation';
import * as React from 'react';

interface IBackButtonProps {
}

const BackButton: React.FunctionComponent<IBackButtonProps> = (props) => {
  const router = useRouter()
  return (
    <button className='flex bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 h-8 w-8 rounded-4xl justify-center items-center' onClick={() => router.back()}>
      <i
        className='cursor-pointer fa-solid fa-arrow-left text-amber-400'
      />
    </button>
  );
};

export default BackButton;
