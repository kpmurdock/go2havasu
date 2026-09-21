const menuBtn=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open?'true':'false')});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

let count=0;
const cartCount=document.getElementById('cartCount');
const toast=document.getElementById('toast');
document.querySelectorAll('.add-cart').forEach(btn=>{
  btn.addEventListener('click',()=>{
    count+=1;
    cartCount.textContent=count;
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'),1400);
  });
});

document.getElementById('signupForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('signupMsg').textContent='Thanks! The signup form is ready to connect to your email platform.';
  e.target.reset();
});

document.getElementById('year').textContent=new Date().getFullYear();