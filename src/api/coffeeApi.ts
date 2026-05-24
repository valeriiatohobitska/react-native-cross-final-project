import { CoffeeProduct } from '../data/products';

export const COFFEE_API_URL = 'https://api.sampleapis.com/coffee/hot';

type ApiCoffeeProduct = {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  image: string;
};

function getDisplayPrice(id: number) {
  return `$ ${(2 + (id % 5) * 0.75).toFixed(2)}`;
}

function normalizeCoffeeProduct(item: ApiCoffeeProduct): CoffeeProduct {
  return {
    id: String(item.id),
    title: item.title,
    price: getDisplayPrice(item.id),
    imageUrl: item.image,
    description: item.description,
    ingredients: item.ingredients,
  };
}

export async function fetchCoffeeMenu(): Promise<CoffeeProduct[]> {
  const response = await fetch(COFFEE_API_URL);

  if (!response.ok) {
    throw new Error(`Coffee API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as ApiCoffeeProduct[];

  // Keep API parsing in one place so screens can render app-shaped products.
  return data.map(normalizeCoffeeProduct);
}

export async function fetchCoffeeProduct(productId?: string): Promise<CoffeeProduct | null> {
  if (!productId) {
    return null;
  }

  const menu = await fetchCoffeeMenu();
  return menu.find(item => item.id === productId) ?? null;
}
