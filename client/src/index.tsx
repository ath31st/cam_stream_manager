import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import LocaleProvider from './app/providers/LocaleProvider';
import AxiosInterceptorProvider from './app/providers/AxiosInterceptorProvider';
import { ServerStatusOverlay } from './features/server.status';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <LocaleProvider>
      <AxiosInterceptorProvider>
        <ServerStatusOverlay />
        <App />
      </AxiosInterceptorProvider>
    </LocaleProvider>
  </React.StrictMode>,
);

reportWebVitals();
