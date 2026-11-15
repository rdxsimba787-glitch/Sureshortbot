# SURESHORT BOT — Security by SURESHORT POLICE

## Structure
```
public/index.html   install page (generates both bookmarklets)
public/engine.js    USER engine      public/admin.js   ADMIN engine
functions/api/[[r]].js  backend API (Pages Functions = Workers runtime)
schema.sql  wrangler.toml
```

## Deploy (Cloudflare Pages)
1. `npm i -g wrangler && wrangler login`
2. `wrangler d1 create sureshort` → paste the id into `wrangler.toml`
3. `wrangler d1 execute sureshort --remote --file=schema.sql`
4. `wrangler pages deploy public --project-name sureshort-bot`
5. Pages → Settings → Bindings: D1 `DB` = sureshort. Settings → Variables (as **Secrets**): `SECRET` (long random string, signs licence tokens) and `ADMIN_KEY` (your admin password).
6. Redeploy once after step 5.

## Mobile install (Android Chrome)
1. Open `https://YOUR-PROJECT.pages.dev` → Copy the **User** code.
2. Bookmark any page → edit bookmark → name `SURESHORT`, paste the code as URL.
3. Repeat with the **Admin** code (name it `SS ADMIN`; never share it).
4. Open any site, type the bookmark name in the address bar and tap it (Chrome blocks tapping from the bookmarks list; use the address-bar method).

## Test
Admin bookmarklet → enter ADMIN_KEY → set brand/links → Generate key → User bookmarklet → activate → run analysis. Re-using the key on another browser must fail.

## Security notes
- Licence authority is the D1 database; tokens are HMAC-signed; localStorage only holds a device id and token.
- Admin API needs `x-admin-key` (Cloudflare secret). No secret is in client code.
- Obfuscate before deploy: `npx terser public/engine.js -m -c -o public/engine.js && npx javascript-obfuscator public/engine.js --output public/engine.js` (same for admin.js). This only makes casual reading harder; client JS can never be fully hidden.
- Sites with strict CSP may block bookmarklet script loading; nothing here can bypass that.
- Add rate limiting via Cloudflare WAF rules on `/api/redeem` and `/api/admin/*`.

## Analysis
Real Binance public candles → EMA9/EMA21 + RSI14. If data is unreachable or indicators disagree → NO SIGNAL. No random output, no accuracy/profit claims, no trading.
