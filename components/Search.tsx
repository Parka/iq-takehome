'use client'
import { useQueryState } from 'nuqs';
import { useId, useTransition } from 'react';
import { Input } from './ui/input';

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
      <Input
        placeholder='Search'
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
