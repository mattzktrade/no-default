import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const keyFiles = readdirSync(publicDir).filter((name) => /^[a-f0-9]{32}\.txt$/i.test(name));

if (keyFiles.length !== 1) {
  throw new Error(`Expected one IndexNow key file in public/, found ${keyFiles.length}.`);
}

const keyFile = keyFiles[0];
const key = keyFile.replace(/\.txt$/i, "");
const hosted = readFileSync(join(publicDir, keyFile), "utf8").trim();
if (hosted !== key) {
  throw new Error(`IndexNow key file ${keyFile} does not contain the key.`);
}

const sitemap = readFileSync(join(publicDir, "sitemap.xml"), "utf8");
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (urlList.length === 0) {
  throw new Error("sitemap.xml has no URLs.");
}

const host = "no-default.com";
const keyLocation = `https://${host}/${keyFile}`;
const payload = { host, key, keyLocation, urlList };

console.log(`IndexNow key: ${keyLocation}`);
console.log(`Submitting ${urlList.length} URLs for ${host}`);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});
const body = await response.text();

if (!response.ok) {
  console.error(`IndexNow failed (${response.status}): ${body || "(empty body)"}`);
  console.error("The key file must be live at the URL above before Bing will accept a ping.");
  process.exit(1);
}

console.log(`IndexNow accepted ${urlList.length} URLs (${response.status}).`);
