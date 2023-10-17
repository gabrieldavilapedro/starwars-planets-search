import { createContext } from 'react';

type DataContextType = {
  results: any;
  filterInput: (filterText: string) => void;
};

const dataContext = createContext<DataContextType>({} as DataContextType);

export default dataContext;
