import axios from "axios";
import { setAuthToken } from "./auth";
import { setAlert } from "./alert";
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
} from "./types";

// Get guest posts list
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/posts?per_page=12&page=1");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

// Get loged in users' posts
export const getLoginPosts = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/posts?per_page=12&page=1");
    dispatch({
      type: GET_LOGINPOSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

// Get   More   loged in users' posts
export const getMoreLoginPosts = (page_next) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/posts?per_page=12&page=${page_next}`);
    dispatch({
      type: GET_MORE_LOGINPOSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

// Get   More   registered users' posts
export const getMoreRegisteredPosts = (page_next) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/posts?per_page=12&page=${page_next}`);
    dispatch({
      type: GET_MORE_REGISTEREDPOSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

// Get single post by id
export const getSinglePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/${postId}`);
    dispatch({
      type: GET_SINGLEPOST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

// Get registered/favourited posts
export const getRegisteredPosts = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/posts?favourited=1&author=124");
    dispatch({
      type: GET_REGISTEREDPOSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

// Unregister a post
export const postUnregister = (postId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.delete(`/favourites/post/${postId}`);

    dispatch({
      type: DELETE_POSTUNREGISTER,
      payload: res.data,
    });

    dispatch(setAlert(res.data.success));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
    });
  }
};

// Register post
export const registerPost = (registerData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/favourites", registerData, config);

    dispatch({
      type: REGISTER_POST,
      payload: res.data,
    });

    dispatch(setAlert(res.data.success));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
  }
};
