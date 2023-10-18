import { createContext } from 'react';

export type Filters = {
  columnSelected: string;
  comparisonSelected: string;
  valueSelected: string;
};

type DataContextType = {
  results: any;
  resultsFiltered: any;
  filteredName: string;
  filterList: Filters[];
  setFilteredName: (name:string) => void;
  setFilterList: (filterList:Filters[]) => void;
  onSubmitForm: (filters: Filters) => void;
  onClickButtonRemoveAll: () => void;
  onClickButtonRemove: (index:number) => void;
};

const dataContext = createContext<DataContextType>({} as DataContextType);

export default dataContext;
