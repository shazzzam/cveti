// import React from 'react';
import * as ReactDOM from 'react-dom/client';
import * as React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';

import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
