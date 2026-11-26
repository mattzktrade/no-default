# no default

UK studio that replaces messy SaaS stacks with one custom business system, and builds hands-off websites for pubs, cafés, restaurants and takeaways.

Live site: [https://no-default.com](https://no-default.com)

## Local development

Needs Node.js 22.

```sh
npm i
npm run dev
```

```sh
npm test
npm run build
```

## Hosting

The app is TanStack Start with Nitro, deployed on Vercel from GitHub.

1. Import this repository in Vercel (Node 22, build command `npm run build`).
2. Attach `no-default.com`. Redirect `www.no-default.com` to the apex.
3. Set `RESEND_API_KEY` so `/contact` and `/chat` can email `matt@no-default.com`. Verify the domain in Resend so mail can send from that address.

Contact forms fall back to a mailto link if sending fails.
