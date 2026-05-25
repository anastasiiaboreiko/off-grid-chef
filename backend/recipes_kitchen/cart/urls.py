from django.urls import path
from .views import AddRecipeToCartView, CartDeleteAllView, CartItemDeleteView, CartView

app_name = "cart"


urlpatterns = [
    path("add-recipe/<int:recipe_id>/", AddRecipeToCartView.as_view(), name="add-recipe"),
    path("delete-all/", CartDeleteAllView.as_view(), name="delete-all"),
    path("<int:cart_item_id>/", CartItemDeleteView.as_view(), name="cart-item-delete"),
    path("", CartView.as_view(), name="cart-detail"),
]
