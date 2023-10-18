import { createContext } from 'react';

export type Filters = {
  columnSelected: string;
  comparisonSelected: string;
  valueSelected: string;
};

type DataContextType = {
  resultsFiltered: any;
  filteredName: string;
  filterList: Filters[];
  setFilteredName: (name:string) => void;
  setFilterList: (filterList:Filters[]) => void;
  onSubmitForm: (filters: Filters) => void;
  onClickButtonRemoveAll: () => void;
  onClickButtonRemove: (colunmSelected: string) => void;
};

const dataContext = createContext<DataContextType>({} as DataContextType);

export default dataContext;
