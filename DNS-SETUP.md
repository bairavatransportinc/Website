# DNS Setup — bairavatransport.ca

The website code and GitHub Pages deployment are **working**. The only thing
blocking the site from going live at `www.bairavatransport.ca` is **DNS**: the
domain currently does not resolve (returns `NXDOMAIN`).

Hand this page to whoever manages the `bairavatransport.ca` domain.

---

## Current status (as of Aug 2026)

- ✅ GitHub Pages deploys successfully on every push to `main`.
- ✅ Custom domain `www.bairavatransport.ca` is configured in the repo.
- ✅ GitHub Pages URL (`bairavatransportinc.github.io/Website/`) redirects to
      the custom domain — proof the deploy side is healthy.
- ❌ `www.bairavatransport.ca` and `bairavatransport.ca` return **NXDOMAIN**.
- ❌ The domain has **no delegated nameservers** — there is no DNS zone
      answering for it yet.
- ⚠️ "Enforce HTTPS" is **off** in GitHub (can't be enabled until DNS resolves
      and GitHub verifies the domain).

---

## Step 1 — Get the domain onto a DNS host (DO THIS FIRST)

At the registrar for `bairavatransport.ca`:

1. Confirm the domain is **registered and active** in your account.
2. Ensure it has **nameservers assigned** — either the registrar's own DNS, or
   a DNS provider (e.g. Cloudflare). Until nameservers are delegated, the domain
   will keep returning NXDOMAIN no matter what records are added.

## Step 2 — Add these records in the DNS zone

### `www` subdomain (primary target)

| Type  | Name | Value                            | TTL  |
| ----- | ---- | -------------------------------- | ---- |
| CNAME | www  | bairavatransportinc.github.io    | 3600 |

### Apex / root domain (so `bairavatransport.ca` also works) — 4 A records

| Type | Name | Value            |
| ---- | ---- | ---------------- |
| A    | @    | 185.199.108.153  |
| A    | @    | 185.199.109.153  |
| A    | @    | 185.199.110.153  |
| A    | @    | 185.199.111.153  |

### Optional — IPv6 (AAAA) for the apex

| Type | Name | Value                 |
| ---- | ---- | --------------------- |
| AAAA | @    | 2606:50c0:8000::153   |
| AAAA | @    | 2606:50c0:8001::153   |
| AAAA | @    | 2606:50c0:8002::153   |
| AAAA | @    | 2606:50c0:8003::153   |

> If the DNS provider doesn't allow A/CNAME records on the apex (`@`), use an
> **ALIAS / ANAME** record pointing to `bairavatransportinc.github.io`, or set
> `www` as the primary and redirect the apex → `www`.

## Step 3 — After DNS propagates (minutes to a few hours)

1. In the repo: **Settings → Pages** — the custom domain should show a green
   "DNS check successful."
2. Enable **"Enforce HTTPS"** (currently off). GitHub provisions the TLS
   certificate automatically once the domain verifies.

---

## Verify

```bash
# Should return GitHub's IPs, not NXDOMAIN:
nslookup www.bairavatransport.ca

# Expect: HTTP/2 200
curl -sI https://www.bairavatransport.ca | head -1
```

## GitHub Pages IPs (reference)

These are GitHub's published Pages IP addresses (used in the A records above).
If GitHub ever changes them, the current list is at:
https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
