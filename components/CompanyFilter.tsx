'use client'

import * as React from 'react';
import AutoComplete from './AutoComplete';
import ICompany from '@/types/Company';
import { useQueryState } from 'nuqs';

interface ICompanyFilterProps {
  companies: ICompany[]
}

const CompanyFilter: React.FunctionComponent<ICompanyFilterProps> = ({ companies }) => {
  const [_isLoading, startTransition] = React.useTransition()
  const [company, setCompany] = useQueryState('company',
    {
      defaultValue: '',
      startTransition,
      shallow: false,
    }
  )

  return (
    <AutoComplete
      items={companies}
      initialSelectedItem={companies.find(c => c.value === company)}
      onChange={
        selected => {
          setCompany(selected?.value || "")
        }
      }
      placeholder='Company name'
    />
  );
};

export default CompanyFilter;
