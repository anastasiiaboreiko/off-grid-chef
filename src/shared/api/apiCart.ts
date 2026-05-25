import type { CartItemType } from "../types/CartItemType";
const API_URL = import.meta.env.VITE_API_URL;

type AddRecipeToCartResponse = {
  detail: string;
  added_items: number;
}

export async function addRecipeToCart(
  recipeId: number, 
  accessToken: string,
  ingredientIds: number[],
): Promise<AddRecipeToCartResponse> {
  const response = await fetch(`${API_URL}/cart/add-recipe/${recipeId}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ ingredient_ids: ingredientIds }),
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

export async function deleteAllCartItems(accessToken: string): Promise<void> {
  const response = await fetch(`${API_URL}/cart/delete-all/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete all cart items');
  }
}

export async function deleteCartItem(
  accessToken: string,
  cartItemId: number,
): Promise<void> {
  const response = await fetch(`${API_URL}/cart/${cartItemId}/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete the cart item');
  }
}
