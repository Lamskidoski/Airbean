import { Router } from 'express';


const statusRouter = Router();

statusRouter.get('/', async (req, res) => {
  try {
    const statusTime = Math.floor(Math.random() * 10) + 1;
    const statusMessage = `Coffee will be delivered in: ${statusTime} minutes`;
    console.log("Delivery Time", statusTime);
    res.json(statusMessage);
  } catch (error) {
    console.error("Error fetching coffee status:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default statusRouter;
