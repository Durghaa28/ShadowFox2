// HERO CAROUSEL FUNCTIONALITY
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  setInterval(nextSlide, 5000); // Auto-slide every 5s
}

// DROPDOWN FOR MOBILE
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
  });
});
document.addEventListener('click', () => {
  dropdowns.forEach(d => d.classList.remove('active'));
});

// === GLOBAL CART LOGIC ===
let cart = [];
loadCart(); // Load cart from localStorage on page load

function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  if (item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Added "${item.name}" to cart!`);
  }
}

function loadCart() {
  const saved = localStorage.getItem('cart');
  if (saved) cart = JSON.parse(saved);
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `Total: ₹${total}`;
}

function toggleCart() {
  const cartDiv = document.getElementById('cartSidebar');
  if (cartDiv) {
    cartDiv.style.display = cartDiv.style.display === 'none' ? 'block' : 'none';
    renderCart();
  }
}

function goToCheckout() {
  window.location.href = 'checkout.html';
}

// === PRODUCT RENDERING (ONLY IF USED ON PRODUCT PAGE) ===
function renderProducts(list) {
  const productList = document.getElementById('productList');
  if (!productList) return;

  productList.innerHTML = '';
  list.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="price">₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}
