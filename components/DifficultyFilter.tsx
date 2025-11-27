'use client'

import { DIFFICULTY_COLORS } from '@/const/global';
import IDifficulty from '@/types/Difficulty';
import { parseAsInteger, useQueryState } from 'nuqs';
import * as React from 'react';
import { useTransition } from 'react';

interface IDifficultyFilterProps {
  difficulties: IDifficulty[]
}

const DifficultyFilter: React.FunctionComponent<IDifficultyFilterProps> = ({ difficulties }) => {
  const [_isLoading, startTransition] = useTransition()
  const [difficultyQuery, setDifficultyQuery] = useQueryState('difficulty',
    parseAsInteger.withDefault(0).withOptions({
      startTransition,
      shallow: false,
    })
  )

  return (
    <ul className='flex flex-wrap space-x-3 space-y-2'>
      {
        difficulties.map(difficulty =>
          <li key={difficulty.id}>
            <button
              onClick={() => setDifficultyQuery(
                difficultyQuery === difficulty.id ?
                  null
                  :
                  difficulty.id
              )
              }
              className={`
                ${DIFFICULTY_COLORS[(difficulty?.id || 1) - 1]}
                outline-blue-700 dark:outline-blue-200
                ${difficultyQuery === difficulty.id ? 'outline-2' : 'outline-0'}
                px-3 rounded-full text-nowrap
              `}
            >
              {difficulty.value}
            </button>
          </li>
        )
      }
    </ul>
  );
};

export default DifficultyFilter;
