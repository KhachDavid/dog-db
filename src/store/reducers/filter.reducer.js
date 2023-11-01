import { SET_TAG_STACK } from "../actions/filter.actions";

const initialState = {
  tagStack: [],
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TAG_STACK:
      return {
        ...state,
        tagStack: action.payload,
      };

    default:
      return state;
  }
}
