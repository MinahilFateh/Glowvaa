const P=[
{id:1,n:"Barrier Cream Cleanser",c:"Skincare",p:1200,cost:480,t:"tube",a:"#cfe3d8",b:"#7fae95",d:"Gentle, non-stripping face wash for dry and sensitive skin. Removes dust and sunscreen without tightness."},
{id:2,n:"Vitamin C Glow Serum",c:"Skincare",p:2200,cost:850,t:"drop",a:"#fbe0b8",b:"#e8923a",d:"15% stable vitamin C that brightens dull skin and fades dark spots in 4 to 6 weeks."},
{id:3,n:"Niacinamide 10% Serum",c:"Skincare",p:1800,cost:700,t:"drop",a:"#e6dcf5",b:"#8a6bc4",d:"Controls oil, tightens the look of pores and calms redness. Suits oily and combination skin."},
{id:4,n:"Daily Sunscreen SPF 50",c:"Skincare",p:1700,cost:680,t:"tube",a:"#fff0b8",b:"#e3b72b",d:"Lightweight, no white cast, no sticky feel. Broad spectrum UVA and UVB protection."},
{id:5,n:"Hydra Gel Moisturizer",c:"Skincare",p:1950,cost:780,t:"jar",a:"#cde9f2",b:"#4f9cb8",d:"Hyaluronic acid gel cream that keeps skin soft for 24 hours without clogging pores."},
{id:6,n:"Velvet Matte Lipstick",c:"Makeup",p:1100,cost:420,t:"lip",a:"#f7d0dc",b:"#b3265b",d:"Comfortable, long-wear matte colour in a rosy berry shade. Does not dry out lips."},
{id:7,n:"Skin Tint Foundation",c:"Makeup",p:2400,cost:950,t:"pump",a:"#f1d9c4",b:"#c58f66",d:"Light-to-medium coverage with a natural finish. Blends easily and lasts through the day."},
{id:8,n:"Volume Lash Mascara",c:"Makeup",p:1250,cost:480,t:"mas",a:"#dcd6e2",b:"#3b2f4a",d:"Lifts and separates lashes with a smudge-proof, waterproof black formula."}];
const fmt=n=>"PKR "+n.toLocaleString("en-US");
function art(t,a,b){
 const s={
 tube:`<rect x="34" y="30" width="32" height="70" rx="8" fill="${b}"/><rect x="38" y="16" width="24" height="16" rx="4" fill="#fff"/><rect x="40" y="52" width="20" height="26" rx="4" fill="#fff" opacity=".7"/>`,
 drop:`<rect x="32" y="48" width="36" height="52" rx="8" fill="${b}"/><rect x="42" y="34" width="16" height="16" fill="#fff" opacity=".85"/><ellipse cx="50" cy="26" rx="11" ry="12" fill="#231b2e"/><rect x="38" y="64" width="24" height="20" rx="3" fill="#fff" opacity=".7"/>`,
 jar:`<rect x="24" y="44" width="52" height="46" rx="10" fill="${b}"/><rect x="22" y="30" width="56" height="18" rx="6" fill="#fff"/><rect x="34" y="58" width="32" height="18" rx="3" fill="#fff" opacity=".7"/>`,
 lip:`<rect x="35" y="62" width="30" height="40" rx="4" fill="#231b2e"/><rect x="38" y="46" width="24" height="18" fill="#c9bfd2"/><path d="M38 46 L38 28 Q50 14 62 28 L62 46Z" fill="${b}"/>`,
 pump:`<rect x="32" y="46" width="36" height="56" rx="8" fill="${b}"/><rect x="45" y="28" width="10" height="20" fill="#fff"/><rect x="38" y="22" width="28" height="8" rx="3" fill="#231b2e"/><rect x="38" y="64" width="24" height="18" rx="3" fill="#fff" opacity=".6"/>`,
 mas:`<rect x="38" y="46" width="24" height="56" rx="6" fill="${b}"/><rect x="45" y="12" width="10" height="36" rx="3" fill="#231b2e"/><rect x="42" y="64" width="16" height="16" rx="2" fill="#fff" opacity=".7"/>`};
 return `<svg viewBox="0 0 100 120" width="100%" height="100%" role="img" aria-hidden="true"><circle cx="50" cy="66" r="42" fill="#fff" opacity=".45"/>${s[t]}</svg>`}
let cart={};try{cart=JSON.parse(localStorage.getItem("glowvaa-cart")||"{}")}catch(e){}
const $=id=>document.getElementById(id);
function save(){try{localStorage.setItem("glowvaa-cart",JSON.stringify(cart))}catch(e){}}
function toast(m){const t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove("on"),1800)}
$("heroart").innerHTML=`<div style="width:62%">${art("drop","#fff","#b3265b")}</div>`;
let cat="All";
function drawFilters(){$("filters").innerHTML=["All","Skincare","Makeup"].map(c=>`<button aria-pressed="${c===cat}" data-c="${c}">${c}</button>`).join("");
 document.querySelectorAll("#filters button").forEach(b=>b.onclick=()=>{cat=b.dataset.c;drawFilters();drawGrid()})}
