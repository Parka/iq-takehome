'use client'

import IType from '@/types/Type';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { useTransition } from 'react';
import { Badge } from './ui/badge';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

interface ITypeFilterProps {
  types: IType[]
}

const TypeFilter: React.FunctionComponent<ITypeFilterProps> = ({ types }) => {
  const [_isLoading, startTransition] = useTransition()
  const [typeQuery, setTypeQuery] = useQueryState('type',
    {
      defaultValue: '',
      startTransition,
      shallow: false,
    }
  )

  return (
    <ToggleGroup
      type='single'
      variant='outline'
      spacing={1}
      size={'sm'}
      className='flex flex-wrap'
      value={typeQuery}
    >
      {
        types.map(type =>
          <ToggleGroupItem
            key={type.id}
            value={type.value}
            onClick={() => setTypeQuery(
              typeQuery === type.value ?
                null
                :
                type.value
            )}
          >
            {type.value}
          </ToggleGroupItem>
        )
      }
    </ToggleGroup>
  );
};

export default TypeFilter;