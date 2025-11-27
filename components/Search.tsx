'use client'
import { useQueryState } from 'nuqs';
import { useEffect, useId, useTransition } from 'react';

interface ISearchProps {
}

const Search: React.FunctionComponent<ISearchProps> = (props) => {
  const id = useId()
  const [_isLoading, startTransition] = useTransition()
  const [search, setSearch] = useQueryState('search',
    {
      defaultValue: '',
      startTransition,
      shallow: false,
      limitUrlUpdates: {
        method: 'debounce',
        timeMs: 800,
      }
    }
  )

  return (
    <section className='flex flex-col space-x-2 pb-4'>
      <label
        htmlFor={`search-${id}`}
        className='font-bold text-lg'
      >
        Search
      </label>
      <input
        value={search}
        type="text"
        name="search field"
        id={`search-${id}`}
        className='border-2'
        onChange={e => setSearch(e.target.value)}
      />
    </section>
  );
};

export default Search;
