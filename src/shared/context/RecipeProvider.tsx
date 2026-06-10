import React, { useEffect, useMemo, useState } from "react";
import type { Recipe } from "../types/Recipe";
import { getRecipes } from "../api/apiRecipes";
import { RecipesContext } from "./RecipesContext";

type Props = {
  children: React.ReactNode;
};

export const RecipesProvider: React.FC<Props> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setErrorMessage(false);

      try {
        const data = await getRecipes();
        if (isMounted) setRecipes(data);
      } catch {
        if (isMounted) setErrorMessage(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      recipes,
      loading,
      errorMessage,
    }),
    [recipes, loading, errorMessage],
  );

  return (
    <RecipesContext.Provider value={value}>
      {children}
    </RecipesContext.Provider>
  )
}
