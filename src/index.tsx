import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offers} from './mocks/offers.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const offersCount = offers.length;

root.render(
  <React.StrictMode>
    <App offersCount={offersCount} offers={offers} />
  </React.StrictMode>
);
