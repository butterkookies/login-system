// Coffee Product Menu Dataset
// Curated high-resolution imagery and flavor profiles

const COFFEE_PRODUCTS = [
  {
    id: "vanilla-latte",
    name: "Madagascar Vanilla Latte",
    flavor: "Bourbon Vanilla & Sweet Crema",
    description: "Espresso with steamed oat milk, infused with pure cold-pressed Madagascar bourbon vanilla bean.",
    roast: "Blonde Roast • Hot or Iced",
    price: 5.75,
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "caramel-cold-brew",
    name: "Salted Caramel Cold Brew",
    flavor: "House Salted Caramel & Sea Salt",
    description: "Slow-steeped for 20 hours over cool filtered water, finished with artisan salted caramel cream.",
    roast: "Dark Roast • Cold Steeped",
    price: 6.25,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "hazelnut-cortado",
    name: "Toasted Hazelnut Cortado",
    flavor: "Roasted Hazelnut & Praline",
    description: "Equal parts double ristretto and velvety steamed whole milk, kissed with toasted hazelnut essence.",
    roast: "Medium Roast • Warm 4oz",
    price: 5.25,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dark-mocha",
    name: "Dark Chocolate Mocha",
    flavor: "70% Single-Origin Cocoa",
    description: "Rich espresso folded with melted single-origin Ecuadorian dark chocolate and fine cocoa dusting.",
    roast: "Dark Roast • Hot",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cinnamon-cappuccino",
    name: "Honey Cinnamon Cappuccino",
    flavor: "Wildflower Honey & Ceylon Cinnamon",
    description: "Classic airy microfoam topped with freshly grated Ceylon cinnamon and organic raw mountain honey.",
    roast: "Medium Roast • Hot",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ethiopian-pour-over",
    name: "Ethiopian Peach Pour-Over",
    flavor: "White Peach, Jasmine & Bergamot",
    description: "Single-origin Yirgacheffe beans hand-poured via V60. Bright, floral, and naturally tea-like.",
    roast: "Light Roast • Hand Poured",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "lavender-latte",
    name: "Lavender Brown Sugar Oat Latte",
    flavor: "French Lavender & Muscovado Sugar",
    description: "Subtle culinary lavender blossoms steeped with rich unrefined brown sugar and creamy oat milk.",
    roast: "Medium Roast • Hot or Iced",
    price: 6.25,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cardamom-macchiato",
    name: "Cardamom Spiced Macchiato",
    flavor: "Green Cardamom & Raw Demerara",
    description: "A bold double shot stained with a crown of dense milk froth and crushed green cardamom pods.",
    roast: "Dark Espresso • Traditional",
    price: 4.95,
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80"
  }
];

const MEMBER_DISCOUNT_PERCENT = 15;

function renderCoffeeGrid(containerId, isMember = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = COFFEE_PRODUCTS.map(product => {
    const regularPriceFormatted = `$${product.price.toFixed(2)}`;
    const memberPrice = product.price * (1 - MEMBER_DISCOUNT_PERCENT / 100);
    const memberPriceFormatted = `$${memberPrice.toFixed(2)}`;

    return `
      <article class="coffee-card" data-id="${product.id}">
        <div class="coffee-image-wrap">
          <img src="${product.image}" alt="${product.name}" class="coffee-image" loading="lazy" />
          <span class="coffee-roast-badge">${product.roast}</span>
        </div>
        <div class="coffee-content">
          <div class="coffee-flavor-tag">${product.flavor}</div>
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
