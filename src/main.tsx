import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </HashRouter>
  </StrictMode>,
);
