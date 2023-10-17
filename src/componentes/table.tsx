import { useContext } from 'react';
import dataContext from '../context/data-context';

function Table() {
  const {
    resultsFiltered,
    filters,
    setFilters,
    onClickButtonFilter,
  } = useContext(dataContext);

  return (
    <div>
      <div>
        { (resultsFiltered.length === 0) ? <p>Loading...</p> : null }
        <h1>Star Wars</h1>
      </div>
      <div>
        <label htmlFor="textFilter">Procure pelo nome do planeta:</label>
        <input
          type="text"
          id="textFilter"
          data-testid="name-filter"
          value={ filters.name }
          onChange={ (event) => setFilters({ ...filters, name: event.target.value }) }
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
        <input
          type="number"
          id="valueFilter"
          data-testid="value-filter"
          value={ filters.valueSelected }
          onChange={ (event) => setFilters({
            ...filters, valueSelected: Number(event.target.value) }) }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ onClickButtonFilter }
        >
          filtrar
        </button>
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
