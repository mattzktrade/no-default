import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { SITE } from "@/lib/content";
import { guides } from "@/lib/guides";
import { INDEXNOW_KEY, indexNowKeyLocation, indexNowPayload } from "@/lib/indexnow";
import { absoluteUrl, iconLinks, isFoodChrome, publicPaths, siteGraphLd, sitemapXml } from "@/lib/seo";

const publicDir = resolve(process.cwd(), "public");

describe("launch identity", () => {
  it("uses the live domain and Matt's email", () => {
    expect(SITE.url).toBe("https://no-default.com");
    expect(SITE.email).toBe("matt@no-default.com");
    expect(SITE.logo).toBe("/icon-512.png");
    expect(SITE.ogImage).toBe("/og.png");
    expect(SITE.ogImageAlt).toBe("nd");
  });

  it("builds absolute URLs from SITE.url", () => {
    expect(absoluteUrl("/")).toBe("https://no-default.com/");
    expect(absoluteUrl("/chat")).toBe("https://no-default.com/chat");
  });
});

describe("discovery files", () => {
  it("keeps sitemap.xml in sync with public paths", () => {
    const xml = readFileSync(resolve(publicDir, "sitemap.xml"), "utf8").replace(/\r\n/g, "\n");
    expect(xml).toBe(sitemapXml());
    expect(xml).toContain("https://no-default.com/chat");
    expect(xml).not.toContain("nodefault.co.uk");
  });

  it("lists every guide in the public path list", () => {
    const paths = publicPaths();
    expect(paths).toContain("/privacy");
    expect(paths).toContain("/guides");
    for (const guide of guides) {
      expect(paths).toContain(`/guides/${guide.slug}`);
    }
  });

  it("points robots.txt at the live sitemap", () => {
    const robots = readFileSync(resolve(publicDir, "robots.txt"), "utf8");
    expect(robots).toContain("Sitemap: https://no-default.com/sitemap.xml");
    expect(robots).toContain("OAI-SearchBot");
    expect(robots).not.toContain("nodefault.co.uk");
  });

  it("hosts an IndexNow key file that matches the ping payload", () => {
    const keyFile = readFileSync(resolve(publicDir, `${INDEXNOW_KEY}.txt`), "utf8").trim();
    expect(keyFile).toBe(INDEXNOW_KEY);
    expect(indexNowKeyLocation()).toBe(`https://no-default.com/${INDEXNOW_KEY}.txt`);
    const payload = indexNowPayload();
    expect(payload.host).toBe("no-default.com");
    expect(payload.urlList).toEqual(publicPaths().map((path) => absoluteUrl(path)));
    expect(payload.urlList.length).toBeGreaterThanOrEqual(16);
  });

  it("uses absolute URLs and the live email in llms.txt", () => {
    const llms = readFileSync(resolve(publicDir, "llms.txt"), "utf8");
    expect(llms).toContain("https://no-default.com");
    expect(llms).toContain(SITE.email);
    expect(llms).toContain("/guides");
    expect(llms).toContain("https://no-default.com/icon-512.png");
    expect(llms).not.toContain("hello@nodefault.co.uk");
  });

  it("publishes an nd mark for browsers, search and AI crawlers", () => {
    const files = [
      "favicon.ico",
      "favicon.svg",
      "favicon-32x32.png",
      "favicon-48x48.png",
      "apple-touch-icon.png",
      "icon-192.png",
      "icon-512.png",
      "icon-512-maskable.png",
      "safari-pinned-tab.svg",
      "site.webmanifest",
      "og.png",
    ];
    for (const file of files) {
      expect(existsSync(resolve(publicDir, file)), file).toBe(true);
    }
    const hrefs = iconLinks().map((link) => link.href);
    expect(hrefs.some((href) => href.startsWith("/favicon.ico"))).toBe(true);
    expect(hrefs.some((href) => href.startsWith("/favicon.svg"))).toBe(true);
    expect(hrefs).toContain("/apple-touch-icon.png");
    const org = (siteGraphLd() as { "@graph": Array<{ logo?: string }> })["@graph"][0];
    expect(org?.logo).toBe("https://no-default.com/icon-512.png");
    const svg = readFileSync(resolve(publicDir, "favicon.svg"), "utf8");
    expect(svg).toContain('aria-label="no default"');
    expect(svg).toContain("#1c1e22");
    const manifest = JSON.parse(readFileSync(resolve(publicDir, "site.webmanifest"), "utf8")) as { short_name: string; icons: { src: string }[] };
    expect(manifest.short_name).toBe("nd");
    expect(manifest.icons.map((icon) => icon.src)).toContain("/icon-512.png");
  });
});

describe("food chrome", () => {
  it("keeps pub visitors off the B2B header", () => {
    expect(isFoodChrome("/pubs-restaurants")).toBe(true);
    expect(isFoodChrome("/chat")).toBe(true);
    expect(isFoodChrome("/terms")).toBe(true);
    expect(isFoodChrome("/guides/pub-website-cost-uk")).toBe(true);
    expect(isFoodChrome("/")).toBe(false);
    expect(isFoodChrome("/pricing")).toBe(false);
    expect(isFoodChrome("/guides")).toBe(false);
    expect(isFoodChrome("/guides/replace-salesforce-without-another-subscription")).toBe(false);
  });
});
