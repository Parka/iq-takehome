import { DIFFICULTY_COLORS, PILL_COLORS } from '@/const/global';
import IType from '@/types/Type';
import { toToggleURLSearchParams } from '@/utils/searchParams';
import Link from 'next/link';
import * as React from 'react';
import AutoComplete from './AutoComplete';
import IDifficulty from '@/types/Difficulty';
import ICompany from '@/types/Company';
import CompanyFilter from './CompanyFilter';

interface IFiltersProps {
  search?: URLSearchParams
}

const Filters: React.FunctionComponent<IFiltersProps> = async ({ search }) => {
  const [
    difficultyResponse,
    typesResponse,
    companiesResponse
  ] = await Promise.all([
    fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/difficulties`),
    fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/types`),
    fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/companies`)
  ])

  const difficulties: IDifficulty[] = await difficultyResponse.json()
  const types: IType[] = await typesResponse.json()
  const companies: ICompany[] = await companiesResponse.json()

  return (
    <section className='flex flex-col space-y-2'>
      <div>
        <h2 className='font-bold text-lg'>Filter by difficulty</h2>
        <ul className='flex flex-wrap space-x-3 space-y-2'>
          {
            difficulties.map(difficulty =>
              <li key={difficulty.id}>
                <Link className={`
                  ${DIFFICULTY_COLORS[(difficulty?.id || 1)-1]}
                  outline-blue-700 dark:outline-blue-200
                  ${search?.getAll("difficulty").includes(difficulty.id.toString()) ? 'outline-2' : 'outline-0'}
                  px-3 rounded-full text-nowrap
                `} href={`./?${toToggleURLSearchParams(search, 'difficulty', difficulty.id.toString())}`}>
                  {difficulty.value}
                </Link>
              </li>
            )
          }
        </ul>
      </div>
      <div>
        <h2 className='font-bold text-lg'>Filter by type</h2>
        <ul className='flex flex-wrap space-x-3 space-y-2'>
          {
            types.map(type =>
              <li key={type.id}>
                <Link className={`
                  ${PILL_COLORS[type?.id || 0]}
                  outline-blue-700 dark:outline-blue-200
                  ${search?.getAll("type").includes(type.value) ? 'outline-2' : 'outline-0'}
                  px-3 rounded-full text-nowrap
                `} href={`./?${toToggleURLSearchParams(search, 'type', type.value)}`}>
                  {type.value}
                </Link>
              </li>
            )
          }
        </ul>
      </div>
      <div>
        <h2 className='font-bold text-lg'>Filter by company</h2>
        <ul className='flex flex-wrap space-x-3 space-y-2'>
          <CompanyFilter companies={companies} />
        </ul>
      </div>
    </section>
  );
};

export default Filters;
