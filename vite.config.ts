import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { build as viteBuild, defineConfig, type Plugin } from 'vite';

/**
 * Collects CSS class tokens used in above-the-fold shell & hero components so only
 * critical CSS rules are inlined in <head>, while the full CSS loads asynchronously.
 */
function collectAboveFoldClassTokens(rootDir: string): Set<string> {
  const tokens = new Set<string>([
    'min-h-screen',
    'flex',
    'flex-col',
    'flex-1',
    'bg-[#F8F7F2]',
    'text-[#243333]',
    'bg-[#1C433E]',
    'text-white',
    'antialiased',
  ]);

  const filesToScan = [
    'index.html',
    'src/App.tsx',
    'src/components/HeritageBar.tsx',
    'src/components/Header.tsx',
    'src/components/Hero.tsx',
    'src/components/TrustSection.tsx',
    'src/components/MobileStickyBar.tsx',
    'src/components/MindRestoreLogo.tsx',
  ];

  // Also scan hero sections (top ~290 lines) of inner pages so direct visits paint immediately with zero FOUC
  const heroSliceFiles = [
    { file: 'src/components/ConditionPage.tsx', maxLines: 290 },
    { file: 'src/components/CityPage.tsx', maxLines: 280 },
    { file: 'src/components/PlansAndPricingPage.tsx', maxLines: 170 },
    { file: 'src/components/BlogPage.tsx', maxLines: 175 },
    { file: 'src/components/ArticlePage.tsx', maxLines: 220 },
    { file: 'src/components/FAQPage.tsx', maxLines: 210 },
  ];

  const extractFromSource = (src: string) => {
    // Capture tokens inside class / className attributes and string literals
    const attrRegex = /(?:className|class)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\}|\{([^}]*)\})/g;
    let match: RegExpExecArray | null;
    while ((match = attrRegex.exec(src)) !== null) {
      const content = match[1] ?? match[2] ?? match[3] ?? match[4] ?? '';
      for (const rawTok of content.split(/\s+/)) {
        const clean = rawTok.replace(/^['"`({]+|['"`}),;]+$/g, '');
        if (clean && !clean.includes('${')) {
          tokens.add(clean);
        }
      }
    }
    // Also scan quoted class lists inside ternary/array expressions
    const strRegex = /'([^'\n]{2,140})'|"([^"\n]{2,140})"/g;
    while ((match = strRegex.exec(src)) !== null) {
      const content = match[1] ?? match[2] ?? '';
      if (
        content.includes('bg-') ||
        content.includes('text-') ||
        content.includes('px-') ||
        content.includes('py-') ||
        content.includes('flex') ||
        content.includes('grid')
      ) {
        for (const rawTok of content.split(/\s+/)) {
          if (rawTok) tokens.add(rawTok);
        }
      }
    }
  };

  for (const rel of filesToScan) {
    const abs = path.resolve(rootDir, rel);
    if (fs.existsSync(abs)) {
      extractFromSource(fs.readFileSync(abs, 'utf8'));
    }
  }

  for (const entry of heroSliceFiles) {
    const abs = path.resolve(rootDir, entry.file);
    if (fs.existsSync(abs)) {
      const lines = fs.readFileSync(abs, 'utf8').split('\n').slice(0, entry.maxLines).join('\n');
      extractFromSource(lines);
    }
  }

  return tokens;
}

function isEscaped(str: string, index: number): boolean {
  let backslashes = 0;
  for (let j = index - 1; j >= 0 && str[j] === '\\'; j--) {
    backslashes++;
  }
  return backslashes % 2 === 1;
}

/**
 * Splits a CSS string at the current nesting level into discrete statements/blocks.
 */
function splitCssBlocks(css: string): string[] {
  const blocks: string[] = [];
  let depth = 0;
  let start = 0;
  let inString: string | null = null;
  let inComment = false;

  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    const next = i + 1 < css.length ? css[i + 1] : '';

    if (inComment) {
      if (ch === '*' && next === '/') {
        inComment = false;
        i++;
      }
      continue;
    }

    if (inString) {
      if (ch === inString && !isEscaped(css, i)) {
        inString = null;
      }
      continue;
    }

    if (ch === '/' && next === '*') {
      inComment = true;
      i++;
      continue;
    }

    if ((ch === '"' || ch === "'") && !isEscaped(css, i)) {
      inString = ch;
      continue;
    }

    if (ch === '{') {
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) {
        blocks.push(css.slice(start, i + 1).trim());
        start = i + 1;
      }
    } else if (ch === ';' && depth === 0) {
      const stmt = css.slice(start, i + 1).trim();
      if (stmt) blocks.push(stmt);
      start = i + 1;
    }
  }

  const tail = css.slice(start).trim();
  if (tail) blocks.push(tail);
  return blocks;
}

