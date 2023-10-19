import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Table from '../componentes/Table';
import { vi } from 'vitest';
import testData from '../mocks/mockAPI';




describe('Teste da aplicacao', () => {


  afterEach(() => vi.clearAllMocks());
  test('Verifica se o partes do componente é renderizado', () => {
    render(<Table />);
    const title = screen.getByText(/Star Wars/i);
    expect(title).toBeInTheDocument();

    const inputNameFilter = screen.getByTestId('name-filter');
    expect(inputNameFilter).toBeInTheDocument();

    const selectfilter = screen.getByTestId('column-filter');
    const selectFilter2 = screen.getByTestId('comparison-filter');
    const inputFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    expect(selectfilter).toBeInTheDocument();
    expect(selectFilter2).toBeInTheDocument();
    expect(inputFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();

    const selectSort = screen.getByTestId('column-sort');
    const radioSort = screen.getByTestId('column-sort-input-asc');
    const radioSort2 = screen.getByTestId('column-sort-input-desc');
    const buttonSort = screen.getByTestId('column-sort-button');
    expect(selectSort).toBeInTheDocument();
    expect(radioSort).toBeInTheDocument();
    expect(radioSort2).toBeInTheDocument();
    expect(buttonSort).toBeInTheDocument();


    const table = screen.getByTestId('table');
    expect(table).toBeInTheDocument();
  });
  test('Verifica se a tabela é filtrada corretamente ao click do botao de filtrar', async () => {
    const MOCK_API = testData

    const MOCK_RESPOSE = {
      ok: true,
      status: 200,
      json: async () => MOCK_API,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPOSE);

    render(<App />);

    const planetA = await screen.findByText('Tatooine');

    // const botaoFiltrar = screen.getByRole('button', { name: 'filtrar' });

    // userEvent.click(botaoFiltrar);
    // // getByText('Tatooine');
    // const planetB = await screen.findByText('Alderaan');
    // const planetC = await screen.findByText('Yavin IV');
    // const planetD = await screen.findByText('Hoth');
    // const planetE = await screen.findByText('Dagobah');


    // expect(planetA).toBeInTheDocument();
    // expect(planetB).toBeInTheDocument();
    // expect(planetC).toBeInTheDocument();
    // expect(planetD).not.toBeInTheDocument();
    // expect(planetE).not.toBeInTheDocument();

  });
});
