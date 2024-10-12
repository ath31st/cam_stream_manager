import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import LocaleProvider from './app/providers/LocaleProvider';
import AxiosInterceptorProvider from './app/providers/AxiosInterceptorProvider';
import { ServerStatusOverlay } from './features/server.status';
import AuthProvider from './app/providers/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <LocaleProvider>
      <AxiosInterceptorProvider>
        <AuthProvider>
          <ServerStatusOverlay />
          <App />
        </AuthProvider>
      </AxiosInterceptorProvider>
    </LocaleProvider>
  </React.StrictMode>,
);

reportWebVitals();
