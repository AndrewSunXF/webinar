import { SELECT_WEBINAR, SELECT_ERROR } from "./types";

// Select webinar for dropdown
export const selectWebinar = (title, id) => (dispatch) => {
  try {
    dispatch({
      type: SELECT_WEBINAR,
      payload: {
        title: title,
        id: id,
      },
    });
  } catch (error) {
    dispatch({
      type: SELECT_ERROR,
    });
  }
};
