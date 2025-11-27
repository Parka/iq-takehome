'use client'

import * as React from 'react';
import Downshift from 'downshift';
import fuzzaldrin from 'fuzzaldrin-plus';
import { Input } from './ui/input';

interface IAutoCompleteProps {
  items: { value: string }[]
  initialSelectedItem?: any
  onChange?: (selected: any) => void
  placeholder?: string
}

const AutoComplete: React.FunctionComponent<IAutoCompleteProps> = ({ items, onChange, initialSelectedItem, placeholder }) => {
  const fuzzyFilter = (input: string | null) => fuzzaldrin.filter(items, input || "", { key: "value" })
  return (
    <Downshift
      initialSelectedItem={initialSelectedItem}
      itemToString={item => item?.value}
      onChange={selected => onChange?.(selected)}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
        clearSelection,
      }) => (
        <div className='relative flex flex-row space-x-4'>
          <div
            className='inline-block border-2'
            {...getRootProps({}, { suppressRefError: true })}
          >
            <Input {...getInputProps()} placeholder={placeholder} />
          </div>
          <ul
            className='absolute z-10 top-full'
            {...getMenuProps()}
          >
            {isOpen
              ? fuzzyFilter(inputValue)
                .map((item, index) => (
                  <li
                    key={item.value}
                    {...getItemProps({
                      index,
                      item,
                      className: `
                        ${selectedItem === item ?
                          'font-bold' : ''
                        }
                        ${highlightedIndex === index ?
                          'bg-cyan-200 text-black'
                          :
                          `
                            bg-gray-50 text-black
                            dark:bg-gray-950 dark:text-white
                          `
                        }
                      `,
                    })}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: fuzzaldrin.wrap(item.value, inputValue || "")
                      }}
                    />
                  </li>
                ))
              : null}
          </ul>
          <button
            onClick={() => clearSelection()}
            disabled={!selectedItem}
            className='disabled:text-gray-400 cursor-pointer disabled:cursor-default'
          >
            X Clear Filter
          </button>
        </div>
      )}
    </Downshift>
  );
};

export default AutoComplete;
