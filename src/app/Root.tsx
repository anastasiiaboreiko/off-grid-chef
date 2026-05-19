import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import App from "./App";
import { RecipeListPage } from "../modules/recipeList/RecipeListPage";
import { FavoritesPage } from "../modules/favorites/FavoritesPage";
import { CartPage } from "../modules/cart/CartPage";
import { RecipesProvider } from "../shared/context/RecipeProvider";
import { FavoritesProvider } from "../shared/context/FavoritesContext";
import { RecipeDetailsPage } from "../modules/recipe/RecipeDetailsPage";
import { AuthProvider } from "../shared/context/AuthProvider";
import { ProtectedRoute } from "../shared/routes/ProtectedRoute";
import { GuestRoute } from "../shared/routes/GuestRoute";
import { AuthPage } from "../modules/auth/AuthPage";


export const Root = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <RecipesProvider>
                <FavoritesProvider>
                  <App />
                </FavoritesProvider>
              </RecipesProvider>
            </ProtectedRoute>
          }> 
          <Route index element={<RecipeListPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="recipes/:recipeId" element={<RecipeDetailsPage/>} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
        <Route 
          path="/auth"
          element={
            <GuestRoute>
              <AuthPage />
            </GuestRoute>
          }
        />
      </Routes>
     
    </AuthProvider>
  
  </Router>
)