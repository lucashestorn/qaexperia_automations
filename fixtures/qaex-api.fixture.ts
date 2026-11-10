import { test as base, expect } from '@playwright/test';
import { ApiClientService } from '../services/api-client.service';

export type ApiFixtures = {
  apiClient: ApiClientService;
};

export const test = base.extend<ApiFixtures>({
  apiClient: async ({ request }, use) => {
    const client = new ApiClientService(request, "https://jsonplaceholder.typicode.com");
    await use(client);
  },
});

export { expect };