import { useState, useEffect } from 'react';
import dataContext, { Filters } from './data-context';
import { getInfoStarWars } from '../services/chamaAPI';

type Props = {
  children: React.ReactNode;
};

const filterName = (results: any[], name: string) => {
  const tolower = name.toLowerCase();
  return results.filter((result: any) => result.name
    .toLowerCase()
    .includes(tolower));
};

function DataProvider({ children }: Props) {
  const [results, setResults] = useState<any[]>([]);
  const [resultsFiltered, setResultsFiltered] = useState<any[]>(results);
  const [filters, setFilters] = useState<Filters>({
    name: '',
    columnSelected: 'population',
    comparisonSelected: 'maior que',
    valueSelected: '',
  });
  useEffect(() => {
    async function fetchData() {
      const data = await getInfoStarWars();
      setResults(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filteredByName = filterName(results, filters.name);

    setResultsFiltered(filteredByName);
  }, [filters.name, results]);

  function onClickButtonFilter() {
    console.log(filters);
    let list = filterName(results, filters.name);

    list = list.filter((item: any) => {
      const { comparisonSelected, valueSelected, columnSelected } = filters;
      const itemValue = Number(item[columnSelected]);

      switch (comparisonSelected) {
        case 'maior que':
          return itemValue > Number(valueSelected);
        case 'menor que':
          return itemValue < Number(valueSelected);
        case 'igual a':
          return itemValue === Number(valueSelected);
        default:
          return null;
      }
    });

    setResultsFiltered(list);
  }

  const contextValue = {
    results,
    resultsFiltered,
    filters,
    setFilters,
    onClickButtonFilter,
  };
  return (
    <dataContext.Provider value={ contextValue }>
      {children}
    </dataContext.Provider>
  );
}

export default DataProvider;
