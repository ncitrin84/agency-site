import { defineConfig } from 'astro/config';
import { brand } from './src/config/brand.js';

// Static output: every page is plain HTML served from CloudFront via Amplify.
export default defineConfig({
  site: `https://${brand.domain}`,
  output: 'static',
  // /servicios -> dist/servicios/index.html so Amplify/CloudFront serves clean URLs with no rewrite rules.
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
