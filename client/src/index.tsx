import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import AuthProvider from './app/providers/AuthProvider';
import AxiosInterceptorProvider from './app/providers/AxiosInterceptorProvider';
import GlobalStyleProvider from './app/providers/GlobalStyleProvider';
import LocaleProvider from './app/providers/LocaleProvider';
import { ServerStatusOverlay } from './features/server.status';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <GlobalStyleProvider>
      <LocaleProvider>
        <AxiosInterceptorProvider>
          <AuthProvider>
            <ServerStatusOverlay />
            <App />
          </AuthProvider>
        </AxiosInterceptorProvider>
      </LocaleProvider>
    </GlobalStyleProvider>
  </React.StrictMode>,
);

reportWebVitals();
