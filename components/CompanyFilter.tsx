'use client'

import * as React from 'react';
import AutoComplete from './AutoComplete';
import ICompany from '@/types/Company';
import { useRouter, useSearchParams } from 'next/navigation';

interface ICompanyFilterProps {
  companies: ICompany[]
}

const CompanyFilter: React.FunctionComponent<ICompanyFilterProps> = ({ companies }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <AutoComplete
      items={companies}
      onChange={
        selected => {
          const newSearchParams = new URLSearchParams(searchParams.toString())
          if (selected?.value)
            newSearchParams.set('company', selected.value)
          else
            newSearchParams.delete('company')
          router.push(`./?${newSearchParams}`)
        }
      }
    />
  );
};

export default CompanyFilter;
