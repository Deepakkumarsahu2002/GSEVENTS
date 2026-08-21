Cloudflare Pages deployment guide — Frontend

Overview
- This project builds a static frontend bundle into `dist/client` when running `npm run build`.
- Cloudflare Pages can serve the contents of `dist/client` as the publish directory.

Recommended Cloudflare Pages settings
- Framework preset: None (Use Custom Build)
- Build command: npm run build
- Build directory (publish directory): dist/client
- Node version: 18.x or 20.x (set in Pages or use .nvmrc)
- Install command: npm install

Environment / build notes
- Vite produces the static browser bundle in `dist/client` for Pages hosting.
- The server output under `dist/server` is not used for static Pages deployment.
- If you need SSR or server functions, deploy the backend separately or use a Worker-based runtime.

Custom domain & SSL
- Add your custom domain in Pages -> Custom Domains.
- Cloudflare Pages provides automatic SSL for domains managed in the same account.

Cache & assets
- Assets are fingerprinted by the build process; cache aggressively for long expiry and use cache-busting on deploy.

Post-deploy checks
1. Confirm build succeeded in Pages logs.
2. Visit https://<your-pages-site>.pages.dev and open the root. Verify `/favicon.png` and `/sitemap.xml` load.
3. Submit sitemap URL to Google Search Console: https://<your-pages-site>/sitemap.xml

CI/CD notes
- Cloudflare Pages will automatically redeploy on pushes to the connected branch (e.g., main).
- If you want preview branches, use Pages preview deployments.

Advanced (optional)
- Use Cloudflare Workers or Pages Functions if you need server-side endpoints or to proxy API calls to the Render backend.
- For security, configure environment secrets in the Pages UI for any build-time secret needed (avoid putting secrets in repo).