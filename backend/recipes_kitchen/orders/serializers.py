from rest_framework import serializers
from .models import Orders

class OrderSerializer(serializers.ModelSerializer):
    recipe_title = serializers.CharField(source="recipe_id.title", read_only=True)
    ingredients_title = serializers.CharField(source="ingredients_id.name", read_only=True)
    ingredients_image = serializers.URLField(source="ingredients_id.image", read_only=True)
    
    class Meta:
        model = Orders
        fields = [
            "id",
            "recipe_id",
            "ingredients_id",
            "recipe_title",
            "ingredients_title",
            "ingredients_image",
            "address",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
