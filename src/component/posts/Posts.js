import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, getLoginPosts, getMoreLoginPosts } from "../../actions/post";
import PostItem from "./PostItem";

const Posts = ({
  isAuthenticated,
  getPosts,
  getLoginPosts,
  getMoreLoginPosts,
  post: { posts, loading, pagination },
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      getLoginPosts();
    } else {
      getPosts();
    }
  }, [getLoginPosts, getPosts, isAuthenticated]);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;

  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pages = [];

  for (let i = 1; i <= Math.ceil(posts.length / perPage); i++) {
    pages.push(i);
  }
  const pagesLength = pages.length;
  return (
    !loading && (
      <div className="page-slider">
        {currentPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}

        <ul>
          {pages.map((page) => {
            return (
              <li key={page} onClick={() => setCurrentPage(page)}>
                {page}
              </li>
            );
          })}

          {currentPage === pagesLength && (
            <button
              className="page-btn"
              onClick={() => {
                getMoreLoginPosts(pagination.current_page + 1);
              }}
            >
              More
            </button>
          )}
        </ul>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getLoginPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getMoreLoginPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getPosts,
  getLoginPosts,
  getMoreLoginPosts,
})(Posts);
