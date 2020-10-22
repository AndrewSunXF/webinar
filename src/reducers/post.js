import {
  GET_POSTS,
  GET_LOGINPOSTS,
  POST_ERROR,
  GET_SINGLEPOST,
  GET_REGISTEREDPOSTS,
  DELETE_POSTUNREGISTER,
  REGISTER_POST,
  GET_MORE_LOGINPOSTS,
  GET_MORE_REGISTEREDPOSTS,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  pagination: {},
  loading: true,
  msg: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
    case GET_LOGINPOSTS:
      return {
        ...state,
        posts: payload.data.filter((post) => post.favourited === false),
        pagination: payload.meta.pagination,
        loading: false,
      };

    case GET_REGISTEREDPOSTS:
      return {
        ...state,
        posts: payload.data.filter((post) => post.favourited === true),
        pagination: payload.meta.pagination,
        loading: false,
      };

    case GET_MORE_LOGINPOSTS:
      return {
        ...state,
        posts: [
          ...state.posts,
          ...payload.data.filter((post) => post.favourited === false),
        ],
        pagination: payload.meta.pagination,
        loading: false,
      };

    case GET_MORE_REGISTEREDPOSTS:
      return {
        ...state,
        posts: [
          ...state.posts,
          ...payload.data.filter((post) => post.favourited === true),
        ],
        pagination: payload.meta.pagination,
        loading: false,
      };

    case GET_SINGLEPOST:
      return {
        ...state,
        post: payload.data,
        loading: false,
      };

    case REGISTER_POST:
    case DELETE_POSTUNREGISTER:
      return {
        ...state,
        msg: payload.success,
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
