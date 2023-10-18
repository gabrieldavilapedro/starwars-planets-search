import { useState, useEffect, useMemo } from 'react';
import dataContext, { Filters } from './data-context';
import { getInfoStarWars } from '../services/chamaAPI';

type Props = {
  children: React.ReactNode;
};

function DataProvider({ children }: Props) {
  const [filteredName, setFilteredName] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [resultsFiltered, setResultsFiltered] = useState<any[]>(results);
  const [filterList, setFilterList] = useState<Filters[]>([]);

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

  function onSubmitForm(filters: Filters) {
    setFilterList([...filterList, filters]);
  }

  function onClickButtonRemoveAll() {
    setFilterList([]);
  }

  function onClickButtonRemove(columnSelected: string) {
    const newList = filterList.filter((item) => item.columnSelected !== columnSelected);
    setFilterList(newList);
  }

  const contextValue = useMemo(() => ({
    resultsFiltered,
    filteredName,
    filterList,
    setFilteredName,
    setFilterList,
    onSubmitForm,
    onClickButtonRemoveAll,
    onClickButtonRemove,
  }), [results, resultsFiltered, filteredName, filterList]);
  return (
    <dataContext.Provider value={ contextValue }>
      {children}
    </dataContext.Provider>
  );
}

export default DataProvider;
