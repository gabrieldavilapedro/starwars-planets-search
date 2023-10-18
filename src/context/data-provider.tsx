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
  }, [filteredName]);

  function onSubmitForm(filters: Filters) {
    setFilterList([...filterList, filters]);

    const result = resultsFiltered.filter((item: any) => {
      const { comparisonSelected, valueSelected, columnSelected } = filters;
      const itemValue = Number(item[columnSelected]);

      switch (comparisonSelected) {
        case 'maior que':
          return itemValue > Number(valueSelected);
        case 'menor que':
          return itemValue < Number(valueSelected);
        default:
          return itemValue === Number(valueSelected);
      }
    });

    setResultsFiltered(result);
  }

  function onClickButtonRemoveAll() {
    setFilterList([]);
    setResultsFiltered(results);
  }

  function onClickButtonRemove(filter: any) {
    const newList = filterList.filter((item) => item !== filter);
    setFilterList(newList);
    setResultsFiltered(results);
  }

  const contextValue = useMemo(() => ({
    results,
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
