// Coffee Product Menu Dataset & Spotlight Modal Controller
// Curated high-resolution imagery, flavor profiles, and Philippine Peso (PHP) pricing

const COFFEE_PRODUCTS = [
  {
    id: "vanilla-latte",
    name: "Madagascar Vanilla Latte",
    flavor: "Bourbon Vanilla & Sweet Crema",
    description: "Espresso with steamed oat milk, infused with pure cold-pressed Madagascar bourbon vanilla bean. Velvety, aromatic, and naturally sweet.",
    roast: "Blonde Roast • Hot or Iced",
    origin: "Single-Origin Colombia Blonde",
    price: 195.00,
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "caramel-cold-brew",
    name: "Salted Caramel Cold Brew",
    flavor: "House Salted Caramel & Sea Salt",
    description: "Slow-steeped for 20 hours over cool filtered water, finished with artisan salted caramel cream and coarse sea salt crystals.",
    roast: "Dark Roast • Cold Steeped",
    origin: "Sumatra Mandheling Blend",
    price: 220.00,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "hazelnut-cortado",
    name: "Toasted Hazelnut Cortado",
    flavor: "Roasted Hazelnut & Praline",
    description: "Equal parts double ristretto and velvety steamed whole milk, kissed with toasted hazelnut essence and delicate microfoam art.",
    roast: "Medium Roast • Warm 4oz",
    origin: "Guatemala Antigua",
    price: 180.00,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "dark-mocha",
    name: "Dark Chocolate Mocha",
    flavor: "70% Single-Origin Cocoa",
    description: "Rich espresso folded with melted single-origin Davao & Ecuadorian dark chocolate, fresh steamed milk, and fine cocoa dusting.",
    roast: "Dark Roast • Hot",
    origin: "House Espresso + Davao Cocoa",
    price: 210.00,
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cinnamon-cappuccino",
    name: "Honey Cinnamon Cappuccino",
    flavor: "Wildflower Honey & Ceylon Cinnamon",
    description: "Classic airy microfoam topped with freshly grated Ceylon cinnamon and organic raw mountain honey over a rich espresso base.",
    roast: "Medium Roast • Hot",
    origin: "Brazil Santos Bourbon",
    price: 190.00,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "ethiopian-pour-over",
    name: "Ethiopian Peach Pour-Over",
    flavor: "White Peach, Jasmine & Bergamot",
    description: "Single-origin Yirgacheffe beans hand-poured via V60. Bright, floral, and naturally tea-like with distinct notes of ripe white peach.",
    roast: "Light Roast • Hand Poured",
    origin: "Ethiopia Yirgacheffe Washed",
    price: 240.00,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "lavender-latte",
    name: "Lavender Brown Sugar Oat Latte",
    flavor: "French Lavender & Muscovado Sugar",
    description: "Subtle culinary lavender blossoms steeped with rich Philippine muscovado sugar and creamy oat milk over smooth espresso.",
    roast: "Medium Roast • Hot or Iced",
    origin: "Costa Rica Tarrazu",
    price: 225.00,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cardamom-macchiato",
    name: "Cardamom Spiced Macchiato",
    flavor: "Green Cardamom & Raw Demerara",
    description: "A bold double shot stained with a crown of dense milk froth and freshly crushed green cardamom pods. A sensory classic.",
    roast: "Dark Espresso • Traditional",
    origin: "Signature Dark Roast",
    price: 175.00,
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=900&q=80"
  }
];

const MEMBER_DISCOUNT_PERCENT = 15;

function formatPHP(amount) {
  return `₱${amount.toFixed(2)}`;
}