/**
 * Unescapes a Tailwind CSS selector class name back to the source class token.
 */
function unescapeCssClass(escaped: string): string {
  return escaped
    .replace(/\\([0-9a-fA-F]{1,6})\s?/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/\\(.)/g, '$1');
}

function selectorMatchesCriticalTokens(selector: string, tokens: Set<string>): boolean {
  // Extract first class selector(s) in the rule header
  const classMatches = selector.match(/\.(?:\\[0-9a-fA-F]{1,6}\s?|\\.|[a-zA-Z0-9_-])+/g);
  if (!classMatches) return false;
  for (const rawCls of classMatches) {
    const token = unescapeCssClass(rawCls.slice(1));
    if (tokens.has(token)) {
      return true;
    }
  }
  return false;
}

function filterUtilityBlock(block: string, tokens: Set<string>): string {
  const openIdx = block.indexOf('{');
  const closeIdx = block.lastIndexOf('}');
  if (openIdx === -1 || closeIdx <= openIdx) return '';

  const header = block.slice(0, openIdx).trim();
  const body = block.slice(openIdx + 1, closeIdx);

  if (header.startsWith('@media') || header.startsWith('@supports') || header.startsWith('@layer')) {
    const innerBlocks = splitCssBlocks(body);
    const kept: string[] = [];
    for (const inner of innerBlocks) {
      const filtered = filterUtilityBlock(inner, tokens);
      if (filtered) kept.push(filtered);
    }
    return kept.length > 0 ? `${header}{${kept.join('')}}` : '';
  }

  return selectorMatchesCriticalTokens(header, tokens) ? block : '';
}

function extractCriticalCss(fullCss: string, tokens: Set<string>): string {
  const topBlocks = splitCssBlocks(fullCss);
  const criticalParts: string[] = [];

  for (const block of topBlocks) {
    if (
      block.startsWith('@charset') ||
      block.startsWith('@layer properties') ||
      block.startsWith('@layer theme') ||
      block.startsWith('@layer base') ||
      block.startsWith('@property') ||
      block.startsWith('@keyframes')
    ) {
      criticalParts.push(block);
      continue;
    }

    if (block.startsWith('@layer utilities')) {
      const filtered = filterUtilityBlock(block, tokens);
      if (filtered) criticalParts.push(filtered);
      continue;
    }

    // Keep unlayered global rules (html, h1-h6, .font-heading, p, :focus-visible, etc.)
    if (!block.startsWith('@layer components')) {
      criticalParts.push(block);
    }
  }

  return criticalParts.join('');
}

