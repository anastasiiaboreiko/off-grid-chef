from django.db import migrations


ARBORIO_RICE_IMAGE = "https://www.themealdb.com/images/ingredients/Rice.png"
OLD_ARBORIO_RICE_IMAGE = "https://www.themealdb.com/images/ingredients/Arborio%20Rice.png"


def fix_arborio_rice_image(apps, schema_editor):
    Ingredients = apps.get_model("catalog", "Ingredients")
    Ingredients.objects.filter(name="Arborio Rice").update(image=ARBORIO_RICE_IMAGE)


def restore_arborio_rice_image(apps, schema_editor):
    Ingredients = apps.get_model("catalog", "Ingredients")
    Ingredients.objects.filter(name="Arborio Rice").update(image=OLD_ARBORIO_RICE_IMAGE)


class Migration(migrations.Migration):

    dependencies = [
        ("catalog", "0002_ingredients_image"),
    ]

    operations = [
        migrations.RunPython(fix_arborio_rice_image, restore_arborio_rice_image),
    ]
