'use client'

import { PILL_COLORS } from '@/const/global';
import IType from '@/types/Type';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { useTransition } from 'react';
import { Badge } from './ui/badge';

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
    <ul className='flex flex-wrap space-x-3 space-y-2'>
      {
        types.map(type =>
          <li key={type.id}>
            <Badge
              onClick={() => setTypeQuery(
                typeQuery === type.value ?
                  null
                  :
                  type.value
              )}
              className={`
                ${PILL_COLORS[type?.id || 0]}
                outline-blue-700 dark:outline-blue-200
                ${typeQuery === type.value ? 'outline-2' : 'outline-0'}
                px-3 rounded-full text-nowrap
              `}
            >
              {type.value}
            </Badge>
          </li>
        )
      }
    </ul>
  );
};

export default TypeFilter;
