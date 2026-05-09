import type { APIRoute } from 'astro';
import { llmsIndex } from '../data/llms-index';

export const GET: APIRoute = ({ site }) => {
  const base = site ? site.toString().replace(/\/$/, '') : '';
  const lines: string[] = [];

  lines.push(`# ${llmsIndex.name}`);
  lines.push('');
  lines.push(`> ${llmsIndex.description}`);
  lines.push('');
  if (llmsIndex.longDescription?.length) {
    for (const para of llmsIndex.longDescription) lines.push(para);
    lines.push('');
  }
  for (const section of llmsIndex.sections) {
    lines.push(`## ${section.heading}`);
    lines.push('');
    for (const item of section.items) {
      lines.push(`- [${item.title}](${base}${item.path}): ${item.description}`);
    }
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
