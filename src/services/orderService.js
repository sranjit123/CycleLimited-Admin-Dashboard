
const API_URL = "https://dummyjson.com/carts?limit=0";

export async function getOrders() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch orders.");
  }

  const data = await response.json();

  return data.carts;
}

