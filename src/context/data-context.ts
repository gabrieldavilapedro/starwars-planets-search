import { createContext } from 'react';

type Filters = {
  name: string;
};

type DataContextType = {
  results: any;
  resultsFiltered: any;
  filters: Filters;
  setFilters: (filters:Filters) => void;
};

const dataContext = createContext<DataContextType>({} as DataContextType);

export default dataContext;
