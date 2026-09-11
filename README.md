# Kirti Patange — HR Consulting & Advisory

A responsive consulting website built with Astro 6, Tailwind CSS 4 and TypeScript. Static HTML, system fonts and minimal JavaScript; no database or form backend.

Website: https://kirtiHRConsulting.github.io/
Repository: https://github.com/kirtiHRConsulting/kirtiHRConsulting.github.io
Email: kirti.hr.consulting@gmail.com
Phone: +91 92208 14016
Location: Mumbai, India

## Development

Use Node.js 24 and pnpm 11.19.0:

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
node scripts/verify-build.mjs
pnpm preview
```

Open the URL printed by Astro. Both development and production use `/`. Output is generated in `dist/` and is not committed. Commit the lockfile and workspace settings, which allow required esbuild and sharp installation scripts.

## Structure

- `src/data/site.ts`: brand, contacts, navigation, services, metrics, industries and social links.
- `src/components/`: reusable homepage sections and contact form.
- `src/layouts/MainLayout.astro`: SEO metadata and structured data.
- `src/pages/`: homepage, robots.txt and sitemap.xml.
- `src/styles/global.css`: theme and responsive layout.
- `public/`: public assets, including favicon.
- `astro.config.mjs`: domain and root base path.
- `.github/workflows/deploy.yml`: Pages deployment.
- `scripts/verify-build.mjs`: production output checks.

## Content and contact form

Edit shared content in `src/data/site.ts`. One-off introductions and biography text live in their named components. Update career figures only when their meaning and measurement context are verified.

The form opens a draft in the visitor's email application. It does not send or store enquiries and never reports a successful submission. Email and phone links work independently. A configured email application is needed for mailto. To introduce a backend, replace the handler in `Contact.astro`, add accurate success/error states and privacy information, and keep credentials out of browser code.

## Portrait, partnerships and branding

The portrait is an intentional initials placeholder, not a stock person. Add an approved photograph at `public/images/kirti-patange.webp`, set `site.photo.src` to `images/kirti-patange.webp`, and provide suitable alt text. A 600×720 portrait under 150 KB is appropriate.

Social links stay hidden while `site.socialLinks` is empty. The named partner remains hidden with `site.partnership.confirmed: false`; do not enable it or add a logo without confirmation.

Edit colours and spacing in `src/styles/global.css`, keeping Tailwind values aligned with CSS custom properties. Update the wordmark through the central data file and the favicon in `public/`. A sharing image can later be set in `site.socialImage`; no fake image URL is emitted.

## GitHub Pages deployment

This repository is a user site. Configuration is explicitly:

```js
site: 'https://kirtiHRConsulting.github.io/',
base: '/',
```

Do not add a repository subpath. Canonical, Open Graph URL, structured data, sitemap and assets use the domain root. URL normalisation can lowercase the hostname; this is the same domain.

Select **Settings → Pages → Source → GitHub Actions**. Pushes to `main` install dependencies, build and upload static output, then deploy through Pages. The workflow can also be started manually from Actions and follows the [official Astro guide](https://docs.astro.build/en/guides/deploy/github/).

For a future custom domain, configure DNS and GitHub Pages settings, add `public/CNAME` with the hostname, change Astro's `site`, keep `base: '/'`, and rebuild. Verify canonical and sitemap URLs afterwards.

Reference PDFs, private notes, local tools and generated output are excluded from version control. Only public assets and generated routes are deployed.
