import { campaignDb } from "../databases/db.js";
import { menu } from "../config/data.js";

async function addCampaign(req, res) {
  const { title, price, discount } = req.body;

  const product = menu.find(item => item.title === title);

  if (!product) {
    return res.status(400).json({ error: 'Product not found' });
  }

  const campaign = { title, price, discount };

  try {
    const newCampaign = await campaignDb.insert(campaign);

    const response = {
      title: newCampaign.title,
      price: newCampaign.price,
      discount: `${newCampaign.discount}%`,
      message: 'Campaign added successfully!'
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add campaign!' });
  }
}

export { addCampaign };

// import { campaignDb } from "../databases/db.js";
// import { menu } from "../databases/data.js";

// async function addCampaign(req, res) {
//   const { title, price, discount } = req.body;

//   const product = menu.find(item => item.title === title);

//   if (!product) {
//     return res.status(400).json({ error: 'Product not found' });
//   }

//   const campaign = { title, price, discount };

//   try {
//     const newCampaign = await campaignDb.insert(campaign);

//     const response = {
//       title: newCampaign.title,
//       price: newCampaign.price,
//       discount: `${newCampaign.discount}%`,
//       message: 'Campaign added successfully!'
//     };
//     res.status(201).json(response);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to add campaign!' });
//   }
// }

// export { addCampaign };
