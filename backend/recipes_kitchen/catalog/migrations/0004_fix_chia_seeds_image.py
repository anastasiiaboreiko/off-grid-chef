from django.db import migrations


CHIA_SEEDS_IMAGE = "https://www.themealdb.com/images/ingredients/Sesame%20Seed.png"
OLD_CHIA_SEEDS_IMAGE = "https://www.themealdb.com/images/ingredients/Chia%20Seeds.png"


def fix_chia_seeds_image(apps, schema_editor):
    Ingredients = apps.get_model("catalog", "Ingredients")
    Ingredients.objects.filter(name="Chia seeds").update(image=CHIA_SEEDS_IMAGE)


def restore_chia_seeds_image(apps, schema_editor):
    Ingredients = apps.get_model("catalog", "Ingredients")
    Ingredients.objects.filter(name="Chia seeds").update(image=OLD_CHIA_SEEDS_IMAGE)


class Migration(migrations.Migration):

    dependencies = [
        ("catalog", "0003_fix_arborio_rice_image"),
    ]

    operations = [
        migrations.RunPython(fix_chia_seeds_image, restore_chia_seeds_image),
    ]
