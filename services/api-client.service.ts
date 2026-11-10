import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApiService } from './base-api.service';

/**
 * ApiClientService - Service Object Model for the target API.
 */
export class ApiClientService extends BaseApiService {
  constructor(request: APIRequestContext, baseUrl: string = '') {
    super(request, baseUrl);
  }

  async send(method: string, endpoint: string, headers?: Record<string, string>, data?: unknown): Promise<APIResponse> {
    return await this.request.fetch(this.resolveUrl(endpoint), { method, headers, data });
  }
}