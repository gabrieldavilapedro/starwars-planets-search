import { useState, useEffect, useMemo } from 'react';
import dataContext, { Filters, Sort } from './data-context';
import { getInfoStarWars } from '../services/chamaAPI';

type Props = {
  children: React.ReactNode;
};

function DataProvider({ children }: Props) {
  const [filteredName, setFilteredName] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [resultsFiltered, setResultsFiltered] = useState<any[]>(results);
  const [filterList, setFilterList] = useState<Filters[]>([]);
  const [sort, setSort] = useState<Sort>({
    columnSelected: '',
    orderSelected: '',
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getInfoStarWars();
      setResults(data);
      setResultsFiltered(data);
    }
    fetchData();
  }, []);

  const filterName = (result: any[], name: string) => {
    const tolower = name.toLowerCase();
    return result.filter((res: any) => res.name
      .toLowerCase()
      .includes(tolower));
  };

  useEffect(() => {
    const filteredByName = filterName(results, filteredName);

    setResultsFiltered(filteredByName);
  }, [filteredName, results]);

  useEffect(() => {
    // para cada planeta, testa se ele passa em todos os filtros
    const testPlanet = (planet: any, filter: Filters) => {
      const { comparisonSelected,
        valueSelected, columnSelected: filterColumnSelected } = filter;

      const itemValue = Number(planet[filterColumnSelected]);
      switch (comparisonSelected) {
        case 'maior que':
          return itemValue > Number(valueSelected);
        case 'menor que':
          return itemValue < Number(valueSelected);
        default:
          return itemValue === Number(valueSelected);
      }
    };
    const newResultsFiltered = results.filter((planet) => {
      // para cada filter da lista de filters, testa se cada planeta passa em todos os filtros
      return filterList.every((filter) => testPlanet(planet, filter));
    });

    setResultsFiltered(newResultsFiltered);
  }, [filterList, results]);

  useEffect(() => {
    const { columnSelected, orderSelected } = sort;
    const newResultsFiltered = [...resultsFiltered];
    if (columnSelected && orderSelected) {
      newResultsFiltered.sort((planetA, planetB) => {
        const valueA = Number(planetA[columnSelected]);
        const valueB = Number(planetB[columnSelected]);
        //
        if (Number.isNaN(valueA)) return 1;
        if (Number.isNaN(valueB)) return -1;
        if (orderSelected === 'ASC') {
          return valueA - valueB;
        }
        return valueB - valueA;
      });
    }
    setResultsFiltered(newResultsFiltered);
  }, [sort]);

  const contextValue = useMemo(() => ({
    resultsFiltered,
    filteredName,
    filterList,
    setFilteredName,
    setFilterList,
    setSort,
  }), [results, resultsFiltered, filteredName, filterList]);
  return (
    <dataContext.Provider value={ contextValue }>
      {children}
    </dataContext.Provider>
  );
}

export default DataProvider;
