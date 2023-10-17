import { useContext } from 'react';
import dataContext from '../context/data-context';

function Table() {
  const {
    resultsFiltered,
    filters,
    filteredName,
    filterList,
    setFilters,
    setFilteredName,
    onClickButtonFilter,
    onClickButtonRemoveAll,
    onClickButtonRemove,
  } = useContext(dataContext);

  if (!resultsFiltered.length) {
    return <h1>loading...</h1>;
  }
  return (
    <div>
      <div>
        <h1>Star Wars</h1>
      </div>
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
          value={ filters.columnSelected }
          onChange={ (event) => setFilters({
            ...filters, columnSelected: event.target.value }) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          id="comparisonFilter"
          data-testid="comparison-filter"
          value={ filters.comparisonSelected }
          onChange={ (event) => setFilters({
            ...filters, comparisonSelected: event.target.value }) }

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
            value={ filters.valueSelected }
            onChange={ (event) => setFilters({
              ...filters, valueSelected: event.target.value }) }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ onClickButtonFilter }
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
          {filterList.length === 0
            ? null
            : <button
                onClick={ () => onClickButtonRemoveAll() }
            >
              Remove todos os filtros🗑️
            </button>}

        </div>
      </div>
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
