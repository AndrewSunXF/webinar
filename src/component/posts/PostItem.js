import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import post_btn from "../../img/post_btn.png";
import { Link } from "react-router-dom";
import { selectWebinar } from "../../actions/form";
import { useHistory } from "react-router-dom";

const PostItem = ({
  isAuthenticated,
  selectWebinar,
  post: { id, created_at, title, content },
}) => {
  const history = useHistory();

  const handleClick = () => {
    if (isAuthenticated) {
      const scrollToElement = document.getElementById("scrollTarget");
      scrollToElement.scrollIntoView();
      selectWebinar(title, id);
    } else {
      history.push(`/login`);
    }
  };

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

      <div className="register" onClick={handleClick}>
        <div className="register-now">Register Now</div>
        <img src={post_btn} alt="register-webinar" />
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  selectWebinar: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { selectWebinar })(PostItem);
