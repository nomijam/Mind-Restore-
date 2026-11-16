import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from './lib/router';
import App from './App.tsx';
import './index.css';

function normalizePath(raw: string): string {
  try {
    const decoded = decodeURIComponent(raw);
    return decoded.length > 1 && decoded.endsWith('/') ? decoded.slice(0, -1) : decoded || '/';
  } catch {
    return raw.length > 1 && raw.endsWith('/') ? raw.slice(0, -1) : raw || '/';
  }
}

const rootEl = document.getElementById('root')!;
const prerenderedPath = rootEl.getAttribute('data-prerendered-path');
const currentPath = normalizePath(window.location.pathname);

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

if (prerenderedPath && normalizePath(prerenderedPath) === currentPath && rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}

// Defer non-critical service worker/cache cleanup until after initial paint to avoid main-thread contention
if (typeof window !== 'undefined') {
  const runCleanup = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
    if ('caches' in window) {
      caches.keys().then((names) => {
        for (const name of names) {
          caches.delete(name);
        }
      });
    }
  };
  const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void }).requestIdleCallback;
  if (typeof ric === 'function') {
    ric(runCleanup, { timeout: 3000 });
  } else {
    setTimeout(runCleanup, 2000);
  }
}
