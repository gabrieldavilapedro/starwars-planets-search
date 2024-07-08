import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Table from '../componentes/Table';
import { describe, vi } from 'vitest';
import testData from './mocks/mockAPI';
import DataProvider from '../context/data-provider';



const MOCK_API = testData

const MOCK_RESPOSE = {
  ok: true,
  status: 200,
  json: async () => MOCK_API,
} as Response;

const mockFetch = () => { global.fetch = vi.fn(() => Promise.resolve(MOCK_RESPOSE)) as any; };
const mockFetchError = () => { global.fetch = vi.fn(() => { throw new Error("Erro") }) };
const clearAllMocks = (() => vi.clearAllMocks());

describe('Teste da aplicacao em caso de erro da API', () => {
  beforeEach(mockFetchError)
  afterEach(cleanup)
  test('Verifica se a tabela é renderizada sem itens', async () => {
    render(<DataProvider><App /></DataProvider>);
    // verifica se não tem nenhum td na tabela
    const td = screen.queryByTestId('planet-name');
    expect(td).not.toBeInTheDocument();
  });
});

describe('Teste da aplicacao', () => {
  beforeEach(mockFetch)
  afterEach(cleanup)

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

    render(<DataProvider><App /></DataProvider>);

    const planetA = await screen.findByText('Tatooine');

    const botaoFiltrar = screen.getByRole('button', { name: 'filtrar' });

    await userEvent.click(botaoFiltrar);
    const planetB = screen.getByText('Alderaan');
    const planetC = screen.getByText('Yavin IV');
    const planetD = screen.queryByText('Hoth');
    const planetE = screen.queryByText('Dagobah');

    expect(planetA).toBeInTheDocument();
    expect(planetB).toBeInTheDocument();
    expect(planetC).toBeInTheDocument();
    expect(planetD).not.toBeInTheDocument();
    expect(planetE).not.toBeInTheDocument();

    const p = screen.getByTestId('filter');
    const botaoRemoverFiltro = screen.getByRole('button', { name: '🗑️' });
    const botaoRemoveFiltroAll = screen.getByRole('button', { name: 'Remove todos os filtros🗑️' });

    expect(p).toBeInTheDocument();
    expect(botaoRemoverFiltro).toBeInTheDocument();
    expect(botaoRemoveFiltroAll).toBeInTheDocument();
  });
  test('Verifica se a tabela é ordenada corretamente ao click do botao de ordenar', async () => {
    render(<DataProvider><App /></DataProvider>);

    const butaoOrdenar = screen.getByRole('button', { name: 'sort' });
    await userEvent.click(butaoOrdenar);

    const primeiroItemDaTabela = screen.getByRole('cell', { name: 'Alderaan' });
    expect(primeiroItemDaTabela).toHaveTextContent('Alderaan');
  });
});
