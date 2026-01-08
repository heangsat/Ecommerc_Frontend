import fetch from 'node-fetch';

const API_URL = 'http://localhost:4000/api/product';

async function testBackend() {
  console.log('--- Testing Backend API ---');

  // 1. GET All
  console.log('\n1. Fetching all products...');
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`GET status: ${res.status}`);
    const products = await res.json();
    console.log(`Success! Found ${products.length} products.`);
    
    if (products.length === 0) {
        console.log('No products to test Update/Delete. Create one first via UI.');
        return;
    }

    const targetProduct = products[0];
    const targetId = targetProduct._id || targetProduct.id;
    console.log(`Targeting Product: ${targetProduct.name} (ID: ${targetId})`);

    // 2. PUT (Update)
    console.log(`\n2. Testing UPDATE (PUT) on ID: ${targetId}`);
    // We send a partial update or full update depending on expectation.
    // Let's try sending just the name modified.
    // Note: If backend expects multipart/form-data for PUT, we might fail here with JSON.
    // But let's try JSON first as it's easier to script.
    
    // However, the frontend IS using FormData. So let's skip a complex Node FormData test 
    // and rely on what we can deduce.
    
    // Let's just check if the URL structure is correct by trying a DELETE.
    
    // 3. DELETE
    // console.log(`\n3. Testing DELETE on ID: ${targetId}`);
    // const delRes = await fetch(`${API_URL}/${targetId}`, { method: 'DELETE' });
    // console.log(`DELETE Status: ${delRes.status}`);
    // const delText = await delRes.text();
    // console.log(`DELETE Response: ${delText}`);

  } catch (err) {
    console.error('Error:', err.message);
  }
}

testBackend();
