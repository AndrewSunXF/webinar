import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import post_btn from "../../img/post_btn.png";
import { Link } from "react-router-dom";
import { postUnregister, getRegisteredPosts } from "../../actions/post";

const RegisteredPostsItem = ({
  postUnregister,
  getRegisteredPosts,
  post: { id, created_at, title, content, favourited },
}) => {
  return (
    <div className="postItem">
      <div className="posted-date">
        <Moment format="DD/MM/YYYY">{created_at}</Moment>
      </div>

      <div className="title">
        <Link to={`/webinar/${id}`} target="blank">
          {title}
        </Link>
      </div>

      <div className="content">
        <Link
          to={`/webinar/${id}`}
          target="blank"
          dangerouslySetInnerHTML={{ __html: content }}
        ></Link>
      </div>

      <div className="time">
        <Moment
          className="start-time"
          format="YYYY/MM/DD hh:mm"
          add={{ days: 10 }}
        >
          {created_at}
        </Moment>
        Sydney Time
      </div>

      <div
        className="register"
        onClick={async (e) => {
          await postUnregister(id);
          window.scrollTo(0, 0);
          await getRegisteredPosts();
          window.location.reload(false);
        }}
      >
        <div className="register-now">Unregister</div>
        <img src={post_btn} alt="register-webinar" />
      </div>
    </div>
  );
};

RegisteredPostsItem.propTypes = {
  post: PropTypes.object.isRequired,
  postUnregister: PropTypes.func.isRequired,
  getRegisteredPosts: PropTypes.func.isRequired,
};

export default connect(null, { postUnregister, getRegisteredPosts })(
  RegisteredPostsItem
);
