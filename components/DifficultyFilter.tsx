'use client'

import IDifficulty from '@/types/Difficulty';
import { parseAsInteger, useQueryState } from 'nuqs';
import * as React from 'react';
import { useTransition } from 'react';
import { Toggle } from './ui/toggle';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

interface IDifficultyFilterProps {
  difficulties: IDifficulty[]
  className?: string
}

const DifficultyFilter: React.FunctionComponent<IDifficultyFilterProps> = ({ difficulties, className }) => {
  const [_isLoading, startTransition] = useTransition()
  const [difficultyQuery, setDifficultyQuery] = useQueryState('difficulty',
    parseAsInteger.withDefault(0).withOptions({
      startTransition,
      shallow: false,
    })
  )

  return (
    <ToggleGroup
      type='single'
      variant="outline"
      value={difficultyQuery.toString()}
      className={className}
    >
      {
        difficulties.map(difficulty =>
          <ToggleGroupItem
            key={difficulty.id}
            value={difficulty.id.toString()}
            onClick={() => setDifficultyQuery(
              difficultyQuery === difficulty.id ?
                null
                :
                difficulty.id
            )}
            className={`
              outline-blue-700 dark:outline-blue-200
              ${difficultyQuery === difficulty.id ? 'outline-2' : 'outline-0'}
              px-3 rounded-full text-nowrap
            `}          >
            {difficulty.value}
          </ToggleGroupItem>
        )
      }
    </ToggleGroup>
  );
};

export default DifficultyFilter;
