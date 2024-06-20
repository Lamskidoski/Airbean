import express from 'express';
import authAdmin from '../middlewares/authAdmin.js';
import nedb from 'nedb';

const router = express.Router();

const menuDB = new nedb({ filename: './databases/menu.db', autoload: true });

// Helper-funktion för att promisify NeDB-metoder
const promisify = (db, method, ...args) => {
  return new Promise((resolve, reject) => {
    db[method](...args, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// Funktion för att validera att produkter finns
const validateProductsExist = async (productIds) => {
  const products = await promisify(menuDB, 'find', { id: { $in: productIds } });
  return products.length === productIds.length;
};

// GET: Hämta alla menyalternativ
router.get('/', async (req, res) => {
  try {
    const menuItems = await promisify(menuDB, 'find', {});
    console.log("All menu items:", menuItems);
    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET: Hämta ett specifikt menyalternativ med ID
router.get('/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const menuItem = await promisify(menuDB, 'findOne', { id: itemId });

    if (menuItem) {
      console.log("Menu item:", menuItem);
      res.json(menuItem);
    } else {
      res.status(404).send("Menu item not found");
    }
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST: Lägg till ett nytt menyalternativ (admin)
router.post('/', authAdmin, async (req, res) => {
  const { id, title, desc, price } = req.body;

  if (!id || !title || !desc || !price) {
    return res.status(400).json({ error: "All properties (id, title, desc, price) are required" });
  }

  const newProduct = {
    id: id, 
    title,
    desc,
    price,
    createdAt: new Date().toISOString()
  };

  try {
    await promisify(menuDB, 'insert', newProduct);
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT: Uppdatera ett befintligt menyalternativ (admin)
router.put('/:id', authAdmin, async (req, res) => {
  try {
    const itemId = req.params.id;
    const { title, desc, price } = req.body;

    // Kontrollera att alla obligatoriska fält finns
    if (!title || !desc || !price) {
      return res.status(400).json({ error: "All properties (title, desc, price) are required" });
    }

    // Skapa ett objekt för uppdatering
    const updatedMenuItem = {
      title,
      desc,
      price,
      modifiedAt: new Date().toISOString()
    };

    const result = await promisify(menuDB, 'update', { id: itemId }, { $set: updatedMenuItem }, {});
    if (result) {
      console.log("Menu item updated successfully");
      res.status(200).json({ message: "Menu item updated successfully" });
    } else {
      res.status(404).send("Menu item not found");
    }
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Ta bort ett menyalternativ (admin)
router.delete('/:id', authAdmin, async (req, res) => {
  try {
    const itemId = req.params.id;

    // Kontrollera om produkten finns
    const menuItem = await promisify(menuDB, 'findOne', { id: itemId });

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Om produkten finns, ta bort den
    const result = await promisify(menuDB, 'remove', { id: itemId }, {});

    if (result) {
      console.log("Menu item deleted successfully");
      res.status(200).json({ message: "Menu item deleted successfully" });
    } else {
      res.status(500).send("Error deleting menu item");
    }
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST: Lägg till ett nytt kampanjerbjudande (admin)
router.post('/campaigns', authAdmin, async (req, res) => {
  const { products, campaignPrice } = req.body;

  if (!Array.isArray(products) || products.length === 0 || !campaignPrice) {
    return res.status(400).json({ error: "Products (array) and campaignPrice are required" });
  }

  try {
    // Validera att alla produkter finns
    const productsExist = await validateProductsExist(products);

    if (!productsExist) {
      return res.status(400).json({ error: "One or more products do not exist" });
    }

    const newCampaign = {
      products,
      campaignPrice,
      createdAt: new Date().toISOString()
    };

    await promisify(campaignsDB, 'insert', newCampaign);
    res.status(201).json({ message: "Campaign added successfully", campaign: newCampaign });
  } catch (error) {
    console.error("Error adding campaign:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
export { menuDB };

