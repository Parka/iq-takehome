import IType from '@/types/Type';
import * as React from 'react';
import IDifficulty from '@/types/Difficulty';
import ICompany from '@/types/Company';
import CompanyFilter from './CompanyFilter';
import TypeFilter from './TypeFilter';
import DifficultyFilter from './DifficultyFilter';
import { Separator } from './ui/separator';
import Search from './Search';

interface IFiltersProps { }

const Filters: React.FunctionComponent<IFiltersProps> = async (props) => {
  const [
    difficultyResponse,
    typesResponse,
    companiesResponse
  ] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/difficulties`),
    fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/types`),
    fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/companies`)
  ])

  const difficulties: IDifficulty[] = await difficultyResponse.json()
  const types: IType[] = await typesResponse.json()
  const companies: ICompany[] = await companiesResponse.json()

  return (
    <section className='flex flex-col space-y-4 mb-4'>
      <div className='
        grid grid-flow-row space-y-4
        auto-cols-max
        space-x-4 
      '>
        <div className='md:mb-0'>
          <Search />
        </div>
        <CompanyFilter companies={companies} className='
          sm:row-start-2 sm:mb-0
          md:row-start-auto md:col-start-2 md:justify-self-center
        ' />
        <DifficultyFilter difficulties={difficulties} className='
          sm:row-start-2 sm:mb-0
          md:row-start-auto md:col-start-3 md:justify-self-end
        ' />
      </div>
      <TypeFilter types={types} />
      <Separator />
    </section>
  );
};

export default Filters;
