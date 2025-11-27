'use client'

import { useQueryState } from 'nuqs';
import * as React from 'react';
import { useTransition } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ISortProps { }

const CRITERIAS = ['difficulty', 'type', 'company'];

const Sort: React.FunctionComponent<ISortProps> = (props) => {
  const [_isLoading, startTransition] = useTransition()
  const [sort, setSort] = useQueryState('sort',
    {
      defaultValue: '',
      startTransition,
      shallow: false,
    }
  )

  return (
    <div className='flex flex-row-reverse relative'>
      <Select value={sort} onValueChange={setSort} >
        <SelectTrigger>
          <SelectValue hidden={!sort}/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {
              CRITERIAS.map((criteria) => (
                <SelectItem
                  key={criteria}
                  value={criteria}
                  onClick={() => { if (criteria === sort) setSort(null) }}
                >
                  {criteria}
                </SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
