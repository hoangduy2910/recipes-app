import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { Link, useParams } from "react-router-dom";

import Button from "../../../shared/components/UI/Button/Button";
import Spinner from "../../../shared/components/UI/Spinner/Spinner";
import SpinnerDot from "../../../shared/components/UI/SpinnerDot/SpinnerDot";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import "./UserRecipes.css";

const LIMIT = 8;

const UserRecipes = (props) => {
  const auth = useContext(AuthContext);
  const userId = useParams().userId;

  const [page, setPage] = useState(1);
  const [hasMorePage, setHasMorePage] = useState(false);

  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const observer = useRef();
  const lastRecipeRef = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorePage) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMorePage]
  );

  useEffect(() => {
    const getRecipesByUserId = async () => {
      let response;
      try {
        response = await sendRequest(
          `/recipes/user/${userId}?page=${page}&limit=${LIMIT}`,
          "GET"
        );

        setUser(response.data.user);
        setRecipes((prevRecipes) => {
          if (prevRecipes) {
            return [...prevRecipes, ...response.data.recipes.results];
          }
          return response.data.recipes.results;
        });
        setHasMorePage(response.data.recipes.hasMore);
      } catch (error) {}
    };
    getRecipesByUserId();
  }, [sendRequest, userId, page]);

  let userRecipes = (
    <div className="no-recipes">
      <h2>No recipes found. Maybe create one?</h2>
      <Button fill href="/recipe/new">
        Share Recipe
      </Button>
    </div>
  );

  if (recipes.length > 0) {
    userRecipes = <RecipeList recipes={recipes} lastRecipe={lastRecipeRef} />;
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && recipes.length === 0 && !user && <Spinner />}
      {user && (
        <div className="user-recipes">
          <div className="user-recipes__info">
            <div className="user-recipes__info-image">
              <img
                src={`http://localhost:5000/${user.image}`}
                alt={user.username}
              />
            </div>
            <div className="user-recipes__info-overall">
              <h2>{user.username}</h2>
              <p>{user.email}</p>
              {auth.userId === user._id && (
                <Link
                  className="user-recipes__edit"
                  to={`/profile/${user.id || user._id}`}
                >
                  Edit profile
                </Link>
              )}
            </div>
          </div>
          {userRecipes}
          {isLoading && recipes && user && <SpinnerDot />}
        </div>
      )}
    </React.Fragment>
  );
};

export default UserRecipes;
