import express from 'express';
import { orderHistoryDB } from './db.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const orderHistory = await orderHistoryDB.find({ userId });

        if (!orderHistory) {
            return res.status(404).json({ success: false, message: "Order history not found for this user" });
        }

        res.status(200).json({ success: true, data: orderHistory });
    } catch (error) {
        console.error("Error fetching order history:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;