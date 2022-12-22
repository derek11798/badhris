import { language } from "../Constants/constant";

export const autoCompleteDropdownValidation = (value, validateArray) => {
  if (value !== null && value !== "") {
    if (validateArray.includes(value)) {
      return true;
    }
  } else if (value === null || value === "") {
    return true;
  }
};
