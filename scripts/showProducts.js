import nedb from 'nedb-promises';

const menuDB = new nedb({ filename: './databases/menu.db', autoload: true });

async function showProducts() {
  const products = await menuDB.find({});
  console.log(products);
}

showProducts();
