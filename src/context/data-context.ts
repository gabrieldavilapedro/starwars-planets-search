import { createContext } from 'react';

export type Filters = {
  name: string;
  columnSelected: string;
  comparisonSelected: string;
  valueSelected: number | string;
};

type DataContextType = {
  results: any;
  resultsFiltered: any;
  filters: Filters;
  setFilters: (filters:Filters) => void;
  onClickButtonFilter: () => void;
};

const dataContext = createContext<DataContextType>({} as DataContextType);

export default dataContext;
