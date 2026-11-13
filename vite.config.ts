import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

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
        else if (p === '/plans-and-pricing' || p === '/pricing' || p === '/plans-pricing' || p === '/plans & pricing') list = m.pricing;
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
    plugins: [react(), tailwindcss(), performanceBuildPlugin(import.meta.dirname)],
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
