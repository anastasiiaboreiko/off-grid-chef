from django.db import migrations


NEW_TUNA_BEAN_SALAD_IMAGE = (
    "https://cdn11.bigcommerce.com/s-cjh14ahqln/product_images/uploaded_images/"
    "tunacannellinibeansalad-1-web.jpg"
)
OLD_TUNA_BEAN_SALAD_IMAGE = (
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:"
    "ANd9GcSy0IDqaP0V7Dc1RoH9PJpOO_hoCL4K-p2YBw&s"
)


def update_tuna_bean_salad_image(apps, schema_editor):
    Recipes = apps.get_model("catalog", "Recipes")
    Recipes.objects.filter(title="Tuna & Bean Salad").update(
        image_url=NEW_TUNA_BEAN_SALAD_IMAGE
    )


def restore_tuna_bean_salad_image(apps, schema_editor):
    Recipes = apps.get_model("catalog", "Recipes")
    Recipes.objects.filter(title="Tuna & Bean Salad").update(
        image_url=OLD_TUNA_BEAN_SALAD_IMAGE
    )


class Migration(migrations.Migration):

    dependencies = [
        ("catalog", "0004_fix_chia_seeds_image"),
    ]

    operations = [
        migrations.RunPython(
            update_tuna_bean_salad_image,
            restore_tuna_bean_salad_image,
        ),
    ]
