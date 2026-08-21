Render deployment guide — Backend (Express + MongoDB)

Overview
This document provides recommended Render settings to deploy the backend API.

Repository layout
- Backend/ contains the Express app entrypoint `server.js`.

Render service settings (Web Service)
- Environment: Node
- Build Command: npm ci && npm run build || (if no build) npm ci
- Start Command: node server.js
- Plan: Choose according to traffic; Starter will work for testing.

Environment variables (add in Render Dashboard)
- PORT=4000 (Render provides a port automatically; prefer leaving PORT unset or map the Render PORT env value)
- MONGODB_URI - your MongoDB connection string
- JWT_SECRET - strong secret for JWTs
- CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET - if using Cloudinary
- ADMIN_EMAIL / ADMIN_PASSWORD - initial admin credentials; use secure values

Persistent storage
- Render does not persist filesystem between deploys. Use cloud storage or Cloudinary for image storage (recommended). The current app appears to use Cloudinary; set the Cloudinary env vars.

Health checks
- Add a health check route (e.g., GET /health) and configure Render's health check to that path.

Logs & Monitoring
- Use Render's built-in logs for stdout/stderr. Configure alerts for repeated failures.

Database
- Use a managed MongoDB provider (Atlas) and restrict IP access to Render IP ranges or use VPC peering where applicable.

Secrets handling
- Do NOT commit .env with secrets. Use Render's Dashboard to set environment variables.

Example Render YAML (optional)
Render supports a service definition via render.yaml. A minimal example can be added to the repo and used by Render: 

service:
  name: gsevents-backend
  type: web
  env: node
  plan: starter
  buildCommand: npm ci
  startCommand: node server.js

(Adapt values to your org and repo)

Post-deploy verification
1. Deploy from the Render dashboard (connect repo).
2. Set environment variables in the service settings.
3. Deploy and verify `https://<your-backend>.onrender.com/api/health` returns 200 (add a health route if missing).
4. Test protected endpoints with JWT issuance via /api/auth/login and use the token to call /api/photos.

Security notes
- Rotate JWT_SECRET and other keys if leaked.
- Use least-privilege for DB users.
