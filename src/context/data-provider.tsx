import { useState, useEffect } from 'react';
import dataContext from './data-context';
import { getInfoStarWars } from '../services/chamaAPI';

type Props = {
  children: React.ReactNode;
};

function DataProvider({ children }: Props) {
  const [results, setResults] = useState<any[]>([]);
  const [resultsFiltered, setResultsFiltered] = useState<any[]>(results);
  const [filters, setFilters] = useState({ name: '' });
  useEffect(() => {
    async function fetchData() {
      const data = await getInfoStarWars();
      setResults(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // namefilter
    const tolower = filters.name.toLowerCase();
    const filter = results
      .filter((result: any) => result.name
        .toLowerCase()
        .includes(tolower));

    // populationfilter

    setResultsFiltered(filter);
  }, [filters, results]);

  return (
    <dataContext.Provider value={ { results, resultsFiltered, filters, setFilters } }>
      {children}
    </dataContext.Provider>
  );
}

export default DataProvider;
