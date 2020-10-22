import { SELECT_WEBINAR, SELECT_ERROR } from "../actions/types";

const initialState = {
  selectedTitle: "",
  selectedId: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECT_WEBINAR:
      return {
        ...state,
        selectedTitle: payload.title,
        selectedId: payload.id,
      };

    case SELECT_ERROR:
    default:
      return state;
  }
}
