import { useContext } from 'react';
import dataContext from '../context/data-context';

function Table() {
  const {
    resultsFiltered,
    filteredName,
    filterList,
    setFilteredName,
    setFilterList,
    setSort,
  } = useContext(dataContext);

  const filterNameList = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const novafilterNameList = filterNameList.filter(
    (item: string) => !Array.isArray(filterList) || !filterList.find((filter) => filter
      .columnSelected === item),
  );

  const clearFiltersButton = (
    <button
      data-testid="button-remove-filters"
      onClick={() => setFilterList([])}
    >
      Remove todos os filtros

    </button>
  );

  return (
    <div>
      <div>
        <h1 id="title" className='title'>Star Wars</h1>
      </div>
      <div className='div'>
        <div className='search'>
          <label htmlFor="textFilter"></label>
          <input
            type="text"
            className='input'
            placeholder='Procure pelo nome do planeta'
            id="textFilter"
            data-testid="name-filter"
            value={filteredName}
            onChange={(event) => setFilteredName(event.target.value)}
          />
        </div>
        <div>
          <form
            className='form'
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const columnfilter = form
                .elements.namedItem('columnFilter') as HTMLSelectElement;
              const comparisonfilter = form
                .elements.namedItem('comparisonFilter') as HTMLSelectElement;
              const valuefilter = form
                .elements.namedItem('valueFilter') as HTMLInputElement;
              const filter = ({
                columnSelected: columnfilter?.value || '',
                comparisonSelected: comparisonfilter?.value || '',
                valueSelected: valuefilter?.value || '',
              });
              if (Array.isArray(filterList)) {
                setFilterList([...filterList, filter]);
              }
            }}
          >
            <br />
            <select
              id="columnFilter"
              data-testid="column-filter"
            >
              {novafilterNameList.map((filterName) => (
                <option key={filterName} value={filterName}>
                  {filterName}
                </option>
              ))}
            </select>
            <select
              id="comparisonFilter"
              data-testid="comparison-filter"
            >
              <option value="maior que">maior que</option>
              <option value="menor que">menor que</option>
              <option value="igual a">igual a</option>
            </select>
            <label htmlFor="valueFilter">
              <input
                type="number"
                id="valueFilter"
                data-testid="value-filter"
                defaultValue="0"
              />
            </label>
            <button
              data-testid="button-filter"
              type="submit"
              disabled={novafilterNameList.length === 0}
            >
              filtrar
            </button>
          </form>
          <form
            className='form'
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const columnfilter = form
                .elements.namedItem('columnFilter') as HTMLSelectElement;
              const radioAsc = form
                .elements.namedItem('radio-asc') as HTMLInputElement;
              const orderSelected = radioAsc.checked ? 'ASC' : 'DESC';
              setSort({
                columnSelected: columnfilter?.value || '',
                orderSelected,
              });
            }}
          >
            <div>
              <select
                id="columnFilter"
                data-testid="column-sort"
              >
                {filterNameList.map((filterName) => (
                  <option key={filterName} value={filterName}>
                    {filterName}
                  </option>
                ))}
              </select>
              <input
                type="radio"
                id="radio-asc"
                data-testid="column-sort-input-asc"
                name="radioSort"
                defaultChecked
              />
              ASC
              <input
                type="radio"
                id="radio-desc"
                data-testid="column-sort-input-desc"
                name="radioSort"
              />
              DESC
              <button
                data-testid="column-sort-button"
              >
                sort
              </button>
            </div>
          </form>
          <div className='filter'>
            {Array.isArray(filterList) && filterList.map((filter: any) => (
              <div key={filter.columnSelected}>
                <p data-testid="filter">
                  {`${filter.columnSelected} 
              ${filter.comparisonSelected} 
              ${filter.valueSelected}`}
                  <button
                    onClick={() => {
                      const newList = filterList
                        .filter((item) => item.columnSelected !== filter.columnSelected);
                      setFilterList(newList);
                    }}
                  >
                    Remover filtro
                  </button>
                </p>
              </div>
            ))}
            {filterList?.length === 0 ? null : clearFiltersButton}
          </div>
        </div >
        <br />
        <div className='table-container'>

          <table className='table' data-testid="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Rotation period</th>
                <th>Orbital Period</th>
                <th>Diameter</th>
                <th>Climate</th>
                <th>Gravity</th>
                <th>Terrain</th>
                <th>Surface Water</th>
                <th>Population</th>
                <th>Films</th>
                <th>Created</th>
                <th>Edited</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {resultsFiltered?.map((result: any) => (
                <tr key={result.name}>
                  <td data-testid="planet-name">{result.name}</td>
                  <td>{result.rotation_period}</td>
                  <td>{result.orbital_period}</td>
                  <td>{result.diameter}</td>
                  <td>{result.climate}</td>
                  <td>{result.gravity}</td>
                  <td>{result.terrain}</td>
                  <td>{result.surface_water}</td>
                  <td>{result.population}</td>
                  <td>{result.films}</td>
                  <td>{result.created}</td>
                  <td>{result.edited}</td>
                  <td>{result.url}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Table;
