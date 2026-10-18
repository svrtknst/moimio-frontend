import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('apiUrl', () => {
  it('uses same-origin API paths when no base URL is configured', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '');
    const { apiUrl } = await import('./api');

    expect(apiUrl('/api/events')).toBe('/api/events');
  });

  it('uses the configured backend origin and trims trailing slashes', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://backend.example.com///');
    const { apiUrl } = await import('./api');

    expect(apiUrl('/api/events')).toBe('https://backend.example.com/api/events');
  });
});
