from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from catalog.models import Recipes, Ingredients
from .models import Cart, CartItem
from .serializers import CartItemSerializer

@extend_schema(
    summary="Add recipe to cart",
    description="Add selected ingredients of a recipe to the user's cart."
)
class AddRecipeToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, recipe_id):
        recipe = get_object_or_404(Recipes, id=recipe_id)
        cart, _ = Cart.objects.get_or_create(user=request.user)
        ingredient_ids = request.data.get("ingredient_ids")

        if ingredient_ids is None:
            ingredients = recipe.ingredients.all()
        else:
            if not isinstance(ingredient_ids, list):
                return Response(
                    {"detail": "ingredient_ids must be a list"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            ingredients = Ingredients.objects.filter(
                recipe_id=recipe,
                id__in=ingredient_ids,
            )

        created_count = 0

        for ingredient in ingredients:
            _, created = CartItem.objects.get_or_create(
                cart=cart,
                ingredient=ingredient,
                defaults={"recipe": recipe}
            )
            if created:
                created_count += 1

        return Response({
            "detail": "Ingredients added to cart",
            "added_items": created_count
        })



@extend_schema(
    summary="View cart",
    description="Retrieve all items in the authenticated user's cart."
)
class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartItemSerializer(cart.items.all(), many=True)
        return Response(serializer.data)


@extend_schema(
    summary="Delete cart item",
    description="Delete one ingredient from the authenticated user's cart."
)
class CartItemDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, cart_item_id):
        cart_item = get_object_or_404(
            CartItem,
            id=cart_item_id,
            cart__user=request.user,
        )
        cart_item.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


@extend_schema(
    summary="Clear cart",
    description="Delete all ingredients from the authenticated user's cart."
)
class CartDeleteAllView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart.items.all().delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
