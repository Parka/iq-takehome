'use client'

import { useSelect } from 'downshift';
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface ISortProps {
  search: URLSearchParams
}

const CRITERIAS = ['difficulty', 'type', 'company'];

const Sort: React.FunctionComponent<ISortProps> = ({ search }) => {
  const router = useRouter()
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    reset,
  } = useSelect({
    items: CRITERIAS,
    onSelectedItemChange: ({ selectedItem }) => {
      const newSearchParams = new URLSearchParams(search)
      if (selectedItem)
        newSearchParams.set('sort', selectedItem)
      else newSearchParams.delete('sort')
      router.push(`./?${newSearchParams}`)
    }
  })

  return (
    <div className='flex flex-row-reverse relative'>
      <span className='cursor-pointer capitalize' {...getToggleButtonProps()}>
        {selectedItem}<i className='fa-solid fa-sort text-amber-400' />
      </span>

      <ul className='
        absolute top-full z-10 bg-gray-50 text-black
        dark:bg-gray-950 dark:text-white'
        {...getMenuProps()}
      >
        {isOpen && selectedItem &&
          <li className='p-3 hover:bg-cyan-200 hover:text-black' onClick={reset}>
            X Clear sorting
          </li>
        }
        {isOpen &&
          CRITERIAS.map((criteria, index) => (
            <li className='p-3 capitalize hover:bg-cyan-200 hover:text-black' key={criteria} {...getItemProps({
              item: criteria,
              index,
            })}>
              {criteria}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Sort;
