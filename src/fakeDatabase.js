class FakeProductGenerator {
  constructor(
    id,
    name,
    companyName,
    origianlPrice,
    discountedPrice,
    category,
    images,
    thumbnailImages
  ) {
    this._id = id;
    this.name = name;
    this.companyName = companyName;
    this.originalPrice = origianlPrice;
    this.discountedPrice = discountedPrice;
    this.category = category;
    this.images = images;
    this.thumbnailImages = thumbnailImages;
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
    "https://i.ibb.co/HTyvsDX/image-product-1.webp",
    "https://i.ibb.co/QPt01Mc/image-product-2.webp",
    "https://i.ibb.co/6w9nYsQ/image-product-3.webp",
    "https://i.ibb.co/z5GgqBk/image-product-4.webp",
  ],
  [
    "https://i.ibb.co/GFhP67p/shoe-2-1.webp",
    "https://i.ibb.co/8xyZyd0/shoe-2-2.webp",
    "https://i.ibb.co/C5wCXxv/shoe-2-3.webp",
    "https://i.ibb.co/GRXd7Kh/shoe-2-4.webp",
  ],
  [
    "https://i.ibb.co/4Zb8gzw/shoe-1-1.webp",
    "https://i.ibb.co/xfDZTxM/shoe-1-2.webp",
    "https://i.ibb.co/z4D94hs/shoe-1-3.webp",
    "https://i.ibb.co/60XwL2M/shoe-1-4.webp",
  ],
  [
    "https://i.ibb.co/R9h7VqL/image-product-8-mrpszr.jpg",
    "https://i.ibb.co/R9h7VqL/image-product-8-mrpszr.jpg",
    "https://i.ibb.co/R9h7VqL/image-product-8-mrpszr.jpg",
    "https://i.ibb.co/R9h7VqL/image-product-8-mrpszr.jpg",
  ],
  [
    "https://i.ibb.co/cyN2Wq9/shoe-5-1.jpg",
    "https://i.ibb.co/cyN2Wq9/shoe-5-1.jpg",
    "https://i.ibb.co/cyN2Wq9/shoe-5-1.jpg",
    "https://i.ibb.co/cyN2Wq9/shoe-5-1.jpg",
  ],
  [
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
  ],
  [
    "https://i.ibb.co/cLRtShr/shoe-7-1.jpg",
    "https://i.ibb.co/cLRtShr/shoe-7-1.jpg",
    "https://i.ibb.co/cLRtShr/shoe-7-1.jpg",
    "https://i.ibb.co/cLRtShr/shoe-7-1.jpg",
  ],
  [
    "https://i.ibb.co/KrfSb1z/shoe-8-1.jpg",
    "https://i.ibb.co/KrfSb1z/shoe-8-1.jpg",
    "https://i.ibb.co/KrfSb1z/shoe-8-1.jpg",
    "https://i.ibb.co/KrfSb1z/shoe-8-1.jpg",
  ],
  [
    "https://i.ibb.co/njSBCw2/shoe-9-1.jpg",
    "https://i.ibb.co/njSBCw2/shoe-9-1.jpg",
    "https://i.ibb.co/njSBCw2/shoe-9-1.jpg",
    "https://i.ibb.co/njSBCw2/shoe-9-1.jpg",
  ],
  [
    "https://i.ibb.co/vYxHWWh/shoe-10-1.jpg",
    "https://i.ibb.co/vYxHWWh/shoe-10-1.jpg",
    "https://i.ibb.co/vYxHWWh/shoe-10-1.jpg",
    "https://i.ibb.co/vYxHWWh/shoe-10-1.jpg",
  ],
  [
    "https://i.ibb.co/BrmXVqh/shoe-11-1.jpg",
    "https://i.ibb.co/BrmXVqh/shoe-11-1.jpg",
    "https://i.ibb.co/BrmXVqh/shoe-11-1.jpg",
    "https://i.ibb.co/BrmXVqh/shoe-11-1.jpg",
  ],
  [
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
  ],
];
let product1Thumbnail = [
  [
    "https://i.ibb.co/jJgv8sp/image-product-1-thumbnail.webp",
    "https://i.ibb.co/1fzg4yK/image-product-2-thumbnail.webp",
    "https://i.ibb.co/Q9SJgLK/image-product-3-thumbnail.webp",
    "https://i.ibb.co/7274pPL/image-product-4-thumbnail.webp",
  ],
  [
    "https://i.ibb.co/Jjfnt16/shoe-2-s1.webp",
    "https://i.ibb.co/KK1yydb/shoe-2-s2.webp",
    "https://i.ibb.co/1XTHHv6/shoe-2-s3.webp",
    "https://i.ibb.co/Ltzzqz7/shoe-2-s4.webp",
  ],
  [
    "https://i.ibb.co/fpHmCjD/shoe-1-s1.webp",
    "https://i.ibb.co/rMMvXrF/shoe-1-s2.webp",
    "https://i.ibb.co/RcHQGc6/shoe-1-s3.webp",
    "https://i.ibb.co/tXGs96W/shoe-1-s4.webp",
  ],
  [
    "https://i.ibb.co/R9h7VqL/image-product-8-mrpszr.jpg",
    "https://i.ibb.co/R9h7VqL/image-product-8-mrpszr.jpg",
    "https://i.ibb.co/R9h7VqL/image-product-8-mrpszr.jpg",
    "https://i.ibb.co/R9h7VqL/image-product-8-mrpszr.jpg",
  ],
  [
    "https://i.ibb.co/cyN2Wq9/shoe-5-1.jpg",
    "https://i.ibb.co/cyN2Wq9/shoe-5-1.jpg",
    "https://i.ibb.co/cyN2Wq9/shoe-5-1.jpg",
    "https://i.ibb.co/cyN2Wq9/shoe-5-1.jpg",
  ],
  [
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
  ],
  [
    "https://i.ibb.co/cLRtShr/shoe-7-1.jpg",
    "https://i.ibb.co/cLRtShr/shoe-7-1.jpg",
    "https://i.ibb.co/cLRtShr/shoe-7-1.jpg",
    "https://i.ibb.co/cLRtShr/shoe-7-1.jpg",
  ],
  [
    "https://i.ibb.co/KrfSb1z/shoe-8-1.jpg",
    "https://i.ibb.co/KrfSb1z/shoe-8-1.jpg",
    "https://i.ibb.co/KrfSb1z/shoe-8-1.jpg",
    "https://i.ibb.co/KrfSb1z/shoe-8-1.jpg",
  ],
  [
    "https://i.ibb.co/njSBCw2/shoe-9-1.jpg",
    "https://i.ibb.co/njSBCw2/shoe-9-1.jpg",
    "https://i.ibb.co/njSBCw2/shoe-9-1.jpg",
    "https://i.ibb.co/njSBCw2/shoe-9-1.jpg",
  ],
  [
    "https://i.ibb.co/vYxHWWh/shoe-10-1.jpg",
    "https://i.ibb.co/vYxHWWh/shoe-10-1.jpg",
    "https://i.ibb.co/vYxHWWh/shoe-10-1.jpg",
    "https://i.ibb.co/vYxHWWh/shoe-10-1.jpg",
  ],
  [
    "https://i.ibb.co/BrmXVqh/shoe-11-1.jpg",
    "https://i.ibb.co/BrmXVqh/shoe-11-1.jpg",
    "https://i.ibb.co/BrmXVqh/shoe-11-1.jpg",
    "https://i.ibb.co/BrmXVqh/shoe-11-1.jpg",
  ],
  [
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
    "https://i.ibb.co/2dczJnY/shoe-6-1.jpg",
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
    product1Images[i],
    product1Thumbnail[i]
  );
  productsData.push(product);
}

export function getProducts() {
  return productsData;
}
