// Minimal Upstash Redis REST client — a couple of fetch calls, no SDK. Used only to
// bridge the donate initiation request and PayHero's later async callback, which land
// in separate serverless invocations that share no memory.
//
// Needs UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (Vercel: Storage tab → add
// "Upstash for Redis" from the marketplace, or create a free database directly at
// upstash.com — either way it gives you these two values).

function isConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

async function command<T = unknown>(args: (string | number)[]): Promise<T | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
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
