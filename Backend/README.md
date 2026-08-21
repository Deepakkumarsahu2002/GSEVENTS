# GS Events Backend

Backend for the GS Events & Catering admin dashboard.

## Features
- Admin login with JWT authentication
- MongoDB storage for gallery images
- Cloudinary image upload support
- Gallery filtering by category
- Admin-only photo deletion

## Required environment variables
Copy `.env.example` to `.env` and fill in your values.

## Start it
```bash
npm install
npm run dev
```

The API runs at:
- http://localhost:4000

## Admin login
Default admin credentials (created automatically if missing):
- Email: admin@gseventsandcatering.com
- Password: GS@Events2026

Change these in your `.env` file before deployment.