function drawGrid(){$("grid").innerHTML=P.filter(x=>cat==="All"||x.c===cat).map(x=>`<article class="card"><button class="img" data-view="${x.id}" aria-label="View ${x.n}" style="background:${x.a};padding:16px">${art(x.t,x.a,x.b)}</button><div class="body"><span class="cat">${x.c}</span><h3><button data-view="${x.id}">${x.n}</button></h3><p class="desc">${x.d}</p><div class="row"><span class="price">${fmt(x.p)}</span><button class="add" data-id="${x.id}">Add to cart</button></div></div></article>`).join("");
 document.querySelectorAll(".add").forEach(b=>b.onclick=()=>add(+b.dataset.id));
 document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>openProduct(+b.dataset.view))}
let cur=0;
function openProduct(id){const x=P.find(p=>p.id===id);cur=id;
 $("pmimg").style.background=x.a;$("pmimg").innerHTML=art(x.t,x.a,x.b);
 $("pmcat").textContent=x.c;$("pmname").textContent=x.n;$("pmdesc").textContent=x.d;$("pmprice").textContent=fmt(x.p);
 $("pm").classList.add("on");$("pmclose").focus()}
function closeProduct(){$("pm").classList.remove("on")}
$("pmclose").onclick=closeProduct;
$("pm").onclick=e=>{if(e.target===$("pm"))closeProduct()};
$("pmadd").onclick=()=>{add(cur);closeProduct()};
function add(id){cart[id]=(cart[id]||0)+1;save();drawCart();toast("Added to cart")}
function chg(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];save();drawCart()}
function drawCart(){
 const ids=Object.keys(cart);let n=0,tot=0;
 $("items").innerHTML=ids.length?ids.map(i=>{const x=P.find(p=>p.id==i),q=cart[i];n+=q;tot+=q*x.p;
  return `<div class="it"><div class="th" style="background:${x.a}">${art(x.t,x.a,x.b)}</div><div><strong>${x.n}</strong><div class="qty"><button data-id="${i}" data-d="-1" aria-label="Decrease">−</button><span>${q}</span><button data-id="${i}" data-d="1" aria-label="Increase">+</button></div></div><strong>${fmt(q*x.p)}</strong></div>`}).join(""):`<p class="empty">Your cart is empty. Add a product from the catalog.</p>`;
 $("count").textContent=n;$("total").textContent=fmt(tot);
 document.querySelectorAll(".qty button").forEach(b=>b.onclick=()=>chg(+b.dataset.id,+b.dataset.d))}
function openCart(o){$("drawer").classList.toggle("open",o);$("scrim").classList.toggle("on",o)}
$("open").onclick=()=>openCart(true);$("close").onclick=$("scrim").onclick=()=>openCart(false);
// ---------- Checkout ----------
const FREE_OVER=5000, DELIVERY=250;
function totals(){let sub=0;for(const i in cart)sub+=P.find(p=>p.id==i).p*cart[i];const ship=sub>=FREE_OVER||sub===0?0:DELIVERY;return{sub,ship,total:sub+ship}}
function summaryHTML(){const t=totals();
 return Object.keys(cart).map(i=>{const x=P.find(p=>p.id==i);return `<div class="ln"><span>${x.n} × ${cart[i]}</span><span>${fmt(x.p*cart[i])}</span></div>`}).join("")
 +`<div class="ln"><span>Subtotal</span><span>${fmt(t.sub)}</span></div><div class="ln"><span>Delivery</span><span>${t.ship?fmt(t.ship):"Free"}</span></div><div class="ln t"><span>Total</span><span>${fmt(t.total)}</span></div>`}
function openCheckout(){
 if(!Object.keys(cart).length){toast("Your cart is empty");return}
 openCart(false);$("cosumbody").innerHTML=summaryHTML();
 $("coview").hidden=false;$("cosuccess").hidden=true;$("co").classList.add("on")}
function closeCheckout(){$("co").classList.remove("on")}
$("checkout").onclick=openCheckout;
$("coclose").onclick=$("okdone").onclick=closeCheckout;
$("co").onclick=e=>{if(e.target===$("co"))closeCheckout()};
$("cof").onsubmit=e=>{
 e.preventDefault();
 const f=new FormData(e.target);
 $("okname").textContent=f.get("name").trim().split(" ")[0];
 $("okid").textContent="#GV-"+Math.floor(10000+Math.random()*90000);
 $("oksum").innerHTML=summaryHTML();
 $("okinfo").textContent="Delivering to "+f.get("address").trim()+", "+f.get("city").trim()+" · Payment: "+f.get("pay");
 cart={};save();drawCart();e.target.reset();
 $("coview").hidden=true;$("cosuccess").hidden=false;$("co").scrollTop=0};
document.addEventListener("keydown",e=>{if(e.key==="Escape"){openCart(false);closeProduct();closeCheckout()}});
drawFilters();drawGrid();drawCart();