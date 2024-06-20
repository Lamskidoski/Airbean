import { Router } from 'express';
import nedb from 'nedb-promises';
import authAdmin from '../middlewares/authAdmin.js'; 
import { menuDB } from '../routes/order.js';

const campaignDB = new nedb({ filename: 'campaigns.db', autoload: true });

const router = Router();

router.post('/', authAdmin, async (req, res) => {
  try {
    const { products, campaignPrice } = req.body;

    // Kontrollera om produkterna finns
    const productPromises = products.map(async productId => {
      const product = await menuDB.findOne({ _id: productId });
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
    });
    await Promise.all(productPromises);

    // Beräkna total kampanjpris
    const totalCampaignPrice = campaignPrice * products.length;

    // Skapa ny kampanj
    const newCampaign = {
      products,
      campaignPrice: totalCampaignPrice,
      createdAt: new Date().toISOString()
    };
    const addedCampaign = await campaignDB.insert(newCampaign);

    res.status(201).json(addedCampaign);
  } catch (error) {
    console.error("Error adding campaign:", error);
    res.status(400).json({ error: error.message });
  }
});

// visar alla campaigns
router.get('/', async (req, res) => {
  try {
    console.log("Fetching campaigns...");
    const campaigns = await campaignDB.find({});
    console.log("Campaigns found:", campaigns);

    const populatedCampaigns = await Promise.all(
      campaigns.map(async campaign => {
        console.log("Processing campaign:", campaign);
        const populatedProducts = await Promise.all(
          campaign.products.map(async productId => {
            console.log("Fetching product with ID:", productId);
            const product = await menuDB.findOne({ _id: productId }).exec();
            if (!product) {
              console.log(`Product with ID ${productId} not found`);
              return { _id: productId, notFound: true };
            }
            console.log("Product found:", product);
            return product;
          })
        );

        const populatedCampaign = { ...campaign, products: populatedProducts };
        return populatedCampaign;
      })
    );

    res.status(200).json(populatedCampaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// tar bort en campaign
router.delete('/:id', authAdmin, async (req, res) => {
  try {
    const campaignId = req.params.id;
    const numRemoved = await campaignDB.remove({ _id: campaignId });

    if (numRemoved === 0) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    console.error("Error deleting campaign:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

