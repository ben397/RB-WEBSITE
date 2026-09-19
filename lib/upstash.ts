// Minimal Upstash Redis REST client — a couple of fetch calls, no SDK. Used only to
// bridge the donate initiation request and PayHero's later async callback, which land
// in separate serverless invocations that share no memory.
//
// Vercel's "Upstash for Redis" marketplace integration (Storage tab → Create Database)
// auto-injects the connection as KV_REST_API_URL / KV_REST_API_TOKEN — the legacy
// "Vercel KV" naming, not Upstash's own UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
// convention (confirmed against a real deployment: the marketplace flow only sets the KV_
// names). Support both, preferring the Upstash-native names if both happen to be set.

function credentials(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

function isConfigured(): boolean {
  return credentials() !== null;
}

async function command<T = unknown>(args: (string | number)[]): Promise<T | null> {
  const creds = credentials();
  if (!creds) return null;

  const res = await fetch(creds.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${creds.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  if (!res.ok) return null;
  const data = (await res.json().catch(() => null)) as { result: T } | null;
  return data?.result ?? null;
}

export const upstash = {
  isConfigured,
  /** Store a JSON-serialisable value under `key`, expiring after `ttlSeconds`. */
  async setJson(key: string, value: unknown, ttlSeconds: number): Promise<void> {
    await command(["SET", key, JSON.stringify(value), "EX", ttlSeconds]);
  },
  /** Read back a value written with setJson, or null if missing/expired/unset. */
  async getJson<T>(key: string): Promise<T | null> {
    const raw = await command<string | null>(["GET", key]);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },
};
