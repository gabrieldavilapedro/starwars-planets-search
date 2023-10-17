import { createContext } from 'react';

export type Filters = {
  columnSelected: string;
  comparisonSelected: string;
  valueSelected: number | string;
};

type DataContextType = {
  results: any;
  resultsFiltered: any;
  filters: Filters;
  filteredName: string;
  setFilters: (filters:Filters) => void;
  setFilteredName: (name:string) => void;
  onClickButtonFilter: () => void;
};

const dataContext = createContext<DataContextType>({} as DataContextType);

export default dataContext;
