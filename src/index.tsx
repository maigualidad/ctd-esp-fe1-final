import * as React from "react";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from './redux/store';
import { createRoot } from 'react-dom/client';

const rootElement: HTMLDivElement= document.querySelector('#root') as HTMLDivElement;

const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
