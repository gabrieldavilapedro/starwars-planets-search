import { useContext } from 'react';
import dataContext from '../context/data-context';

function Table() {
  const {
    resultsFiltered,
    filteredName,
    filterList,
    setFilteredName,
    onClickButtonRemoveAll,
    onClickButtonRemove,
    onSubmitForm,
  } = useContext(dataContext);

  const filterNameList = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ].filter(
    (item: string) => !filterList.find((filter) => filter.columnSelected === item),
  );

  const clearFiltersButton = (
    <button onClick={ () => onClickButtonRemoveAll() }>Remove todos os filtros🗑️</button>
  );

  if (!resultsFiltered.length) {
    return <h1>loading...</h1>;
  }
  return (
    <div>
      <div>
        <h1>Star Wars</h1>
      </div>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const columnfilter = form
            .elements.namedItem('columnFilter') as HTMLSelectElement;
          const comparisonfilter = form
            .elements.namedItem('comparisonFilter') as HTMLSelectElement;
          const valuefilter = form
            .elements.namedItem('valueFilter') as HTMLInputElement;
          onSubmitForm({
            columnSelected: columnfilter?.value || '',
            comparisonSelected: comparisonfilter?.value || '',
            valueSelected: valuefilter?.value || '',
          });
        } }
      >
        <div>
          <label htmlFor="textFilter">Procure pelo nome do planeta:</label>
          <input
            type="text"
            id="textFilter"
            data-testid="name-filter"
            value={ filteredName }
            onChange={ (event) => setFilteredName(event.target.value) }
          />
        </div>
        <div>
          <br />
          <select
            id="columnFilter"
            data-testid="column-filter"
          >
            {filterNameList.map((filterName) => (
              <option key={ filterName } value={ filterName }>
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
          >
            filtrar
          </button>
          <div>
            {filterList.map((filter: any) => (
              <div key={ filter.columnSelected }>
                <p>
                  {`${filter.columnSelected} 
              ${filter.comparisonSelected} 
              ${filter.valueSelected}`}
                  <button
                    onClick={
                  () => onClickButtonRemove(filter)
                }
                  >
                    🗑️
                  </button>
                </p>
              </div>
            ))}
            {filterList.length === 0 ? null : clearFiltersButton}
          </div>
        </div>
      </form>
      <br />
      <table>
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
          {resultsFiltered.map((result: any) => (
            <tr key={ result.name }>
              <td>{result.name}</td>
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
  );
}
export default Table;
