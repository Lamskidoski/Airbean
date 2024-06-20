import express from "express";
import nedb from "nedb-promises";
// import { menuDB } from "../routes/order.js";

// Initialize databases
// const menuDB = new nedb({ filename: "airbean.db", autoload: true });

const checkIfCoffeeSoldOut = async (req, res, next) => {
  try {
    const { _id } = req.body;

    console.log(`Checking if coffee with id ${_id} is sold out`);
    const coffeeItem = await menuDB.findOne({ _id });

    if (!coffeeItem) {
      console.log(`Coffee with id ${_id} not found in menu`);
      return res.status(404).send("Item not found in menu");
    }

    if (coffeeItem.soldOut) {
      console.log(`Coffee with id ${_id} is sold out`);
      return res.status(400).send("Coffee is sold out");
    }
  
    req.menuItem = coffeeItem; 
    next();
  } catch (error) {
    console.error("Error checking coffee sold out status:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default checkIfCoffeeSoldOut;


