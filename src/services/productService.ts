import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../api/supabase';
import { Product } from '../types/product';

/** RN native `fetch` — iOS par axios/XHR "Network Error" se zyada reliable */
const REST_BASE = `${SUPABASE_URL}/rest/v1`;

const defaultHeaders: Record<string, string> = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const sleep = (ms: number) =>
  new Promise<void>(resolve => setTimeout(() => resolve(), ms));

type MappedError = {
  code: string;
  message: string;
  details: string;
  hint: string;
  __httpStatus?: number;
};

function buildUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${REST_BASE}${p}`;
}

async function parseBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function throwFromResponse(
  res: Response,
  body: unknown,
): never {
  const data =
    body && typeof body === 'object'
      ? (body as {
          code?: string;
          message?: string;
          details?: string;
          hint?: string;
        })
      : undefined;
  const status = res.status;
  if (data && (data.message || data.code)) {
    const err: MappedError = {
      code: data.code || String(status),
      message: data.message || `Request failed with status ${status}`,
      details: data.details || '',
      hint: data.hint || '',
      __httpStatus: status,
    };
    throw err;
  }
  const err: MappedError = {
    code: '',
    message: `Request failed with status ${status}`,
    details: typeof body === 'string' ? body : JSON.stringify(body),
    hint: `HTTP ${status}`,
    __httpStatus: status,
  };
  throw err;
}

function throwNetworkError(cause: unknown): never {
  const isAbort =
    cause instanceof Error && cause.name === 'AbortError';
  const err: MappedError = {
    code: isAbort ? 'ABORT' : '',
    message: isAbort
      ? 'Request timed out'
      : cause instanceof Error
        ? cause.message
        : 'Network request failed',
    details: String(cause),
    hint: 'No response (network)',
  };
  throw err;
}

function isRetryableError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false;
  }
  const e = error as MappedError;
  if (e.code === 'ABORT') {
    return true;
  }
  if (e.hint === 'No response (network)') {
    return true;
  }
  const s = e.__httpStatus;
  if (typeof s === 'number') {
    return s >= 500 || s === 429;
  }
  return false;
}

function throwMappedError(error: unknown): never {
  if (error && typeof error === 'object' && 'hint' in (error as object)) {
    throw error;
  }
  throwNetworkError(error);
}

async function restFetch(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  path: string,
  options?: {
    searchParams?: Record<string, string>;
    body?: unknown;
    extraHeaders?: Record<string, string>;
  },
): Promise<unknown> {
  const url = new URL(buildUrl(path.split('?')[0] || path));
  const q = path.includes('?') ? path.split('?')[1] : '';
  if (q) {
    new URLSearchParams(q).forEach((v, k) => url.searchParams.set(k, v));
  }
  if (options?.searchParams) {
    for (const [k, v] of Object.entries(options.searchParams)) {
      url.searchParams.set(k, v);
    }
  }

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 45000);
  try {
    const res = await fetch(url.toString(), {
      method,
      headers: { ...defaultHeaders, ...options?.extraHeaders },
      body:
        options?.body !== undefined
          ? JSON.stringify(options.body)
          : undefined,
      signal: controller.signal,
    });
    const parsed = await parseBody(res);
    if (!res.ok) {
      throwFromResponse(res, parsed);
    }
    return parsed;
  } catch (e) {
    if (e && typeof e === 'object' && '__httpStatus' in (e as object)) {
      throw e;
    }
    throwNetworkError(e);
  } finally {
    clearTimeout(t);
  }
}

async function withRetry<T>(fn: () => Promise<T>, maxAttempts = 4): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const canRetry =
        attempt < maxAttempts - 1 && isRetryableError(error);
      if (!canRetry) {
        throwMappedError(error);
      }
      await sleep(300 * 2 ** attempt);
    }
  }
  throwMappedError(lastError ?? new Error('Request failed'));
}

export const getProducts = async () => {
  const data = await withRetry(() =>
    restFetch('GET', '/products', {
      searchParams: { select: '*', order: 'id.desc' },
    }),
  );
  return data;
};

export const addProduct = async (payload: Product) => {
  const data = await withRetry(() =>
    restFetch('POST', '/products', {
      searchParams: { select: '*' },
      body: [payload],
      extraHeaders: { Prefer: 'return=representation' },
    }),
  );
  return data;
};

export const updateProduct = async (id: number, payload: Product) => {
  const data = await withRetry(() =>
    restFetch('PATCH', `/products?id=eq.${id}`, {
      searchParams: { select: '*' },
      body: payload,
      extraHeaders: { Prefer: 'return=representation' },
    }),
  );
  return data;
};

export const deleteProduct = async (id: number) => {
  const data = await withRetry(() =>
    restFetch('DELETE', `/products?id=eq.${id}`),
  );
  return data;
};
