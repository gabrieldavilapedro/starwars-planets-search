import { createContext } from 'react';

export type Filters = {
  columnSelected: string;
  comparisonSelected: string;
  valueSelected: string;
};

type DataContextType = {
  results: any;
  resultsFiltered: any;
  filters: Filters;
  filteredName: string;
  filterList: Filters[];
  setFilters: (filters:Filters) => void;
  setFilteredName: (name:string) => void;
  setFilterList: (filterList:Filters[]) => void;
  onClickButtonFilter: () => void;
  onClickButtonRemoveAll: () => void;
  onClickButtonRemove: (index:number) => void;
};

const dataContext = createContext<DataContextType>({} as DataContextType);

export default dataContext;
