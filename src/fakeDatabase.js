class FakeProductGenerator {
  constructor(
    id,
    name,
    companyName,
    origianlPrice,
    discountedPrice,
    category,
    images
  ) {
    this._id = id;
    this.name = name;
    this.companyName = companyName;
    this.originalPrice = origianlPrice;
    this.discountedPrice = discountedPrice;
    this.category = category;
    this.images = images;
    this.desc =
      "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.";
  }
}

const totalProducts = 12;
let names = [
  "Fall Limited Editions",
  "ASTIR THEBE MAGUGU",
  "AIR JORDAN 12 STEALTH",
  "LIGHT STAR SNEAKERS",
  "All Star Chuck Taylor",
  "Cloud 9 Lights",
  "Stripe High Edition",
  "Everyday Sneakers",
  "Sky Runner Sneakers",
  "Black Cloud Nine Edition",
  "Night Star Sneakers",
  "Cloud 9 Lights",
];
let companyNames = [
  "SNEAKER COMPANY",
  "adidas originals",
  "Nike",
  "NIKE",
  "CONVERSE",
  "Adidas",
  "nike",
  "lulu",
  "riders",
  "nike",
  "nike",
  "addidas",
];
let discountedPrices = [
  125, 162, 450, 162, 228, 195, 175, 162, 450, 150, 162, 450,
];
let originalPrices = [
  250, 182, 900, 180, 300, 290, 220, 182, 900, 225, 182, 900,
];
let categories = [
  "men",
  "women",
  "men",
  "women",
  "men",
  "men",
  "women",
  "women",
  "men",
  "men",
  "women",
  "women",
];
let product1Images = [
  [
    "/images/shoes/image-product-1.webp",
    "/images/shoes/image-product-2.webp",
    "/images/shoes/image-product-3.webp",
    "/images/shoes/image-product-4.webp",
  ],
  [
    "/images/shoes/shoe-2-1.jpg",
    "/images/shoes/shoe-2-2.jpg",
    "/images/shoes/shoe-2-3.jpg",
    "/images/shoes/shoe-2-4.jpg",
  ],
  [
    "/images/shoes/shoe-1-1.jpg",
    "/images/shoes/shoe-1-2.jpg",
    "/images/shoes/shoe-1-3.jpg",
    "/images/shoes/shoe-1-4.jpg",
  ],
  [
    "/images/shoes/shoe-4-1.webp",
    "/images/shoes/shoe-4-1.webp",
    "/images/shoes/shoe-4-1.webp",
    "/images/shoes/shoe-4-1.webp",
  ],
  [
    "/images/shoes/shoe-5-1.webp",
    "/images/shoes/shoe-5-1.webp",
    "/images/shoes/shoe-5-1.webp",
    "/images/shoes/shoe-5-1.webp",
  ],
  [
    "/images/shoes/shoe-6-1.webp",
    "/images/shoes/shoe-6-1.webp",
    "/images/shoes/shoe-6-1.webp",
    "/images/shoes/shoe-6-1.webp",
  ],
  [
    "/images/shoes/shoe-7-1.webp",
    "/images/shoes/shoe-7-1.webp",
    "/images/shoes/shoe-7-1.webp",
    "/images/shoes/shoe-7-1.webp",
  ],
  [
    "/images/shoes/shoe-8-1.webp",
    "/images/shoes/shoe-8-1.webp",
    "/images/shoes/shoe-8-1.webp",
    "/images/shoes/shoe-8-1.webp",
  ],
  [
    "/images/shoes/shoe-9-1.webp",
    "/images/shoes/shoe-9-1.webp",
    "/images/shoes/shoe-9-1.webp",
    "/images/shoes/shoe-9-1.webp",
  ],
  [
    "/images/shoes/shoe-10-1.webp",
    "/images/shoes/shoe-10-1.webp",
    "/images/shoes/shoe-10-1.webp",
    "/images/shoes/shoe-10-1.webp",
  ],
  [
    "/images/shoes/shoe-11-1.webp",
    "/images/shoes/shoe-11-1.webp",
    "/images/shoes/shoe-11-1.webp",
    "/images/shoes/shoe-11-1.webp",
  ],
  [
    "/images/shoes/shoe-6-1.webp",
    "/images/shoes/shoe-6-1.webp",
    "/images/shoes/shoe-6-1.webp",
    "/images/shoes/shoe-6-1.webp",
  ],
];

let productsData = [];

for (let i = 0; i < totalProducts; i++) {
  let product = new FakeProductGenerator(
    `p00${i + 1}`,
    names[i],
    companyNames[i],
    originalPrices[i],
    discountedPrices[i],
    categories[i],
    product1Images[i]
  );
  productsData.push(product);
}

export function getProducts() {
  return productsData;
}
