Production checklist and next steps

This file lists tasks to finish to consider the project production-ready and how to deploy the frontend to Cloudflare Pages and the backend to Render.

Frontend (Cloudflare Pages)
- Build command: npm run build
- Publish directory: dist/client
- Ensure public/favicon.png and public/og-image.jpg are present (optimize images with npm run optimize:images)
- Add custom domain and enable HTTPS in Pages
- Ensure sitemap.xml at /sitemap.xml and robots.txt are present
- Run Lighthouse audit (see below)

Backend (Render)
- Deploy Backend/ as a Node web service
- Set environment variables in Render Dashboard using Backend/.env.example as template
- Ensure database (MongoDB Atlas) and Cloudinary are configured
- Add a health check route

SEO & Performance
- Sitemap: public/sitemap.xml (created)
- Robots: public/robots.txt (already present)
- OG image: public/og-image.jpg (generate using optimize script)
- Favicon: public/favicon.png (created)

Lighthouse
- Run Lighthouse in Chrome or use Lighthouse CI. Address top issues: reduce unused JS, compress/resize images, add caching headers, enable text compression.

Optional
- Optimize the large images in src/assets (some are several MB). Use `npm install --save-dev sharp` and `npm run optimize:images`.
- Consider adding CI (GitHub Actions) to run a build and a Lighthouse check on each push.

If you want, I can:
- Generate an optimized og-image and compressed favicon automatically (run optimize script).
- Create a GitHub Actions workflow that builds frontend and runs a Lighthouse CI step.
