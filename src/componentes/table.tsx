import { useContext } from 'react';
import dataContext from '../context/data-context';

function Table() {
  const { resultsFiltered, filters, setFilters } = useContext(dataContext);

  return (
    <div>
      { (resultsFiltered.length === 0) ? <p>Loading...</p> : null }
      <h1>Star Wars</h1>
      <label htmlFor="textFilter">procure pelo nome do planeta</label>
      <input
        type="text"
        id="textFilter"
        data-testid="name-filter"
        value={ filters.name }
        onChange={ (event) => {
          const newFilterText = event.target.value;
          setFilters({ ...filters, name: newFilterText });
        } }
      />
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
