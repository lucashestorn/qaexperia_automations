import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * BaseApiService - Foundation for Tier-S Playwright API Testing
 * Encapsulates URL resolution, headers injection, and HTTP methods.
 */
export abstract class BaseApiService {
  constructor(
    protected readonly request: APIRequestContext,
    protected readonly baseUrl: string = ''
  ) {}

  protected resolveUrl(endpoint: string): string {
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }
    const cleanBase = this.baseUrl.replace(/\/+$/, '');
    const cleanPath = endpoint.replace(/^\/+/, '');
    return `${cleanBase}/${cleanPath}`;
  }

  async get(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    return await this.request.get(this.resolveUrl(endpoint), { headers });
  }

  async post(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<APIResponse> {
    return await this.request.post(this.resolveUrl(endpoint), { data, headers });
  }

  async put(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<APIResponse> {
    return await this.request.put(this.resolveUrl(endpoint), { data, headers });
  }

  async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    return await this.request.delete(this.resolveUrl(endpoint), { headers });
  }
}