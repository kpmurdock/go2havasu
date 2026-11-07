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
