import type { CartItemType } from "../types/CartItemType";
const API_URL = import.meta.env.VITE_API_URL;

type AddRecipeToCartResponse = {
  detail: string;
  added_items: number;
}

export async function addRecipeToCart(
  recipeId: number, 
  accessToken: string
): Promise<AddRecipeToCartResponse> {
  const response = await fetch(`${API_URL}/cart/add-recipe/${recipeId}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to add recipe to the cart');
  }

  return response.json();
};

export async function getCartItems(accessToken: string): Promise<CartItemType[]> {
  const response = await fetch(`${API_URL}/cart/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get cart');
  }

  return response.json();
};