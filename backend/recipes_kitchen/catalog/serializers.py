from rest_framework import serializers
from .models import Recipes, Ingredients, Instructions

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = ["id", "name", "quantity", "unit", "image"]

class InstructionSerializer(serializers.ModelSerializer):
    recipe_title = serializers.CharField(source="recipe.title", read_only=True)

    class Meta:
        model = Instructions
        fields = ["id", "recipe_title", "text"]


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    instructions = InstructionSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Recipes
        fields = [
            "id",
            "title",
            "image_url",
            "category",
            "type_of_dish",
            "cooking_time",
            "complexity",
            "view_count",
            "description",
            "instructions",
            "ingredients",
        ]
    
    def get_image_url(self, obj):
         return obj.image_url if obj.image_url else None
