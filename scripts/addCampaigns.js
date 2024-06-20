import nedb from 'nedb-promises';

const campaignDB = new nedb({ filename: '../databases/campaigns.db', autoload: true });

async function addCampaigns() {
  const campaigns = [
    {
      products: ['bryggkaffe', 'gustav_adolfsbakelse'],
      campaignPrice: 40,
      createdAt: new Date().toISOString()
    }
  ];

  for (const campaign of campaigns) {
    await campaignDB.insert(campaign);
  }
  console.log('Campaigns added');
}

addCampaigns();
