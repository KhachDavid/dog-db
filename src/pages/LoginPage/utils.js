/**
 * Function for checking whether the given email is valid or not
 * @param {string} email is the current email that is in the textbox
 * @returns true if the email is valid, false otherwise
 * the email is considered valid if it is not an empty string and contains an @ symbol
 * or it is an empty string
 * the email is considered invalid if it is not an empty string and does not contain an @ symbol
 */
export const isEmailValid = (email) => {
    if (email === "") return true;
    return email.includes("@") && email.length > 1 && email.includes(".");
  };