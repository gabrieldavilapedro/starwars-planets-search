import { useState, useEffect } from 'react';
import dataContext from './data-context';
import { getInfoStarWars } from '../services/chamaAPI';

type Props = {
  children: React.ReactNode;
};

function DataProvider({ children }: Props) {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getInfoStarWars();
      setResults(data);
    }
    fetchData();
  }, []);

  return (
    <dataContext.Provider value={ { results } }>
      {children}
    </dataContext.Provider>
  );
}

export default DataProvider;
