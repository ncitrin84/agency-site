# Agency website — Astro + AWS Amplify

Static marketing site for the Guadalajara dementia home-care agency. Built with [Astro](https://astro.build); every page compiles to plain HTML, so there is nothing to crash and nothing to patch.

**Brand name, phone, domain and every tracking ID live in one file: `src/config/brand.js`.** Change the name there and the whole site updates.

## How updates work (day to day)

1. Open this folder in a Cowork session (Add folder → this repo).
2. Tell Claude what to change ("add a page on respite care", "change the hero headline").
3. Claude edits, you review, Claude commits and pushes to `main`.
4. Amplify rebuilds and deploys automatically in ~2 minutes. Every deploy is listed in the Amplify console with a one-click **Redeploy this version** rollback.

For a preview before going live: push to a branch (e.g. `draft`) — Amplify gives it its own URL.

## Pages

| URL | File | Funnel role (`page_type`) |
|---|---|---|
| `/` | `src/pages/index.astro` | `home` |
| `/servicios` | `src/pages/servicios.astro` | `services` |
| `/nosotros` | `src/pages/nosotros.astro` | `about` |
| `/contacto` | `src/pages/contacto.astro` | `contact` |
| `/gracias` | `src/pages/gracias.astro` | `thankyou` — the conversion page (noindex) |
| `/aviso-de-privacidad` | `src/pages/aviso-de-privacidad.astro` | `legal` — DRAFT, attorney review pending |

Layout, header, footer, floating WhatsApp button, GTM and consent banner: `src/layouts/Base.astro`.

## Tracking design

Only **one** tag is hard-coded: Google Tag Manager (`brand.gtmId`). GA4, Meta Pixel, Google Ads and HubSpot all load *inside* GTM, so adding or changing a tag never requires a code deploy.

The site pushes these events to `dataLayer` (from `data-track` attributes and the thank-you page):

| Event | Fired when | Use in GTM |
|---|---|---|
| `page_type` (variable) | every page | GA4 content_group → funnel steps |
| `cta_click` | any "Solicitar valoración" button (`event_label` = which one) | GA4 event |
| `whatsapp_click` | any WhatsApp link | GA4 key event + Meta `Contact` + Ads conversion |
| `phone_click` | any tel: link | GA4 key event + Meta `Contact` |
| `form_submit` | contact form submitted | GA4 event |
| `generate_lead` | `/gracias` loads | GA4 key event + Meta `Lead` + Google Ads conversion |
| `consent_granted` / `consent_denied` | banner choice | trigger for marketing tags |

Consent: Google Consent Mode v2 defaults to **denied** for ads/analytics storage until the visitor clicks *Aceptar*. In GTM, set Meta Pixel and HubSpot tags to fire on `consent_granted` (and on page load when the stored consent is already granted — use the built-in consent checks). Choice persists in `localStorage` key `sc_consent`.

Funnel to build in GA4 (Explore → Funnel exploration): `home` → `services` → `contact` → (`whatsapp_click` OR `phone_click` OR `generate_lead`).

## One-time setup checklist (≈ 90 minutes total)

Do these in order. Nothing here needs code changes except step 6.

1. **Domain** — buy the `.mx` (+ `.com.mx`) at [Akky](https://www.akky.mx) and the `.com` (if free) at AWS Route 53 or Akky. Same day you decide the name.
2. **GitHub** — create a free account, create an empty private repo (e.g. `agency-site`), then from this folder:
   ```bash
   git init && git add -A && git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<you>/agency-site.git
   git push -u origin main
   ```
3. **AWS** — create an account (Free Tier), enable MFA on the root user, create an IAM user for daily use. Region: `us-east-1`.
4. **Amplify Hosting** — AWS console → Amplify → *Create new app* → GitHub → pick the repo and `main`. It detects `amplify.yml` automatically. First build takes ~3 min. Then *Custom domains* → add your domain → Amplify shows the DNS records to create at Akky (CNAME/ANAME). SSL is automatic.
5. **Google** — one Google account for the business. Create, in this order: Google Tag Manager container (Web) → GA4 property (Mexico, MXN) → Google Search Console (verify via the GTM or DNS method) → Google Business Profile → Google Ads (needed only for the remarketing tag; can wait).
6. **Paste the GTM ID** into `src/config/brand.js` → `gtmId`, commit, push. This is the only code change.
7. **HubSpot** (free) — create account → Marketing → Forms → create "Contacto" form; copy Portal ID + Form ID into `brand.js`. Add the HubSpot tracking code as a Custom HTML tag in GTM (fires on `consent_granted` / stored consent).
8. **Meta** — Meta Business Suite → Events Manager → create Pixel; add it in GTM using the Meta Pixel template (fires on consent). Claim the Instagram/Facebook handles and the WhatsApp Business number now.
9. **Monitoring** — [UptimeRobot](https://uptimerobot.com) free monitor on the homepage (5-min checks, email alert). Amplify build-failure notifications: Amplify → Notifications → your email.
10. **Before ads go live** — attorney-reviewed `aviso de privacidad` replaces the draft page; the 10-step LFPDPPP checklist from the roadmap is done.

## Known limits worth remembering

- **Retargeting is restricted for health-related sites.** Google's personalized-ads policy and Meta's health-category data restrictions limit remarketing built from a dementia-care site. Pixels are installed for measurement and allowed audiences; plan on search ads on intent keywords + first-party nurture (HubSpot email/WhatsApp) as the real retargeting.
- **Forms carry personal data.** Under LFPDPPP the contact form collects only contact data plus free text; do not ask for diagnosis or medical detail on the website. Health data is collected only on paper/e-signature with express consent, per the compliance plan.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```
