from django.db import models

class Recipes(models.Model):

    class Category(models.TextChoices):
        WITH_LIGHT = "with_light", "With light"
        NO_LIGHT = "no_light", "No light"

    class DishType(models.TextChoices):
        BREAKFAST = "breakfast", "Breakfast"
        LUNCH = "lunch", "Lunch"
        DINNER = "dinner", "Dinner"
    
    class Complexity(models.TextChoices):
        EASY = "easy", "Easy"
        MEDIUM = "medium", "Medium"
        HARD = "hard", "Hard"
    
    title = models.CharField(max_length=255)
    image_url = models.URLField()
    category = models.CharField(max_length=100, choices=Category.choices)
    type_of_dish = models.CharField(max_length=100, choices=DishType.choices)
    cooking_time = models.PositiveIntegerField(help_text="Time in minutes")
    complexity = models.CharField(max_length=100, choices=Complexity.choices)
    view_count = models.PositiveIntegerField(default=0)
    description = models.TextField()

    def __str__(self) -> str:
        return self.title

class Ingredients(models.Model):
    recipe_id = models.ForeignKey(Recipes, on_delete=models.CASCADE, related_name="ingredients")
    name = models.CharField(max_length=255)
    quantity = models.FloatField()
    unit = models.CharField(max_length=255)
    image = models.URLField(blank=True, null=True)

    def __str__(self) -> str:
        return self.name

class Instructions(models.Model):
    recipe = models.ForeignKey(
        Recipes,
        on_delete=models.CASCADE,
        related_name="instructions"   
    )
    text = models.TextField()

    def __str__(self):
        return f"Instruction for {self.recipe.title}"
