import initialCategories from "../data/categories";
const CATEGORIES_KEY = "categories";

export function getCategories() {
  const savedCategories = localStorage.getItem(CATEGORIES_KEY);
  if (savedCategories !== null) {
    return JSON.parse(savedCategories);
  }
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(initialCategories));
  return initialCategories;
}
export function saveCategories(categories){
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

