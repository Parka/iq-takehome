'use client'

import * as React from 'react';
import ICompany from '@/types/Company';
import { useQueryState } from 'nuqs';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { cn } from '@/lib/utils';

interface ICompanyFilterProps {
  companies: ICompany[]
  className?: string
}

const CompanyFilter: React.FunctionComponent<ICompanyFilterProps> = ({ companies, className }) => {
  const [_isLoading, startTransition] = React.useTransition()
  const [value, setValue] = useQueryState('company',
    {
      defaultValue: '',
      startTransition,
      shallow: false,
    }
  )

  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={className}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? companies.find((company) => company.value === value)?.value
            : "Select company..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search company..." className="h-9" />
          <CommandList>
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup>
              {companies.map((company) => (
                <CommandItem
                  key={company.id}
                  value={company.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {company.value}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === company.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
};

export default CompanyFilter;
