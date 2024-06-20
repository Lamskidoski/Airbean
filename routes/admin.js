import express from 'express';
import authAdmin from '../middlewares/authAdmin.js';

const router = express.Router();

const products = []; // Simulerar en produktsamling, kan vara en databas i ett riktigt scenario.

router.post('/addProduct', authAdmin, (req, res) => {
    const { id, title, desc, price } = req.body;
    
    // Validera att alla egenskaper finns med
    if (!id || !title || !desc || !price) {
        return res.status(400).json({ error: "All properties (id, title, desc, price) are required" });
    }

    const newProduct = {
        id,
        title,
        desc,
        price,
        createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    
    res.status(201).json({ message: "Product added successfully", product: newProduct });
});

export default router;
