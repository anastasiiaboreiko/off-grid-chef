from rest_framework import serializers
from .models import CartItem

class CartItemSerializer(serializers.ModelSerializer):
    ingredient_name = serializers.CharField(source="ingredient.name", read_only=True)
    image = serializers.URLField(source="ingredient.image", read_only=True)
    ingredient_image = serializers.URLField(source="ingredient.image", read_only=True)
    quantity = serializers.FloatField(source="ingredient.quantity", read_only=True)
    unit = serializers.CharField(source="ingredient.unit", read_only=True)
    recipe_title = serializers.CharField(source="recipe.title", read_only=True)

    class Meta:
        model = CartItem
        fields = [
            "id",
            "recipe",
            "recipe_title",
            "ingredient",
            "ingredient_name",
            "image",
            "ingredient_image",
            "quantity",
            "unit",
        ]