// Render coffee grid with clickable cards
function renderCoffeeGrid(containerId, isMember = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = COFFEE_PRODUCTS.map(product => {
    const regularPriceFormatted = formatPHP(product.price);
    const memberPrice = product.price * (1 - MEMBER_DISCOUNT_PERCENT / 100);
    const memberPriceFormatted = formatPHP(memberPrice);

    return `
      <article 
        class="coffee-card" 
        data-id="${product.id}"
        onclick="openProductSpotlight('${product.id}', ${isMember})"
        role="button"
        tabindex="0"
        aria-label="View ${product.name} details"
        onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openProductSpotlight('${product.id}', ${isMember});}"
      >
        <div class="coffee-image-wrap">
          <img src="${product.image}" alt="${product.name}" class="coffee-image" loading="lazy" />
          <span class="coffee-roast-badge">${product.roast}</span>
        </div>
        <div class="coffee-content">
          <div class="coffee-header-row">
            <span class="coffee-flavor-tag">${product.flavor}</span>
            <span class="coffee-card-hint">Tap to expand ↗</span>
          </div>
          <h3 class="coffee-title">${product.name}</h3>
          <p class="coffee-desc">${product.description}</p>
          <div class="coffee-footer">
            <div class="coffee-price-wrap">
              ${
                isMember
                  ? `
                    <span class="price-original">${regularPriceFormatted}</span>
                    <span class="price-member">${memberPriceFormatted}</span>
                    <span class="badge-discount-tag">15% off</span>
                  `
                  : `
                    <span class="price-standard">${regularPriceFormatted}</span>
                    <span class="price-member-hint">Member: ${memberPriceFormatted}</span>
                  `
              }
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Spotlight Modal Controller (Centers and expands product details)
function openProductSpotlight(productId, isMember = false) {
  const product = COFFEE_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("productSpotlightModal");
  if (!modal) return;

  const memberPrice = product.price * (1 - MEMBER_DISCOUNT_PERCENT / 100);

  // Populate spotlight elements
  const imgEl = document.getElementById("spotlightImg");
  const roastBadgeEl = document.getElementById("spotlightRoastBadge");
  const flavorEl = document.getElementById("spotlightFlavor");
  const titleEl = document.getElementById("spotlightTitle");
  const descEl = document.getElementById("spotlightDesc");
  const originEl = document.getElementById("spotlightOrigin");
  const roastSpecEl = document.getElementById("spotlightRoastSpec");
  const priceWrapEl = document.getElementById("spotlightPriceWrap");

  if (imgEl) {
    imgEl.src = product.image;
    imgEl.alt = product.name;
  }
  if (roastBadgeEl) roastBadgeEl.textContent = product.roast;
  if (flavorEl) flavorEl.textContent = product.flavor;
  if (titleEl) titleEl.textContent = product.name;
  if (descEl) descEl.textContent = product.description;
  if (originEl) originEl.textContent = product.origin;
  if (roastSpecEl) roastSpecEl.textContent = product.roast;

  if (priceWrapEl) {
    if (isMember) {
      priceWrapEl.innerHTML = `
        <div class="spotlight-price-group">
          <span class="spotlight-price-label">Member Price</span>
          <div class="spotlight-price-values">
            <span class="price-original">${formatPHP(product.price)}</span>
            <span class="spotlight-price-highlight">${formatPHP(memberPrice)}</span>
            <span class="badge-discount-tag">15% Savings</span>
          </div>
        </div>
      `;
    } else {
      priceWrapEl.innerHTML = `
        <div class="spotlight-price-group">
          <span class="spotlight-price-label">Regular Price</span>
          <div class="spotlight-price-values">
            <span class="spotlight-price-main">${formatPHP(product.price)}</span>
            <span class="price-member-hint">Member Club: ${formatPHP(memberPrice)}</span>
          </div>
        </div>
      `;
    }
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeProductSpotlight() {
  const modal = document.getElementById("productSpotlightModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Global dismiss listeners for spotlight modal
window.addEventListener("click", (e) => {
  const modal = document.getElementById("productSpotlightModal");
  if (e.target === modal) {
    closeProductSpotlight();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProductSpotlight();
  }
});
