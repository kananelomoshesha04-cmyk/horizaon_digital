
const CART_KEY = "bgc_cart_items";

function getCart(){
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}
function addToCart(name, price, qtyId){
  const qty = parseInt(document.getElementById(qtyId).value || "1");
  let cart = getCart();
  const existing = cart.find(i => i.name === name);
  if(existing){ existing.qty += qty; }
  else{ cart.push({name, price, qty}); }
  saveCart(cart);
  alert(name + " added to cart.");
}
function removeItem(name){
  saveCart(getCart().filter(i => i.name !== name));
}
function checkout(){
  const cart = getCart();
  if(cart.length === 0){
    alert("Your cart is empty. Add a service or product first.");
    return;
  }
  const total = cart.reduce((sum,i)=>sum + i.price*i.qty,0);
  alert("Thank you. Your booking/order total is M " + total.toFixed(2) + ". We will contact you to confirm payment.");
  localStorage.removeItem(CART_KEY);
  renderCart();
}
function renderCart(){
  const box = document.getElementById("cartItems");
  const totalBox = document.getElementById("cartTotal");
  if(!box || !totalBox) return;
  const cart = getCart();
  if(cart.length === 0){
    box.innerHTML = "<p>No items in cart yet.</p>";
    totalBox.textContent = "M 0.00";
    return;
  }
  let html = "";
  let total = 0;
  cart.forEach(item=>{
    const line = item.price * item.qty;
    total += line;
    html += `<div class="cart-row">
      <strong>${item.name}</strong>
      <span>Qty: ${item.qty}</span>
      <span>M ${line.toFixed(2)}</span>
      <button onclick="removeItem('${item.name}')">Remove</button>
    </div>`;
  });
  box.innerHTML = html;
  totalBox.textContent = "M " + total.toFixed(2);
}
document.addEventListener("DOMContentLoaded", renderCart);
