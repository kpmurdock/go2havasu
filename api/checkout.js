// Vercel serverless function: Stripe-hosted checkout. No payment details are collected by Go2Havasu.
const catalog={
  'Classic Havasu Cap':'STRIPE_PRICE_CAP',
  'Sunset Logo Tee':'STRIPE_PRICE_TEE',
  'Lake Morning Mug':'STRIPE_PRICE_MUG'
};
module.exports=async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'});}
  const secret=process.env.STRIPE_SECRET_KEY;
  if(!secret)return res.status(503).json({error:'Checkout is not configured yet. Please try again later.'});
  const items=req.body?.items;
  if(!Array.isArray(items)||!items.length||items.length>100)return res.status(400).json({error:'Invalid cart'});
  const quantities={};
  for(const name of items){if(typeof name!=='string'||!Object.hasOwn(catalog,name))return res.status(400).json({error:'Unknown product'});quantities[name]=(quantities[name]||0)+1;}
  const params=new URLSearchParams();params.set('mode','payment');
  const origin='https://'+req.headers.host;
  if(!/^[a-z0-9.-]+(?::[0-9]+)?$/i.test(req.headers.host||''))return res.status(400).json({error:'Invalid host'});
  params.set('success_url',origin+'/?checkout=success#shop');
  params.set('cancel_url',origin+'/?checkout=cancel#shop');
  let i=0;
  for(const [name,quantity] of Object.entries(quantities)){
    const price=process.env[catalog[name]];
    if(!price||!/^price_[A-Za-z0-9]+$/.test(price))return res.status(503).json({error:'Store products are not configured for checkout yet.'});
    params.set('line_items['+i+'][price]',price);
    params.set('line_items['+i+'][quantity]',String(quantity));i++;
  }
  try{
    const response=await fetch('https://api.stripe.com/v1/checkout/sessions',{method:'POST',headers:{'Authorization':'Bearer '+secret,'Content-Type':'application/x-www-form-urlencoded'},body:params});
    const data=await response.json();
    if(!response.ok||!data.url)return res.status(502).json({error:'Unable to start secure checkout. Please try again.'});
    return res.status(200).json({url:data.url});
  }catch{return res.status(502).json({error:'Checkout service is temporarily unavailable.'});}
};