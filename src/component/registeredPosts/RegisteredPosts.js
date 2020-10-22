import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRegisteredPosts, getMoreRegisteredPosts } from "../../actions/post";
import RegisteredPostsItem from "./RegisteredPostsItem";

const RegisteredPosts = ({
  getRegisteredPosts,
  getMoreRegisteredPosts,
  post: { posts, loading, pagination },
}) => {
  useEffect(() => {
    getRegisteredPosts();
  }, [getRegisteredPosts]);

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
      <main>
        <div className="posts-container">
          <div className="posts-list">
            <div className="page-slider">
              {currentPosts.map((post) => (
                <RegisteredPostsItem key={post.id} post={post} />
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
                      getMoreRegisteredPosts(pagination.current_page + 1);
                    }}
                  >
                    More
                  </button>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

RegisteredPosts.propTypes = {
  getRegisteredPosts: PropTypes.func.isRequired,
  getMoreRegisteredPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  getRegisteredPosts,
  getMoreRegisteredPosts,
})(RegisteredPosts);
