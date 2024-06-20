import nedb from 'nedb-promises';

const campaignDB = new nedb({ filename: '../databases/campaigns.db', autoload: true });

async function showCampaigns() {
  const campaigns = await campaignDB.find({});
  console.log(campaigns);
}

showCampaigns();
