import initialProducts from "../data/products";
const PRODUCTS_KEY = "products";

export function getProducts() {
  const savedProducts = localStorage.getItem(PRODUCTS_KEY);

  if (savedProducts) {
    return JSON.parse(savedProducts);
  }

  // First time: use existing product data
  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(initialProducts)
  );

  return initialProducts;
}

export function saveProducts(products) {
  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(products)
  );
}