function staticWellKnownPlugin(rootDir: string): Plugin {
  const staticRoutes: Record<string, { relPath: string; contentType: string; cors?: boolean }> = {
    '/llms.txt': {
      relPath: 'public/llms.txt',
      contentType: 'text/markdown; charset=utf-8',
    },
    '/.well-known/ard.json': {
      relPath: 'public/.well-known/ard.json',
      contentType: 'application/json; charset=utf-8',
      cors: true,
    },
    '/.well-known/ai-catalog.json': {
      relPath: 'public/.well-known/ai-catalog.json',
      contentType: 'application/json; charset=utf-8',
      cors: true,
    },
  };

  const handleStaticWellKnown = (
    req: { url?: string; method?: string; headers?: Record<string, string | string[] | undefined> },
    res: { statusCode: number; setHeader: (k: string, v: string) => void; end: (b: string) => void },
    next: () => void
  ) => {
    const pathname = (req.url || '').split('?')[0];
    if (pathname === '/condition/female-psychologist-online' || pathname === '/condition/female-psychologist-online/') {
      res.statusCode = 301;
      res.setHeader('Location', '/condition/female-psychologist');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.end('');
      return;
    }
    if (pathname === '/pricing' || pathname === '/pricing/') {
      res.statusCode = 301;
      res.setHeader('Location', '/plans-and-pricing');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.end('');
      return;
    }
    const entry = staticRoutes[pathname];
    if (!entry) return next();
    const absPath = path.resolve(rootDir, entry.relPath);
    if (!fs.existsSync(absPath)) return next();
    res.statusCode = 200;
    res.setHeader('Content-Type', entry.contentType);
    if (entry.cors) {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.end(fs.readFileSync(absPath, 'utf8'));
  };

  return {
    name: 'static-well-known-files',
    configureServer(server) {
      server.middlewares.use(handleStaticWellKnown);
      server.middlewares.use(async (req, res, next) => {
        const method = (req.method || 'GET').toUpperCase();
        if (method !== 'GET' && method !== 'HEAD') return next();
        const url = req.url || '/';
        const pathname = url.split('?')[0];
        const accept = String(req.headers?.accept || '');
        if (
          !accept.includes('text/html') ||
          pathname.startsWith('/@') ||
          pathname.startsWith('/src/') ||
          pathname.startsWith('/node_modules/') ||
          pathname.startsWith('/assets/') ||
          pathname.startsWith('/images/') ||
          pathname.includes('.')
        ) {
          return next();
        }
        try {
          const rawTemplate = fs.readFileSync(path.resolve(rootDir, 'index.html'), 'utf8');
          const { renderRoute } = await server.ssrLoadModule('/src/entry-server.tsx');
          const { appHtml, head } = await renderRoute(pathname);
          const populated = applyPrerenderedData(rawTemplate, pathname, appHtml, head);
          const transformed = await server.transformIndexHtml(url, populated);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(method === 'HEAD' ? '' : transformed);
        } catch (err) {
          server.ssrFixStacktrace(err as Error);
          next();
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleStaticWellKnown);
      server.middlewares.use((req, res, next) => {
        const method = (req.method || 'GET').toUpperCase();
        if (method !== 'GET' && method !== 'HEAD') return next();
        const pathname = (req.url || '/').split('?')[0];
        if (pathname.includes('.') && !pathname.endsWith('.html')) return next();
        const normalized = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
        const candidateRel =
          normalized === '/' ? 'index.html' : `${normalized.replace(/^\/+/, '').replace(/\.html$/, '')}.html`;
        const candidateAbs = path.resolve(rootDir, 'dist', candidateRel);
        if (fs.existsSync(candidateAbs) && fs.statSync(candidateAbs).isFile()) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(method === 'HEAD' ? '' : fs.readFileSync(candidateAbs, 'utf8'));
          return;
        }
        next();
      });
    },
  };
}

interface PrerenderHeadData {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: 'website' | 'article';
  ogImage: string;
  robots: string;
  schemaData?: Record<string, unknown> | Record<string, unknown>[];
}

function escapeHtmlAttr(val: string): string {
  return val
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(val: string): string {
  return val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function applyPrerenderedData(
  templateHtml: string,
  routePath: string,
  appHtml: string,
  head: PrerenderHeadData | null
): string {
  let html = templateHtml;

  if (head) {
    const t = escapeHtmlText(head.title);
    const d = escapeHtmlAttr(head.description);
    const tAttr = escapeHtmlAttr(head.title);
    const c = escapeHtmlAttr(head.canonicalUrl);
    const img = escapeHtmlAttr(head.ogImage);
    const ogType = escapeHtmlAttr(head.ogType);
    const robots = escapeHtmlAttr(head.robots);

    html = html.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${t}</title>`);
    html = html.replace(
      /<meta\s+name="description"[\s\S]*?\/>/i,
      () => `<meta name="description" content="${d}" />`
    );
    html = html.replace(
      /<link\s+rel="canonical"[\s\S]*?\/>/i,
      () => `<link rel="canonical" href="${c}" />`
    );
    html = html.replace(
      /<link\s+rel="alternate"\s+hreflang="en-pk"[\s\S]*?\/>/i,
      () => `<link rel="alternate" hreflang="en-pk" href="${c}" />`
    );
    html = html.replace(
      /<link\s+rel="alternate"\s+hreflang="x-default"[\s\S]*?\/>/i,
      () => `<link rel="alternate" hreflang="x-default" href="${c}" />`
    );
    html = html.replace(
      /<meta\s+name="robots"[\s\S]*?\/>/i,
      () => `<meta name="robots" content="${robots}" />`
    );
    html = html.replace(
      /<meta\s+property="og:type"[\s\S]*?\/>/i,
      () => `<meta property="og:type" content="${ogType}" />`
    );
    html = html.replace(
      /<meta\s+property="og:title"[\s\S]*?\/>/i,
      () => `<meta property="og:title" content="${tAttr}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/i,
      () => `<meta property="og:description" content="${d}" />`
    );
    html = html.replace(
      /<meta\s+property="og:url"[\s\S]*?\/>/i,
      () => `<meta property="og:url" content="${c}" />`
    );
    html = html.replace(
      /<meta\s+property="og:image"[\s\S]*?\/>/i,
      () => `<meta property="og:image" content="${img}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:title"[\s\S]*?\/>/i,
      () => `<meta name="twitter:title" content="${tAttr}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"[\s\S]*?\/>/i,
      () => `<meta name="twitter:description" content="${d}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:image"[\s\S]*?\/>/i,
      () => `<meta name="twitter:image" content="${img}" />`
    );

    if (head.schemaData) {
      const safeJson = JSON.stringify(head.schemaData).replace(/<\//g, '<\\/');
      const schemaScript = `<script id="seo-page-structured-data" type="application/ld+json">${safeJson}</script>`;
      if (/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i.test(html)) {
        html = html.replace(
          /<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i,
          () => schemaScript
        );
      } else {
        html = html.replace('</head>', () => `    ${schemaScript}\n  </head>`);
      }
    }
  }

  const normalizedRoute =
    routePath.length > 1 && routePath.endsWith('/') ? routePath.slice(0, -1) : routePath || '/';
  html = html.replace(
    /<div\s+id="root"\s*><\/div>/i,
    () => `<div id="root" data-prerendered-path="${escapeHtmlAttr(normalizedRoute)}">${appHtml}</div>`
  );

  return html;
}

function readSitemapRoutes(rootDir: string): string[] {
  const sitemapPath = path.resolve(rootDir, 'public/sitemap.xml');
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const routes = new Set<string>();
  const locRegex = /<loc>\s*https?:\/\/[^/<]+([^<]*)\s*<\/loc>/gi;
  let match: RegExpExecArray | null;
  while ((match = locRegex.exec(xml)) !== null) {
    const raw = (match[1] || '/').trim();
    const clean = raw.length > 1 && raw.endsWith('/') ? raw.slice(0, -1) : raw || '/';
    routes.add(clean);
  }
  return Array.from(routes);
}

function prerenderPlugin(rootDir: string): Plugin {
  return {
    name: 'sitemap-ssg-prerender',
    apply: 'build',
    async closeBundle() {
      const distDir = path.resolve(rootDir, 'dist');
      const templatePath = path.resolve(distDir, 'index.html');
      if (!fs.existsSync(templatePath)) return;

      const templateHtml = fs.readFileSync(templatePath, 'utf8');
      const ssrOutDir = path.resolve(distDir, '.ssr-temp');

      try {
        await viteBuild({
          configFile: false,
          root: rootDir,
          plugins: [react()],
          resolve: {
            alias: {
              '@': path.resolve(rootDir, '.'),
            },
          },
          build: {
            ssr: path.resolve(rootDir, 'src/entry-server.tsx'),
            outDir: ssrOutDir,
            emptyOutDir: true,
            write: true,
            minify: false,
            rollupOptions: {
              output: {
                format: 'esm',
              },
            },
          },
          logLevel: 'silent',
        });

        const serverEntryUrl = pathToFileURL(path.resolve(ssrOutDir, 'entry-server.js')).href;
        const { renderRoute } = (await import(serverEntryUrl)) as {
          renderRoute: (urlPath: string) => Promise<{ appHtml: string; head: PrerenderHeadData | null }>;
        };

        const routes = readSitemapRoutes(rootDir);
        for (const routePath of routes) {
          const { appHtml, head } = await renderRoute(routePath);
          const mainMatch = appHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
          const mainInner = mainMatch ? mainMatch[1] : '';
          if (!mainInner || !mainInner.includes('<h1') || mainInner.includes('<template id="B:')) {
            throw new Error(`Prerender check failed for "${routePath}": <main> did not render full static HTML.`);
          }
          const finalHtml = applyPrerenderedData(templateHtml, routePath, appHtml, head);
          const outFile =
            routePath === '/'
              ? templatePath
              : path.resolve(distDir, `${routePath.replace(/^\/+/, '')}.html`);
          fs.mkdirSync(path.dirname(outFile), { recursive: true });
          fs.writeFileSync(outFile, finalHtml, 'utf8');
        }

        console.log(`[prerender] Successfully prerendered ${routes.length} routes from sitemap.xml`);
      } finally {
        fs.rmSync(ssrOutDir, { recursive: true, force: true });
      }
    },
  };
}

function performanceBuildPlugin(rootDir: string): Plugin {
  return {
    name: 'critical-css-and-route-preload',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      const bundle = ctx.bundle;
      if (!bundle) return html;

      let resultHtml = html;

      // 1. Inline critical CSS and defer full stylesheet (removes render-blocking CSS)
      const cssEntry = Object.entries(bundle).find(
        ([fileName, asset]) =>
          fileName.endsWith('.css') && asset.type === 'asset' && typeof asset.source === 'string'
      );

      if (cssEntry) {
        const [cssFileName, cssAsset] = cssEntry;
        const fullCss = (cssAsset as { source: string }).source;
        const tokens = collectAboveFoldClassTokens(rootDir);
        const criticalCss = extractCriticalCss(fullCss, tokens);
        const cssHref = `/${cssFileName}`;

        const escapedHref = cssHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const linkRegex = new RegExp(
          `<link[^>]*rel="stylesheet"[^>]*href="${escapedHref}"[^>]*>`,
          'i'
        );

        const replacement =
          `<style id="critical-css">${criticalCss}</style>\n` +
          `    <link rel="preload" as="style" crossorigin href="${cssHref}">\n` +
          `    <link rel="stylesheet" crossorigin href="${cssHref}" media="print" onload="this.media='all'">\n` +
          `    <noscript><link rel="stylesheet" crossorigin href="${cssHref}"></noscript>`;

        if (linkRegex.test(resultHtml)) {
          resultHtml = resultHtml.replace(linkRegex, replacement);
        }
      }

      // 2. Inject route-aware modulepreload hints for inner pages so React.lazy inner pages have 0 waterfall
      //    while Homepage downloads ZERO inner-page chunks.
      const findChunk = (prefix: string): string | null => {
        const key = Object.keys(bundle).find(
          (k) => k.startsWith(`assets/${prefix}`) && k.endsWith('.js')
        );
        return key ? `/${key}` : null;
      };

      const routeChunkMap = {
        condition: [findChunk('ConditionPage-'), findChunk('clinical-data-'), findChunk('practiceData-')].filter(Boolean),
        city: [findChunk('CityPage-'), findChunk('clinical-data-'), findChunk('practiceData-')].filter(Boolean),
        pricing: [findChunk('PlansAndPricingPage-'), findChunk('PricingSection-')].filter(Boolean),
        blog: [findChunk('BlogPage-'), findChunk('practiceData-')].filter(Boolean),
        article: [findChunk('ArticlePage-'), findChunk('practiceData-')].filter(Boolean),
        faq: [findChunk('FAQPage-'), findChunk('practiceData-')].filter(Boolean),
      };

      const preloadScript = `    <script>
      (function () {
        var p = (window.location.pathname || '/').replace(/\\/+$/, '').toLowerCase() || '/';
        var m = ${JSON.stringify(routeChunkMap)};
        var list = null;
        if (p.indexOf('/condition/') === 0) list = m.condition;
        else if (p.indexOf('/city/') === 0) list = m.city;
        else if (p === '/plans-and-pricing' || p === '/plans-pricing' || p === '/plans & pricing') list = m.pricing;
        else if (p.indexOf('/blog/') === 0 || p.indexOf('/article/') === 0) list = m.article;
        else if (p === '/blog' || p === '/articles' || p === '/resources') list = m.blog;
        else if (p === '/faq' || p === '/faqs') list = m.faq;
        if (list) {
          for (var i = 0; i < list.length; i++) {
            var l = document.createElement('link');
            l.rel = 'modulepreload';
            l.crossOrigin = '';
            l.href = list[i];
            document.head.appendChild(l);
          }
        }
      })();
    </script>`;

      resultHtml = resultHtml.replace('</head>', `${preloadScript}\n  </head>`);
      return resultHtml;
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      staticWellKnownPlugin(import.meta.dirname),
      react(),
      tailwindcss(),
      performanceBuildPlugin(import.meta.dirname),
      prerenderPlugin(import.meta.dirname),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      cssCodeSplit: true,
      sourcemap: false,
      minify: 'esbuild',
      modulePreload: {
        resolveDependencies(_filename, deps) {
          return deps.filter(
            (dep) =>
              !dep.includes('practiceData') &&
              !dep.includes('clinical-data') &&
              !dep.includes('supabase')
          );
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('src/data/conditionsData') || id.includes('src/data/citiesData')) {
              return 'clinical-data';
            }
            if (id.includes('src/data/practiceData')) {
              return 'practiceData';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
