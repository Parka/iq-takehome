'use client'
import { useQueryState } from 'nuqs';
import { useId, useTransition } from 'react';
import { Input } from './ui/input';

interface ISearchProps {
  className?: string
}

const Search: React.FunctionComponent<ISearchProps> = ({ className }) => {
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
    <Input
      placeholder='Search'
      value={search}
      type="text"
      name="search field"
      id={`search-${id}`}
      className={`flex flex-col space-x-2 ${className}`}
      onChange={e => setSearch(e.target.value)}
    />
  );
};

export default Search;
