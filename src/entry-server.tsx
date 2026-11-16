import React from 'react';
import { renderToString } from 'react-dom/server';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from './lib/router';
import { HeadCollectorProvider, type CollectedHeadData } from './components/SEOHead';
import App from './App';

export async function renderRoute(urlPath: string): Promise<{
  appHtml: string;
  head: CollectedHeadData | null;
}> {
  const headCollector: { current: CollectedHeadData | null } = { current: null };
  const element = (
    <HeadCollectorProvider collector={headCollector}>
      <StaticRouter location={urlPath}>
        <App />
      </StaticRouter>
    </HeadCollectorProvider>
  );

  // First pass resolves any React.lazy() modules used by this route into React's module cache
  const { prelude } = await prerenderToNodeStream(element);
  for await (const _chunk of prelude) {
    // drain stream until all lazy chunks finish loading
  }

  // Second pass renders synchronously inline inside <main> (zero hidden streaming templates or $RC scripts)
  headCollector.current = null;
  const appHtml = renderToString(element);

  return {
    appHtml,
    head: headCollector.current,
  };
}
