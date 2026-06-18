import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import favicon from './assets/images/favicon.webp';

const faviconEl = document.getElementById('app-favicon') as HTMLLinkElement | null;
if (faviconEl) {
  faviconEl.href = favicon;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

