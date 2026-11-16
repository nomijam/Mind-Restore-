import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

export interface RouterLocation {
  pathname: string;
  search: string;
  hash: string;
}

interface NavigateOptions {
  replace?: boolean;
}

interface RouterContextValue {
  location: RouterLocation;
  navigate: (to: string, options?: NavigateOptions) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);
const ParamsContext = createContext<Record<string, string | undefined>>({});

function readWindowLocation(): RouterLocation {
  if (typeof window === 'undefined') {
    return { pathname: '/', search: '', hash: '' };
  }
  return {
    pathname: window.location.pathname || '/',
    search: window.location.search || '',
    hash: window.location.hash || '',
  };
}

export const BrowserRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<RouterLocation>(readWindowLocation);

  useEffect(() => {
    const handlePopState = () => {
      setLocation(readWindowLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: NavigateOptions) => {
    if (typeof window === 'undefined') return;
    if (options?.replace) {
      window.history.replaceState(null, '', to);
    } else {
      window.history.pushState(null, '', to);
    }
    setLocation(readWindowLocation());
  }, []);

  const value = useMemo(() => ({ location, navigate }), [location, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export const StaticRouter: React.FC<{ location: string; children: React.ReactNode }> = ({
  location: initialUrl,
  children,
}) => {
  const [pathAndSearch, hashPart = ''] = initialUrl.split('#');
  const [pathnamePart, searchPart = ''] = pathAndSearch.split('?');
  const parsed: RouterLocation = useMemo(
    () => ({
      pathname: pathnamePart || '/',
      search: searchPart ? `?${searchPart}` : '',
      hash: hashPart ? `#${hashPart}` : '',
    }),
    [pathnamePart, searchPart, hashPart]
  );

  const noopNavigate = useCallback(() => {}, []);
  const value = useMemo(() => ({ location: parsed, navigate: noopNavigate }), [parsed, noopNavigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export function useLocation(): RouterLocation {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    return readWindowLocation();
  }
  return ctx.location;
}

export function useNavigate() {
  const ctx = useContext(RouterContext);
  return useCallback(
    (to: string, options?: NavigateOptions) => {
      if (ctx) {
        ctx.navigate(to, options);
      } else if (typeof window !== 'undefined') {
        if (options?.replace) {
          window.history.replaceState(null, '', to);
        } else {
          window.history.pushState(null, '', to);
        }
      }
    },
    [ctx]
  );
}

export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>(): T {
  return useContext(ParamsContext) as T;
}

export interface RouteProps {
  path?: string;
  element?: React.ReactNode;
}

export const Route: React.FC<RouteProps> = ({ element }) => <>{element}</>;

function normalizePathname(raw: string): string {
  try {
    const decoded = decodeURIComponent(raw);
    if (decoded.length > 1 && decoded.endsWith('/')) {
      return decoded.slice(0, -1);
    }
    return decoded || '/';
  } catch {
    if (raw.length > 1 && raw.endsWith('/')) {
      return raw.slice(0, -1);
    }
    return raw || '/';
  }
}

function matchPath(
  pattern: string | undefined,
  pathname: string
): Record<string, string | undefined> | null {
  if (!pattern) return null;
  if (pattern === '*') return {};

  const normPath = normalizePathname(pathname);
  const normPattern = normalizePathname(pattern);

  if (normPattern === normPath) {
    return {};
  }

  const patternParts = normPattern.split('/').filter(Boolean);
  const pathParts = normPath.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) {
    return null;
  }

  const params: Record<string, string | undefined> = {};
  for (let i = 0; i < patternParts.length; i++) {
    const pPart = patternParts[i];
    const uPart = pathParts[i];
    if (pPart.startsWith(':')) {
      params[pPart.slice(1)] = uPart;
    } else if (pPart !== uPart) {
      return null;
    }
  }
  return params;
}

export const Routes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  let matchedElement: React.ReactNode = null;
  let matchedParams: Record<string, string | undefined> = {};
  let wildcardElement: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (matchedElement || !React.isValidElement<RouteProps>(child)) return;
    const { path, element } = child.props;
    if (path === '*') {
      wildcardElement = element ?? null;
      return;
    }
    const params = matchPath(path, pathname);
    if (params !== null) {
      matchedElement = element ?? null;
      matchedParams = params;
    }
  });

  return (
    <ParamsContext.Provider value={matchedParams}>
      {matchedElement ?? wildcardElement}
    </ParamsContext.Provider>
  );
};

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
}

export const Link: React.FC<LinkProps> = ({ to, onClick, target, children, ...rest }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      target === '_blank' ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} target={target} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
