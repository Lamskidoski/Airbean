import nedb from 'nedb-promises';

const menuDB = new nedb({ filename: './databases/menu.db', autoload: true });

async function addProducts() {
  const products = [
    { name: 'bryggkaffe', price: 20 },
    { name: 'gustav_adolfsbakelse', price: 25 }
  ];

  for (const product of products) {
    await menuDB.insert(product);
  }
  console.log('Products added');
}

addProducts();
