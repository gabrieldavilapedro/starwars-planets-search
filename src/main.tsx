import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DataProvider from './context/data-provider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <DataProvider>
      <App />
    </DataProvider>,
  );
