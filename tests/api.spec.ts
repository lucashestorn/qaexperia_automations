import { test, expect } from '../fixtures/qaex-api.fixture';

/** Reads a JSON path: $, $.a.b, $[0].a, $[*].a (every item). Returns every matching value. */
function select(root: unknown, path: string): unknown[] {
  const tokens = (path.replace(/^\$/, '').match(/\[(\*|\d+)\]|[^.\[\]]+/g) ?? []);
  let nodes: unknown[] = [root];
  for (const token of tokens) {
    const next: unknown[] = [];
    for (const node of nodes) {
      if (token === '[*]' || token === '*') { if (Array.isArray(node)) next.push(...node); else throw new Error(`${path}: expected an array`); }
      else if (token.startsWith('[')) { const i = Number(token.slice(1, -1)); if (Array.isArray(node) && i < node.length) next.push(node[i]); }
      else if (Array.isArray(node)) { for (const item of node) { if (item && typeof item === 'object' && token in (item as object)) next.push((item as Record<string, unknown>)[token]); else throw new Error(`${path}: an item has no ${token}`); } }
      else if (node && typeof node === 'object' && token in (node as object)) next.push((node as Record<string, unknown>)[token]);
    }
    nodes = next;
  }
  return nodes;
}

function typeName(v: unknown): string { return v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v; }

