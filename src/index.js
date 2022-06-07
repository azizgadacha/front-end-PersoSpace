import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter, HashRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// project imports
import { store, persister } from './store';
import * as serviceWorker from './serviceWorker';
import config from './config';

// style + assets
import './assets/scss/style.scss';


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persister}>
              <HashRouter basename={config.basename}>
                  <App />
              </HashRouter>
          </PersistGate>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

