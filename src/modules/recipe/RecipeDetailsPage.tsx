import { useContext, useEffect, useState } from "react";
import styles from './RecipeDetailsPage.module.scss';
import { RecipesContext } from "../../shared/context/RecipesContext";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { PowerDetails } from "../../shared/ui/powerDetails/PowerDetails";
import { ComplexityDetails } from "../../shared/ui/complexityDetails/ComplexityDetails";
import { TypeDetails } from "../../shared/ui/typeDetails/TypeDetails";
import { Ingredient } from "../../shared/ui/ingredient/Ingredient";
import { FavoriteButton } from "../../shared/ui/buttons/favoriteButton/FavoriteButton";
import { TimeDetails } from "../../shared/ui/timeDetails/TimeDetails";
import { BackButton } from "../../shared/ui/buttons/backButton/BackButton";
import { useDeviceType } from "../../shared/hooks/useDeviceType";
import { addRecipeToCart } from "../../shared/api/apiCart";

export const RecipeDetailsPage = () => {
  const { recipes } = useContext(RecipesContext);
  const { recipeId } = useParams<{ recipeId?: string }>();
  const { isMobile } = useDeviceType();

  const [cartMessage, setCartMessage] = useState('')
  const [excludedIngredientIds, setExcludedIngredientIds] = useState<Set<number>>(new Set());

  const navigate = useNavigate();
  const isRecipeDetailesPage = Boolean(useMatch('/recipes/:recipeId'))

  const currentRecipe = recipeId
    ? recipes.find(recipe => recipe.id === Number(recipeId))
    : undefined;

  const recipeIngredients = currentRecipe?.ingredients;

  const recipeInstructions = currentRecipe?.instructions;

  const removeStepNumber = (value: string) =>
    value.replace(/^\d+\.\s/, "");

  const handleToggleIngredient = (ingredientId: number) => {
    setExcludedIngredientIds(prev => {
      const nextExcludedIngredientIds = new Set(prev);

      if (nextExcludedIngredientIds.has(ingredientId)) {
        nextExcludedIngredientIds.delete(ingredientId);
      } else {
        nextExcludedIngredientIds.add(ingredientId);
      }

      return nextExcludedIngredientIds;
    });
  };

  const handleAddToCart = async () => {
    setCartMessage('');
    const accessToken = localStorage.getItem('accessToken');

    if (!currentRecipe || !accessToken) {
      return;
    }

    const ingredientIds = recipeIngredients
      ?.filter(ingredient => !excludedIngredientIds.has(ingredient.id))
      .map(ingredient => ingredient.id) ?? [];

    if (ingredientIds.length === 0) {
      setCartMessage('Select at least one ingredient.');
      return;
    }

    try {
      const result = await addRecipeToCart(currentRecipe.id, accessToken, ingredientIds);
      if (result.added_items > 0) {
        setCartMessage('Ingredients added to cart.');
      } else {
        setCartMessage('These ingredients are already in your cart.');
      }
    } catch {
      setCartMessage('Failed to add ingredients to cart.');
    }
  };

  useEffect(() => {
    if(!cartMessage) {
      return; 
    }

    const timerId = window.setTimeout(() => {
      setCartMessage('');
    }, 5000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [cartMessage]);

  return (
    <div className={styles.container}>
      {!isMobile && (
        <BackButton 
          onClick={() => navigate('/')}
          isHidden={!isRecipeDetailesPage}
        />
      )}

      <div className={styles.recipe}>
        <div className={styles.recipe__mainBlock}>
          <div className={styles.pictureBlock}>
            <img 
              className={styles.picture}
              src={currentRecipe?.image} 
              alt="recipe picture" 
            />

            <div className={styles.specs}>
              {currentRecipe && (
                <FavoriteButton recipeId={currentRecipe.id} />
              )}
            </div>
          </div>
          
          <div className={styles.mainInfo}>
            <h2 className={styles.mainInfo__title}>
              {currentRecipe?.title}
            </h2>
            <p className={`main-text ${styles.mainInfo__description}`}>
              {currentRecipe?.description}
            </p>
            <div className={styles.mainInfo__details}>
              {currentRecipe && (
                <>
                  <PowerDetails recipe={currentRecipe} />
                  <TimeDetails recipe={currentRecipe}/>
                  <TypeDetails recipe={currentRecipe} />
                  <ComplexityDetails recipe={currentRecipe} />
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles.recipe__detailsBlock}>
          <div className={styles.preparation}>
            {recipeInstructions && (
              recipeInstructions.map(instruction => (
                <div className={styles.preparation__item} key={instruction.id}>
                  <div className={styles.preparation__stepNumber}>
                    <p className={`small-text ${styles.preparation__stepNumberText}`}>
                      {instruction.text.split('.')[0]}
                    </p>
                  </div>
                  <p className={`body-text ${styles.preparation__instruction}`}>
                    {removeStepNumber(instruction.text)}
                  </p>
              </div>
              ))
            )}
           
          </div>

          <div className={styles.ingredients}>
            <h3 className={styles.ingredients__title}>
              Ingredients
            </h3>
            {recipeIngredients && (
              <ul className={styles.ingredients__list}>
                {recipeIngredients.map(ingredient => (
                  <Ingredient
                    ingredient={ingredient}
                    isChecked={!excludedIngredientIds.has(ingredient.id)}
                    key={ingredient.id}
                    onToggle={handleToggleIngredient}
                  />
                ))}
              </ul>
            )}
            <div className={styles.ingredients__footer}>
              <div className={styles.buttonInfo}>
                <span className={styles.buttonInfo__icon} />
              </div>
              
              <button 
                className={`button-text ${styles.buttonAddToCart}`}
                onClick={handleAddToCart}
              >
                Add to cart
              </button> 
              {cartMessage && (
                <div className={styles.ingredients__toast}>
                  <p className={`small-text ${styles.ingredients__message}`}>
                    {cartMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
