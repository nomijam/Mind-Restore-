import { createRoot } from 'react-dom/client';
import { BrowserRouter } from './lib/router';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

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