test.describe("Formato do campo email na resposta de GET /users/1", () => {
  test("Envia GET para /users/9999 com header Accept application/json.", async ({ apiClient }) => {
    const headers: Record<string, string> = {"Accept":"application/json"};
    const response = await apiClient.send("GET", "https://jsonplaceholder.typicode.com/users/9999", headers, undefined);
    expect(response.status(), "Verifica que o status retornado \u00E9 404 para o id 9999.").toBe(404);
  });

  test("Envia GET para /users/100000 com header Accept application/json.", async ({ apiClient }) => {
    const headers: Record<string, string> = {"Accept":"application/json"};
    const response = await apiClient.send("GET", "https://jsonplaceholder.typicode.com/users/100000", headers, undefined);
    expect(response.status(), "Verifica que o status retornado \u00E9 404 para o id 100000.").toBe(404);
  });

  test("Envia GET para /users/0 com header Accept application/json.", async ({ apiClient }) => {
    const headers: Record<string, string> = {"Accept":"application/json"};
    const response = await apiClient.send("GET", "https://jsonplaceholder.typicode.com/users/0", headers, undefined);
    expect(response.status(), "Verifica que o status retornado \u00E9 404 para o id 0.").toBe(404);
  });

  test("Envia GET para /users/1 com header Accept application/json.", async ({ apiClient }) => {
    const headers: Record<string, string> = {"Accept":"application/json"};
    const response = await apiClient.send("GET", "https://jsonplaceholder.typicode.com/users/1", headers, undefined);
    const body = await response.json().catch(() => { throw new Error('The response body is not JSON.'); });
    expect(response.status(), "Verifica que o status retornado \u00E9 200.").toBe(200);
    { const nodes = select(body, "$.address"); expect(nodes.length, "Verifica que address \u00E9 um objeto JSON.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que address \u00E9 um objeto JSON.").toBe("object"); }
    { const nodes = select(body, "$.address.street"); expect(nodes.length, "Verifica que address.street \u00E9 uma string.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que address.street \u00E9 uma string.").toBe("string"); }
    { const nodes = select(body, "$.address.suite"); expect(nodes.length, "Verifica que address.suite \u00E9 uma string.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que address.suite \u00E9 uma string.").toBe("string"); }
    { const nodes = select(body, "$.address.city"); expect(nodes.length, "Verifica que address.city \u00E9 uma string.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que address.city \u00E9 uma string.").toBe("string"); }
    { const nodes = select(body, "$.address.zipcode"); expect(nodes.length, "Verifica que address.zipcode \u00E9 uma string.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que address.zipcode \u00E9 uma string.").toBe("string"); }
    { const nodes = select(body, "$.address.geo"); expect(nodes.length, "Verifica que address.geo \u00E9 um objeto.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que address.geo \u00E9 um objeto.").toBe("object"); }
  });

  test("Envia GET para /users/1 com header Accept application/json. (2)", async ({ apiClient }) => {
    const headers: Record<string, string> = {"Accept":"application/json"};
    const response = await apiClient.send("GET", "https://jsonplaceholder.typicode.com/users/1", headers, undefined);
    const body = await response.json().catch(() => { throw new Error('The response body is not JSON.'); });
    expect(response.status(), "Verifica que o status retornado \u00E9 200.").toBe(200);
    expect(response.headers()["content-type"] ?? '', "Verifica que o header Content-Type cont\u00E9m application/json.").toContain("application/json");
    { const nodes = select(body, "$.id"); expect(nodes.length, "Verifica que o campo id \u00E9 igual a 1.").toBeGreaterThan(0); for (const n of nodes) expect(String(n), "Verifica que o campo id \u00E9 igual a 1.").toBe("1"); }
    { const nodes = select(body, "$.email"); expect(nodes.length, "Verifica que o campo email \u00E9 uma string.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que o campo email \u00E9 uma string.").toBe("string"); }
    { const nodes = select(body, "$.address"); expect(nodes.length, "Verifica que o campo address \u00E9 um objeto JSON.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que o campo address \u00E9 um objeto JSON.").toBe("object"); }
  });

  test("Envia GET para /users/1 com header Accept application/json. (3)", async ({ apiClient }) => {
    const headers: Record<string, string> = {"Accept":"application/json"};
    const response = await apiClient.send("GET", "https://jsonplaceholder.typicode.com/users/1", headers, undefined);
    const body = await response.json().catch(() => { throw new Error('The response body is not JSON.'); });
    expect(response.status(), "Verifica que o status retornado \u00E9 200.").toBe(200);
    expect(response.headers()["content-type"] ?? '', "Verifica que o header Content-Type cont\u00E9m application/json.").toContain("application/json");
    { const nodes = select(body, "$"); expect(nodes.length, "Verifica que o corpo da resposta \u00E9 um objeto JSON v\u00E1lido.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que o corpo da resposta \u00E9 um objeto JSON v\u00E1lido.").toBe("object"); }
  });

  test("Envia GET para /users/1 com header Accept application/json. (4)", async ({ apiClient }) => {
    const headers: Record<string, string> = {"Accept":"application/json"};
    const response = await apiClient.send("GET", "https://jsonplaceholder.typicode.com/users/1", headers, undefined);
    const body = await response.json().catch(() => { throw new Error('The response body is not JSON.'); });
    expect(response.status(), "Verifica que o status retornado \u00E9 200.").toBe(200);
    { const nodes = select(body, "$.id"); expect(nodes.length, "Verifica que o campo id \u00E9 um n\u00FAmero.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que o campo id \u00E9 um n\u00FAmero.").toBe("number"); }
    { const nodes = select(body, "$.name"); expect(nodes.length, "Verifica que o campo name \u00E9 uma string.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que o campo name \u00E9 uma string.").toBe("string"); }
    { const nodes = select(body, "$.username"); expect(nodes.length, "Verifica que o campo username \u00E9 uma string.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que o campo username \u00E9 uma string.").toBe("string"); }
    { const nodes = select(body, "$.email"); expect(nodes.length, "Verifica que o campo email \u00E9 uma string.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que o campo email \u00E9 uma string.").toBe("string"); }
    { const nodes = select(body, "$.address"); expect(nodes.length, "Verifica que o campo address \u00E9 um objeto.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que o campo address \u00E9 um objeto.").toBe("object"); }
    { const nodes = select(body, "$.phone"); expect(nodes.length, "Verifica que o campo phone \u00E9 uma string.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que o campo phone \u00E9 uma string.").toBe("string"); }
    { const nodes = select(body, "$.website"); expect(nodes.length, "Verifica que o campo website \u00E9 uma string.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que o campo website \u00E9 uma string.").toBe("string"); }
    { const nodes = select(body, "$.company"); expect(nodes.length, "Verifica que o campo company \u00E9 um objeto.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que o campo company \u00E9 um objeto.").toBe("object"); }
  });

  test("Envia GET para /users/1 sem header Accept expl\u00EDcito.", async ({ apiClient }) => {
    const headers: Record<string, string> = {};
    const response = await apiClient.send("GET", "https://jsonplaceholder.typicode.com/users/1", headers, undefined);
    const body = await response.json().catch(() => { throw new Error('The response body is not JSON.'); });
    expect(response.status(), "Verifica que o status retornado \u00E9 200.").toBe(200);
    { const nodes = select(body, "$.id"); expect(nodes.length, "Verifica que o campo id \u00E9 igual a 1.").toBeGreaterThan(0); for (const n of nodes) expect(String(n), "Verifica que o campo id \u00E9 igual a 1.").toBe("1"); }
  });

  test("Envia GET para /users/9999 com header Accept application/json. (2)", async ({ apiClient }) => {
    const headers: Record<string, string> = {"Accept":"application/json"};
    const response = await apiClient.send("GET", "https://jsonplaceholder.typicode.com/users/9999", headers, undefined);
    expect(response.status(), "Verifica que o status retornado \u00E9 404.").toBe(404);
  });

  test("Envia GET para /users/1 com header Accept application/json. (5)", async ({ apiClient }) => {
    const headers: Record<string, string> = {"Accept":"application/json"};
    const response = await apiClient.send("GET", "https://jsonplaceholder.typicode.com/users/1", headers, undefined);
    const body = await response.json().catch(() => { throw new Error('The response body is not JSON.'); });
    expect(response.status(), "Verifica que o status retornado \u00E9 200.").toBe(200);
    { const nodes = select(body, "$.email"); expect(nodes.length, "Verifica que o campo email \u00E9 uma string.").toBeGreaterThan(0); for (const n of nodes) expect(typeName(n), "Verifica que o campo email \u00E9 uma string.").toBe("string"); }
    { const nodes = select(body, "$.email"); expect(nodes.length, "Verifica que o campo email cont\u00E9m o caractere @.").toBeGreaterThan(0); for (const n of nodes) expect(Array.isArray(n) ? n.map(String) : String(n), "Verifica que o campo email cont\u00E9m o caractere @.").toContain("@"); }
  });

});
