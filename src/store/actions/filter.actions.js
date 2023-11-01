export const SET_TAG_STACK = "SET_TAG_STACK";

export const setTagStack = (tagStack) => {
  return {
    type: SET_TAG_STACK,
    payload: tagStack,
  };
};
