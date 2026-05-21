import type { APIRoute } from 'astro';
import { ALLOW_BOTS, BLOCK_BOTS } from '../data/ai-bots';

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = site
    ? `${site.toString().replace(/\/$/, '')}/sitemap-index.xml`
    : null;

  const lines: string[] = [];
  lines.push('# Strategy: allow normal + AI search/citation bots, block AI training crawlers.');
  lines.push('');
  lines.push('User-agent: *');
  lines.push('Content-Signal: search=yes,ai-train=no,ai-input=no');
  lines.push('Allow: /');
  lines.push('');
  lines.push('# === AI search / citation bots — explicitly allowed ===');
  for (const ua of ALLOW_BOTS) {
    lines.push(`User-agent: ${ua}`);
    lines.push('Allow: /');
    lines.push('');
  }
  lines.push('# === AI training crawlers — blocked ===');
  for (const ua of BLOCK_BOTS) {
    lines.push(`User-agent: ${ua}`);
    lines.push('Disallow: /');
    lines.push('');
  }
  if (sitemapUrl) lines.push(`Sitemap: ${sitemapUrl}`);

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
