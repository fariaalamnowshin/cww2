function validateLoginForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
  
    if (email === '' || password === '') {
      alert("Please fill out all fields.");
      return false;
    }
  
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return false;
    }
  
    return true;
  }
  function validateRegisterForm() {
    const pass = document.getElementById('password').value.trim();
    const confirm = document.getElementById('confirmPassword').value.trim();
  
    if (pass !== confirm) {
      alert("Passwords do not match.");
      return false;
    }
  
    // Redirect to homepage
    window.location.href = "index.html";
    return false; // prevent actual form submission
  }

// === Dummy product list for wishlist ===
  const wishlistProducts = [
    { id: "1", name: "Minimalistic Bracelet", image: "images/bsb1.jpeg", price: 59.99 },
    { id: "2", name: "Multicolor Bracelet", image: "images/bsb4.jpeg", price: 65.49 },
    { id: "3", name: "Gorgeous Earrings", image: "images/bse1.jpeg", price: 72.00 },
    { id: "4", name: "Silver Rings", image: "images/bsr2.jpeg", price: 110.00 },
    { id: "5", name: "Colorful Stone Rings", image: "images/bsr1.jpeg", price: 89.99 },
    { id: "6", name: "Colorful Stone Rings 2", image: "images/bsr3.jpeg", price: 92.50 },
    { id: "7", name: "Golden Ring", image: "images/bsr4.jpeg", price: 130.00 },
    { id: "8", name: "Single Stone Color Ring", image: "images/bsr5.jpeg", price: 78.00 },
    { id: "9", name: "Flower Ring", image: "images/bsr7.jpeg", price: 84.99 },
    { id: "10", name: "Marquise Ring", image: "images/bsr6.jpeg", price: 115.00 },
    { id: "11", name: "Multi Diamond Golden Ring", image: "images/bsr8.jpeg", price: 145.00 },
    { id: "12", name: "Flower Ring", image: "images/bsr7.jpeg", price: 84.99 },
    { id: "13", name: "Minimalistic Necklace", image: "images/bsn1.jpeg", price: 99.99 },
    { id: "14", name: "Heart and Moon Stone Necklace", image: "images/bsn3.jpeg", price: 120.00 },
    { id: "15", name: "Colorful Stone Earrings", image: "images/slide3.jpg", price: 110.00 },
    { id: "16", name: "Diamond Butterfly Earrings", image: "images/slide2.jpg", price: 45.00 },
    { id: "17", name: "Hair Clip", image: "images/snhair.jpeg", price: 55.00 },
    { id: "18", name: "Gorgeous Earring", image: "images/snearring.jpeg", price: 165.00 }
  ];
  
  // === Wishlist Rendering ===
  if (document.getElementById("wishlist-container")) {
    const container = document.getElementById("wishlist-container");
    wishlistProducts.forEach(product => {
      const div = document.createElement("div");
      div.className = "col-md-4 mb-4";
      div.innerHTML = `
        <div class="wishlist-item position-relative p-3">
          <img src="${product.image}" alt="${product.name}">
          <div class="wishlist-info">
            <h5>${product.name}</h5>
            <p class="product-price">£${product.price.toFixed(2)}</p>
            <div class="quantity-controls d-flex justify-content-center align-items-center mb-2">
              <button class="btn btn-sm btn-outline-dark minus-btn" data-id="${product.id}">−</button>
              <span class="mx-3 quantity-text" id="qty-${product.id}">1</span>
              <button class="btn btn-sm btn-outline-dark plus-btn" data-id="${product.id}">+</button>
            </div>
            <button class="btn btn-dark btn-sm add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      `;
      container.appendChild(div);
    });
  
    // Quantity buttons
    document.querySelectorAll(".plus-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const qtySpan = document.getElementById(`qty-${id}`);
        let qty = parseInt(qtySpan.innerText) || 1;
        qty++;
        qtySpan.innerText = qty;
      });
    });
  
    document.querySelectorAll(".minus-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const qtySpan = document.getElementById(`qty-${id}`);
        let qty = parseInt(qtySpan.innerText) || 1;
        if (qty > 1) qty--;
        qtySpan.innerText = qty;
      });
    });
  
    // Add to Cart buttons
    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const productId = btn.getAttribute("data-id");
        const product = wishlistProducts.find(p => p.id === productId);
        const qty = parseInt(document.getElementById(`qty-${productId}`).innerText) || 1;
        product.quantity = qty;
  
        addToCart(product);
  
        // Show confirmation
        const originalText = btn.innerText;
        btn.innerText = "Added!";
        btn.disabled = true;
        setTimeout(() => {
          btn.innerText = originalText;
          btn.disabled = false;
        }, 2000);
      });
    });
  }
  
  // === Add to Cart ===
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.id === product.id);
  
    if (index === -1) {
      cart.push(product);
    } else {
      cart[index].quantity = product.quantity;
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // === Remove from Cart ===
  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // === Cart Page Rendering ===
  if (document.getElementById("cart-container")) {
    const container = document.getElementById("cart-container");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (cart.length === 0) {
      container.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
    } else {
      cart.forEach(product => {
        const div = document.createElement("div");
        div.className = "col-md-4 mb-4";
        div.innerHTML = `
          <div class="wishlist-item p-3">
            <img src="${product.image}" alt="${product.name}">
            <div class="wishlist-info">
              <h5>${product.name}</h5>
              <p class="product-price">£${product.price.toFixed(2)}</p>
              <p>Quantity: ${product.quantity}</p>
              <p>Total: £${(product.price * product.quantity).toFixed(2)}</p>
              <button class="btn btn-outline-danger btn-sm remove-btn mt-2" data-id="${product.id}">
                Remove
              </button>
            </div>
          </div>
        `;
        container.appendChild(div);
      });
  
      document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", () => {
          const id = button.getAttribute("data-id");
          removeFromCart(id);
          location.reload();
        });
      });
    }
  }
  
  // === Render Order Summary on Checkout Page ===
  if (document.getElementById("order-summary")) {
    const summaryDiv = document.getElementById("order-summary");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (cart.length === 0) {
      summaryDiv.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
    } else {
      let subtotal = 0;
      let itemsHTML = "<ul class='list-group mb-3'>";
      cart.forEach(product => {
        const total = product.price * product.quantity;
        subtotal += total;
        itemsHTML += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${product.name} (x${product.quantity})
            <span>£${total.toFixed(2)}</span>
          </li>
        `;
      });
      itemsHTML += "</ul>";
  
      const discount = subtotal * 0.1;
      const delivery = 9.99;
      const grandTotal = subtotal - discount + delivery;
  
      summaryDiv.innerHTML = `
        <h4 class="mb-3">Order Summary</h4>
        ${itemsHTML}
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between">
            <strong>Subtotal</strong><span>£${subtotal.toFixed(2)}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <strong>Discount (10%)</strong><span>-£${discount.toFixed(2)}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <strong>Delivery Charge</strong><span>£${delivery.toFixed(2)}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <strong>Total</strong><span><strong>£${grandTotal.toFixed(2)}</strong></span>
          </li>
        </ul>
      `;
    }
  }
  
  // === Payment Method Toggle + Checkout Validation ===
  document.addEventListener("DOMContentLoaded", () => {
    const paymentRadios = document.getElementsByName("payment");
    const cardInfo = document.getElementById("card-info");
    const checkoutForm = document.getElementById("checkout-form");
  
    if (paymentRadios.length > 0) {
      paymentRadios.forEach(radio => {
        radio.addEventListener("change", () => {
          cardInfo.style.display = (radio.id === "card" && radio.checked) ? "block" : "none";
        });
      });
    }
  
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const selectedPayment = [...paymentRadios].find(r => r.checked)?.value;
  
        if (selectedPayment === "card") {
          const cardName = document.getElementById("cardName").value.trim();
          const cardNumber = document.getElementById("cardNumber").value.trim();
          const expiryDate = document.getElementById("expiryDate").value.trim();
          const cvv = document.getElementById("cvv").value.trim();
  
          if (!cardName || !cardNumber || !expiryDate || !cvv) {
            alert("Please fill in all card details.");
            return;
          }
        }
  
        alert("Thank you for your order! Your jewelry is on the way.");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
      });
    }
  });
