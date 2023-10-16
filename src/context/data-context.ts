import { createContext } from 'react';

type DataContextType = {
  results: any;
};

const dataContext = createContext({} as DataContextType);

export default dataContext;
