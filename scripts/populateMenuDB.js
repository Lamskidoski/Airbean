import nedb from 'nedb-promises';

const menuDB = new nedb({ filename: './databases/menu.db', autoload: true });

const products = [
  {
    _id: 'bryggkaffe',
    title: 'Bryggkaffe',
    desc: 'Delicious brewed coffee',
    price: 25
  },
  {
    _id: 'gustav_adolfsbakelse',
    title: 'Gustav Adolfsbakelse',
    desc: 'Delicious Gustav Adolfsbakelse with cream and chocolate',
    price: 45
  }
];

async function populateDB() {
  try {
    for (const product of products) {
      await menuDB.insert(product);
    }
    console.log('Products added successfully');
  } catch (error) {
    console.error('Error adding products:', error);
  }
}

populateDB();
