import { SITE } from "./content";
import { absoluteUrl, publicPaths } from "./seo";

/** Public IndexNow key. Hosted at /{key}.txt so Bing can verify ownership. Google ignores IndexNow. */
export const INDEXNOW_KEY = "c00ac27b5f694b47086c88ab653ddc5a";

export function indexNowKeyLocation(): string {
  return `${SITE.url}/${INDEXNOW_KEY}.txt`;
}

export function indexNowPayload() {
  const host = new URL(SITE.url).host;
  return {
    host,
    key: INDEXNOW_KEY,
    keyLocation: indexNowKeyLocation(),
    urlList: publicPaths().map((path) => absoluteUrl(path)),
  };
}

export async function submitIndexNow(fetchImpl: typeof fetch = fetch) {
  const payload = indexNowPayload();
  const response = await fetchImpl("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const body = await response.text();
  return { ok: response.ok, status: response.status, body, urlCount: payload.urlList.length };
}
