const menuBtn=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
if(menuBtn&&nav){menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}))}
const cartCount=document.getElementById('cartCount');
const cartStatus=document.getElementById('cartStatus');
let cart=[];
try{const stored=JSON.parse(localStorage.getItem('go2havasu-demo-cart')||'[]');if(Array.isArray(stored))cart=stored.filter(x=>typeof x==='string').slice(0,100)}catch{}
function updateCart(){if(cartCount)cartCount.textContent=String(cart.length);if(cartStatus)cartStatus.setAttribute('aria-label',cart.length+' demo cart items; checkout unavailable')}
updateCart();
document.querySelectorAll('.add-cart').forEach(btn=>btn.addEventListener('click',()=>{const product=btn.closest('.product');const title=product?.querySelector('h3')?.textContent?.trim()||'Merchandise';cart.push(title);try{localStorage.setItem('go2havasu-demo-cart',JSON.stringify(cart))}catch{}updateCart();btn.textContent='Added to demo cart';setTimeout(()=>btn.textContent='Add to demo cart',1400)}));
const search=document.getElementById('destinationSearch');
const input=document.getElementById('searchInput');
const feedback=document.getElementById('searchFeedback');
if(search&&input){search.addEventListener('submit',event=>{event.preventDefault();const query=input.value.trim();if(!query)return;const terms=query.toLowerCase();const destinations=[['london bridge','London Bridge'],['boating','Boating & Water Fun'],['hiking','Hiking & Outdoors'],['state park','State Parks'],['buckskin','Buckskin Mountain'],['cattail','Cattail Cove'],['water','Lake Havasu']];const match=destinations.find(([key])=>terms.includes(key)||key.includes(terms));if(feedback)feedback.textContent=match?'Showing visitor guide for '+match[1]:'Showing all destination guides for '+query;window.location.href='things-to-do.html#destinations'})}
const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());

const checkoutButton=document.getElementById('checkoutButton');
const clearCartButton=document.getElementById('clearCartButton');
const checkoutMessage=document.getElementById('checkoutMessage');
if(clearCartButton)clearCartButton.addEventListener('click',()=>{cart=[];try{localStorage.removeItem('go2havasu-demo-cart')}catch{}updateCart();if(checkoutMessage)checkoutMessage.textContent='Cart cleared.'});
if(checkoutButton)checkoutButton.addEventListener('click',async()=>{
 if(!cart.length){if(checkoutMessage)checkoutMessage.textContent='Add an item before checkout.';return}
 checkoutButton.disabled=true;if(checkoutMessage)checkoutMessage.textContent='Connecting to secure checkout…';
 try{const response=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:cart})});const result=await response.json();if(!response.ok||!result.url)throw Error(result.error||'Checkout unavailable');const url=new URL(result.url);if(url.protocol!=='https:'||url.hostname!=='checkout.stripe.com')throw Error('Invalid checkout destination');window.location.assign(result.url)}catch(error){if(checkoutMessage)checkoutMessage.textContent=error.message||'Checkout unavailable';checkoutButton.disabled=false}
});
const checkoutState=new URLSearchParams(location.search).get('checkout');
if(checkoutState==='success'){cart=[];try{localStorage.removeItem('go2havasu-demo-cart')}catch{}updateCart();if(checkoutMessage)checkoutMessage.textContent='Thank you. Your payment was submitted; check your receipt for confirmation.'}
else if(checkoutState==='cancel'&&checkoutMessage)checkoutMessage.textContent='Checkout canceled. Your items remain in the cart.';
