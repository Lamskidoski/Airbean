import { Router } from 'express';
import nedb from 'nedb-promises';

const aboutDB = new nedb({ filename: '../databases/about.db', autoload: true });
const router = Router();

router.get('/', async (req, res) => {
  try {
    const aboutText = await aboutDB.find({});
    console.log("Temp text", aboutText);
    res.json(aboutText);
  } catch (error) {
    console.error("Error fetching about info:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
export { aboutDB };