import IType from '@/types/Type';
import * as React from 'react';
import IDifficulty from '@/types/Difficulty';
import ICompany from '@/types/Company';
import CompanyFilter from './CompanyFilter';
import TypeFilter from './TypeFilter';
import DifficultyFilter from './DifficultyFilter';

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
    <section className='flex flex-col space-y-2'>
      <div>
        <h2 className='font-bold text-lg'>Filter by difficulty</h2>
        <DifficultyFilter difficulties={difficulties} />
      </div>
      <div>
        <h2 className='font-bold text-lg'>Filter by type</h2>
        <TypeFilter types={types} />
      </div>
      <div>
        <h2 className='font-bold text-lg'>Filter by company</h2>
        <div className='flex flex-wrap space-x-3 space-y-2'>
          <CompanyFilter companies={companies} />
        </div>
      </div>
    </section>
  );
};

export default Filters;
