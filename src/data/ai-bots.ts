// Canonical bot list — keep in sync with C:\dev\_playbooks\ai-seo-playbook.md
// Allow citation/search bots, block training crawlers.

export const ALLOW_BOTS = [
  // Standard search engines (also feed AI surfaces)
  'Googlebot',
  'bingbot',
  'Slurp',
  'DuckDuckBot',
  'Applebot',
  'YandexBot',
  // AI search / citation
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'Claude-User',
  'Claude-SearchBot',
  'MistralAI-User',
  'DuckAssistBot',
  'YouBot',
  // Amazonbot intentionally omitted — CF managed list blocks it; CF's specific rule wins over our `*`.
];

export const BLOCK_BOTS = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Meta-ExternalAgent',
  'FacebookBot',
  'cohere-ai',
  'Bytespider',
  'PetalBot',
  'Diffbot',
  'Omgilibot',
  'Omgili',
  'Timpibot',
  'AI2Bot',
  'AI2Bot-Dolma',
  'ImagesiftBot',
  'Kangaroo Bot',
  'Sidetrade indexer bot',
];
