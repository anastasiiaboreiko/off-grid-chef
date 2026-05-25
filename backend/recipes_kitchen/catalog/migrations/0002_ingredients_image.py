from django.db import migrations, models


INGREDIENT_IMAGES = {
    1: "Avocado",
    2: "Bread",
    3: "Tuna",
    4: "Cannellini Beans",
    5: "Lemon",
    6: "Salt",
    7: "Olive Oil",
    8: "Red Onion",
    9: "Parsley",
    10: "Vinegar",
    11: "Black Pepper",
    12: "Rolled Oats",
    13: "Milk",
    14: "Sesame Seed",
    15: "Honey",
    16: "Blueberries",
    17: "Tortillas",
    18: "Hummus",
    19: "Cucumber",
    20: "Red Pepper",
    21: "Spinach",
    22: "Eggs",
    23: "Parmesan",
    24: "Black Pepper",
    25: "Cheddar Cheese",
    26: "Butter",
    27: "Salt",
    28: "Spaghetti",
    29: "Bacon",
    30: "Eggs",
    31: "Parmesan",
    32: "Black Pepper",
    33: "Rice",
    34: "Mushrooms",
    35: "Onion",
    36: "White Wine",
    37: "Parmesan",
    38: "Butter",
    39: "Garlic",
    40: "Thyme",
    41: "Salmon",
    42: "Lemon",
    43: "Olive Oil",
    44: "Garlic",
    45: "Dill",
    46: "Black Pepper",
    47: "Beef",
    48: "Broccoli",
    49: "Soy Sauce",
    50: "Vegetable Oil",
    51: "Ginger",
    52: "Red Pepper",
}


def ingredient_image_url(name):
    return f"https://www.themealdb.com/images/ingredients/{name.replace(' ', '%20')}.png"


def populate_ingredient_images(apps, schema_editor):
    Ingredients = apps.get_model("catalog", "Ingredients")

    for ingredient_id, image_name in INGREDIENT_IMAGES.items():
        Ingredients.objects.filter(pk=ingredient_id).update(
            image=ingredient_image_url(image_name)
        )


def clear_ingredient_images(apps, schema_editor):
    Ingredients = apps.get_model("catalog", "Ingredients")
    Ingredients.objects.filter(pk__in=INGREDIENT_IMAGES.keys()).update(image=None)


class Migration(migrations.Migration):

    dependencies = [
        ("catalog", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="ingredients",
            name="image",
            field=models.URLField(blank=True, null=True),
        ),
        migrations.RunPython(populate_ingredient_images, clear_ingredient_images),
    ]
