import nedb from 'nedb-promises';

const orderHistoryDB = new nedb({ filename: '../databases/orderhistory.db', autoload: true });

export {  orderHistoryDB };