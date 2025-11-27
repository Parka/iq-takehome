'use client'

import { ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Button } from './ui/button';

interface IBackButtonProps {
}

const BackButton: React.FunctionComponent<IBackButtonProps> = (props) => {
  const router = useRouter()
  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      size="icon"
      aria-label="Submit"
    >
      <ArrowBigLeft />
    </Button>
  );
};

export default BackButton;
