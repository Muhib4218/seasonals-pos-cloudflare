import { createClient } from '@supabase/supabase-js';

interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  ASSETS: Fetcher;
}

const securityHeaders: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), microphone=(self), geolocation=()',
  'Content-Security-Policy': "frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, private',
      ...securityHeaders,
    },
  });
}

function secure(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(securityHeaders)) headers.set(key, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      if (request.method !== 'GET') return json({ ok: false, message: 'Method not allowed' }, 405);
      if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
        return json({ ok: false, worker: true, database: false, message: 'Supabase secrets are not configured' }, 503);
      }

      const started = Date.now();
      const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const { error } = await supabase.from('settings').select('key', { head: true, count: 'exact' });
      if (error) {
        console.error('Supabase health check failed:', error.message);
        return json({ ok: false, worker: true, database: false, message: 'Database connection failed' }, 503);
      }
      return json({
        ok: true,
        worker: true,
        database: true,
        environment: 'parallel-test',
        latencyMs: Date.now() - started,
        timestamp: new Date().toISOString(),
      });
    }

    if (url.pathname.startsWith('/api/')) {
      return json({ ok: false, message: 'API route not implemented in migration step 3' }, 404);
    }

    return secure(await env.ASSETS.fetch(request));
  },
} satisfies ExportedHandler<Env>;
