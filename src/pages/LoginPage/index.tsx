import React from "react";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../store/actions/auth.actions";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton";
import { useFormRecipe } from "./constants";
import "./styles.scss";
import DogAnimation from "../../components/DogAnimation";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const formRecipe = useFormRecipe();

  return (
    <>
      <div className="center-container">
        <DogAnimation />
        <form className="form">
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
            );
          })}
          <CustomButton
            label="Login"
            onClick={() => dispatch(loginRequest())}
            disabled={
              formRecipe.some((recipe) => recipe.error) ||
              formRecipe.some((recipe) => recipe.value === "")
            }
            data-testid="login-submit"
          />
        </form>
      </div>
    </>
  );
};

export default LoginPage;
