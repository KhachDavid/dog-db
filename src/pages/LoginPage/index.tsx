import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../store/actions/auth.actions";
import CustomTextField from "../../components/CustomTextField";
import { useFormRecipe } from "./constants";

interface LoginPageProps {
  setAuthenticated: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setAuthenticated }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  const handleLogin = () => {
    // Dispatch the login action with user's data
    dispatch(loginRequest());
  };

  // Assuming you have logic to handle user state changes
  React.useEffect(() => {
    if (user) {
      setAuthenticated(true);
    }
  }, [user, setAuthenticated]);

  const formRecipe = useFormRecipe();

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        {formRecipe.map((recipe) => {
          return (
            <CustomTextField
              key={recipe.className}
              className={recipe.className}
              name={recipe.name}
              id={recipe.id}
              label={recipe.label}
              type={recipe.type}
              value={recipe.value}
              setValue={recipe.setValue}
              error={recipe.error}
              helperText={recipe.helperText}
            />
          )}
        )}
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
