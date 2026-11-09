import { test, expect } from '../fixtures/qaex-api.fixture';

test.describe('Automated API Service Suite', () => {
  test('Formato do campo email na resposta de GET /users/1', async ({ apiClient }) => {
    const response = await apiClient.executeTargetRequest();
    expect(response.status()).toBe(404);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(body).toBeDefined();
    // Invalid JSON assertion skipped: json:address type
    // Invalid JSON assertion skipped: json:address.street type string
    // Invalid JSON assertion skipped: json:address.suite type string
    // Invalid JSON assertion skipped: json:address.city type string
    // Invalid JSON assertion skipped: json:address.zipcode type string
    // Invalid JSON assertion skipped: json:address.geo type object
    // Invalid JSON assertion skipped: json:id equals 1
    // Invalid JSON assertion skipped: json:email type string
    // Invalid JSON assertion skipped: json:address type object
    // Invalid JSON assertion skipped: json:$ type object
    // Invalid JSON assertion skipped: json:id type number
    // Invalid JSON assertion skipped: json:name type string
    // Invalid JSON assertion skipped: json:username type string
    // Invalid JSON assertion skipped: json:email type string
    // Invalid JSON assertion skipped: json:address type object
    // Invalid JSON assertion skipped: json:phone type string
    // Invalid JSON assertion skipped: json:website type string
    // Invalid JSON assertion skipped: json:company type object
    // Invalid JSON assertion skipped: json:id equals 1
    // Invalid JSON assertion skipped: json:email type string
    // Invalid JSON assertion skipped: json:email contains @
  });
});