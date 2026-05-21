import styles from './RecipeListPage.module.scss';
import { FilterByPower } from '../../shared/ui/filters/filterByPower';
import { FilterByType } from "../../shared/ui/filters/filterByType";
import { FilterByTime } from "../../shared/ui/filters/filterByTime";
import { FilterByComplexity } from "../../shared/ui/filters/filterByComplexity";
import { RecipeList } from "../../shared/ui/recipeList";
import { useContext, useState } from "react";
import { RecipesContext } from "../../shared/context/RecipesContext";
import { Loader } from "../../shared/ui/loader";
import { ErrorMessage } from "../../shared/ui/errorMessage";
import { NoResults } from "../../shared/ui/noResults";
import type { FilterPower } from "../../shared/types/FilterPower";
import type { FilterType } from "../../shared/types/FilterType";
import type { FilterTime } from "../../shared/types/FilterTime";
import type { FilterComplexity } from "../../shared/types/FilterComplexity";
import { useLocation } from "react-router-dom";

export const RecipeListPage = () => {
  const { recipes, loading, errorMessage } = useContext(RecipesContext);
  const [powerFilter, setPowerFilter] = useState<FilterPower>('all');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [timeFilter, setTimeFilter] = useState<FilterTime>('all');
  const [complexityFilter, setComplexityFilter] = useState<FilterComplexity>('all');
  const location = useLocation();
  const pathname = location.pathname;

  const getFilteredRecipes = () => {
    return recipes.filter(recipe => {
      if (powerFilter !== 'all' && recipe.category !== powerFilter) return false;
      
      if (typeFilter !== 'all' && recipe.type_of_dish !== typeFilter) return false;

      if (timeFilter !== 'all') {
        const time = recipe.cooking_time;
        if (timeFilter === '15' && time > 15) return false;
        if (timeFilter === '30' && (time <= 15 || time > 30)) return false;
        if (timeFilter === '60' && (time <= 30 || time > 60)) return false;
      }

      if (complexityFilter !== 'all' && recipe.complexity !== complexityFilter) return false;

      return true;
    });
  };

  const visibleRecipes = getFilteredRecipes();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Recipe List
      </h1>

      <div className={styles.filters}>
        <FilterByPower 
          value={powerFilter} 
          onChange={setPowerFilter} 
        />

        <div className={styles.addFilters}>
          <FilterByType 
            value={typeFilter} 
            onChange={setTypeFilter}
          />
          <FilterByTime 
            value={timeFilter} 
            onChange={setTimeFilter}
          />
          <FilterByComplexity 
            value={complexityFilter} 
            onChange={setComplexityFilter}
          />
        </div>
      
      </div>

      <h2 className={styles.additionalTitle}>Recommended Recipes</h2>

      {loading && <Loader />}

      {!loading && errorMessage && <ErrorMessage />}

      {!loading && !errorMessage && visibleRecipes.length > 0 && (
        <RecipeList recipes={visibleRecipes}/>
      )}
      
      {!loading && !errorMessage && visibleRecipes.length === 0 && recipes.length > 0 && (
        <NoResults pathname={pathname} />
      )}
    </div>
  );
};