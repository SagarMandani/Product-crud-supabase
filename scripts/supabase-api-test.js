/**
 * Same REST setup as src/services/productService.ts (Node / axios).
 * Run: npm run test:supabase
 */
const axios = require('axios');

const SUPABASE_URL = 'https://wyscgkxcamrukvpjuirv.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5c2Nna3hjYW1ydWt2cGp1aXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1NzEwNjgsImV4cCI6MjA5NDE0NzA2OH0.1VigZrOfv6eW6n91VJNyBuRAzENyc6dkgbRrTk-3lQA';

const restClient = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  timeout: 45000,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

async function main() {
  console.log('Supabase API test (GET → POST → PATCH → DELETE)\n');

  console.log('1) GET /products …');
  const r1 = await restClient.get('/products', {
    params: { select: '*', order: 'id.desc' },
  });
  console.log('   PASS', r1.status, 'rows:', Array.isArray(r1.data) ? r1.data.length : '?');

  const stamp = `api-test-${Date.now()}`;
  console.log('2) POST /products …');
  const r2 = await restClient.post(
    '/products?select=*',
    [{ name: stamp, price: 1, quantity: 1 }],
    { headers: { Prefer: 'return=representation' } },
  );
  const id = r2.data?.[0]?.id;
  if (!id) {
    throw new Error('POST did not return id');
  }
  console.log('   PASS', r2.status, 'new id:', id);

  console.log('3) PATCH /products …');
  const r3 = await restClient.patch(
    `/products?id=eq.${id}&select=*`,
    { name: `${stamp}-patched` },
    { headers: { Prefer: 'return=representation' } },
  );
  console.log('   PASS', r3.status);

  console.log('4) DELETE /products …');
  const r4 = await restClient.delete(`/products?id=eq.${id}`);
  console.log('   PASS', r4.status);

  console.log('\nAll steps OK — backend + keys + RLS allow this app flow.');
}

main().catch((e) => {
  if (axios.isAxiosError(e)) {
    console.error('FAIL', e.response?.status, e.response?.data || e.message);
  } else {
    console.error('FAIL', e);
  }
  process.exit(1);
});
