import { setName, setEmail } from "../../store/actions/auth.actions.js";
import { isEmailValid } from "./utils";
import { languages } from "../../languages";
import {
  selectLanguage,
} from "../../store/sagas/selectors.js";
import { useSelector } from "react-redux";

export const useFormRecipe = () => {
  const name =  useSelector((state) => state.auth.currentName);
  const email =  useSelector((state) => state.auth.currentEmail);
  const currentLanguage = useSelector(selectLanguage);

  return [
    {
      className: "Landing-Name",
      id: languages[currentLanguage].FULL_NAME_LABEL,
      name: languages[currentLanguage].FULL_NAME_LABEL,
      label: languages[currentLanguage].FULL_NAME_LABEL,
      type: "text",
      value: name,
      setValue: setName,
      error: false,
      helperText: "",
    },
    {
      className: "Landing-Email",
      id: languages[currentLanguage].EMAIL_LABEL,
      name: languages[currentLanguage].EMAIL_LABEL,
      label: languages[currentLanguage].EMAIL_LABEL,
      type: "email",
      value: email,
      setValue: setEmail,
      error: !isEmailValid(email),
      helperText: languages[currentLanguage].EMAIL_HELPER_TEXT,
    },
  ];
};
