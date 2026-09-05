# Seasonal's Natural POS — Cloudflare Migration Step 3

This is a temporary connection test, not the complete POS. It verifies:

- Cloudflare Workers deployment from private GitHub
- Static asset delivery
- Private server-side connection to Supabase
- Secrets are not exposed to browser code

## Required Worker secrets

Add in Cloudflare Worker → Settings → Variables and Secrets as encrypted secrets:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Never commit either value to GitHub.

## Cloudflare Builds

- Build command: `npm run deploy`
- Deploy command (if requested separately): `npx wrangler deploy`
- Root directory: `/`

After deployment, open the workers.dev URL and press **Test secure database connection**. The expected result is:

`Worker and database connected`

Do not switch tablets from PythonAnywhere yet.
