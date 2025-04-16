document.addEventListener("DOMContentLoaded", () => {
    // Get all buttons inside product cards
    const buttons = document.querySelectorAll(".product-card button");
  
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".product-card");
        const productName = card.querySelector("h3").textContent;
        const productPrice = card.querySelector("p").textContent;
  
        // Show confirmation
        alert(`${productName} (${productPrice}) added to your cart!`);
  
        // Optional: Save to localStorage
        addToCart(productName, productPrice);
      });
    });
  });
  
  function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
