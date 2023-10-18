import { createContext } from 'react';

export type Filters = {
  columnSelected: string;
  comparisonSelected: string;
  valueSelected: string;
};

export type Sort = {
  columnSelected: string;
  orderSelected: string;
};

type DataContextType = {
  resultsFiltered: any;
  filteredName: string;
  filterList: Filters[];
  setSort: (sort:Sort) => void;
  setFilteredName: (name:string) => void;
  setFilterList: (filterList:Filters[]) => void;
};

const dataContext = createContext<DataContextType>({} as DataContextType);

export default dataContext;
