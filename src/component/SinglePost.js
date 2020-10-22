import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { getSinglePost } from "../actions/post";

const SinglePost = ({ match, getSinglePost, post: { post, loading } }) => {
  useEffect(() => {
    getSinglePost(match.params.id);
  }, [getSinglePost, match.params.id]);
  return (
    !loading && (
      <main>
        <div className="detail-container">
          <div className="detail-wrapper">
            <div className="detail-title">{post.title}</div>

            <div className="detail-topic">
              Related Currency:
              {post.symbols.map((topic) => (
                <span>{topic},</span>
              ))}
            </div>

            <div className="detail-starttime">
              Starts at{" "}
              <Moment
                className="start-time"
                format="YYYY/MM/DD hh:mm"
                add={{ days: 10 }}
              >
                {post.created_at}
              </Moment>
              <span>By {post.creator.username}</span>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="detail-content"
            ></div>

            <div className="view_count">
              This post has been viewed {post.view_count} times.
            </div>
          </div>
        </div>
      </main>
    )
  );
};

SinglePost.propTypes = {
  getSinglePost: PropTypes.func.isRequired,

  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getSinglePost })(SinglePost);
