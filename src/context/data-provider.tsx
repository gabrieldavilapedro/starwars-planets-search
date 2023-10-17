import { useState, useEffect } from 'react';
import dataContext from './data-context';
import { getInfoStarWars } from '../services/chamaAPI';

type Props = {
  children: React.ReactNode;
};

function DataProvider({ children }: Props) {
  const [results, setResults] = useState<any[]>([]);

  const filterInput = (filterText: string) => {
    const tolower = filterText.toLowerCase();
    const filter = results
      .filter((result: any) => result.name
        .toLowerCase()
        .includes(tolower));
    setResults(filter);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getInfoStarWars();
      setResults(data);
    }
    fetchData();
  }, []);

  return (
    <dataContext.Provider value={ { results, filterInput } }>
      {children}
    </dataContext.Provider>
  );
}

export default DataProvider;
