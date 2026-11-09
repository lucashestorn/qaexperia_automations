import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApiService } from './base-api.service';

/**
 * ApiClientService - Service Object Model for target API endpoints.
 */
export class ApiClientService extends BaseApiService {
  constructor(request: APIRequestContext, baseUrl: string = '') {
    super(request, baseUrl);
  }

  async executeTargetRequest(): Promise<APIResponse> {
    return await this.get('https://jsonplaceholder.typicode.com/users/9999');
  }
  async executeRequest1(): Promise<APIResponse> {
    return await this.get('https://jsonplaceholder.typicode.com/users/9999');
  }
  async executeRequest2(): Promise<APIResponse> {
    return await this.get('https://jsonplaceholder.typicode.com/users/100000');
  }
  async executeRequest3(): Promise<APIResponse> {
    return await this.get('https://jsonplaceholder.typicode.com/users/0');
  }
  async executeRequest4(): Promise<APIResponse> {
    return await this.get('https://jsonplaceholder.typicode.com/users/1');
  }
  async executeRequest5(): Promise<APIResponse> {
    return await this.get('https://jsonplaceholder.typicode.com/users/1');
  }
  async executeRequest6(): Promise<APIResponse> {
    return await this.get('https://jsonplaceholder.typicode.com/users/1');
  }
  async executeRequest7(): Promise<APIResponse> {
    return await this.get('https://jsonplaceholder.typicode.com/users/1');
  }
  async executeRequest8(): Promise<APIResponse> {
    return await this.get('https://jsonplaceholder.typicode.com/users/1');
  }
  async executeRequest9(): Promise<APIResponse> {
    return await this.get('https://jsonplaceholder.typicode.com/users/9999');
  }
  async executeRequest10(): Promise<APIResponse> {
    return await this.get('https://jsonplaceholder.typicode.com/users/1');
  }
}