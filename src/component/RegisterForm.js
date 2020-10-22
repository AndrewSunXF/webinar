import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerPost, getLoginPosts } from "../actions/post";
import Dropdown from "./Dropdown";

const RegisterForm = ({
  form: { selectedTitle, selectedId },
  registerPost,
  getLoginPosts,
  alerts,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { firstName, lastName, email } = formData;

  const [FnErrMsg, setFnErrMsg] = useState("");
  const [LnErrMsg, setLnErrMsg] = useState("");
  const [EmErrMsg, setEmErrMsg] = useState("");
  const isEnabled =
    firstName.length > 0 && lastName.length > 0 && email.length > 0;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    let err = "";

    if (!e.target.value) {
      switch (e.target.name) {
        case "firstName":
          err = <span className="errSpan">Firstname can not be empty</span>;
          setFnErrMsg(err);
          break;
        case "lastName":
          err = <span className="errSpan">Lastname can not be empty</span>;
          setLnErrMsg(err);
          break;
        case "email":
          err = <span className="errSpan">Email can not be empty</span>;
          setEmErrMsg(err);
          break;
        default:
          break;
      }
    } else {
      setFnErrMsg("");
      setLnErrMsg("");
      setEmErrMsg("");
    }
  };

  const registerData = {
    ...formData,
    ids: [selectedId],
    model: "post",
  };

  const onSubmit = async (e) => {
    if (isEnabled) {
      e.preventDefault();
      await registerPost(registerData);
      window.scrollTo(0, 0);
      await getLoginPosts();
      window.location.reload(false);
    }
  };

  return (
    <div id="scrollTarget">
      <div className="form-wrapper">
        <div className="form-header">
          <div className="form-title">Register for a Webinar now</div>
          <div className="form-intro">
            Please fill in the form below and you will be contacted by one of
            our professional business experts.
          </div>
        </div>

        <div className="form-container">
          <div>
            <form onSubmit={(e) => onSubmit(e)} className="form-body">
              <div className="form-element">
                <label>Topic</label>
                <Dropdown selectedTitle={selectedTitle} />
              </div>

              <div className="form-element">
                <label htmlFor="firstName">First Name*</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => onChange(e)}
                />
                {FnErrMsg}
              </div>

              <div className="form-element">
                <label htmlFor="lastName">Last Name*</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => onChange(e)}
                />
                {LnErrMsg}
              </div>

              <div className="form-element">
                <label htmlFor="email">Email*</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
                {EmErrMsg}
              </div>

              <button
                disabled={!isEnabled}
                type="submit"
                className="register-btn"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterForm.propTypes = {
  registerPost: PropTypes.func.isRequired,
  getLoginPosts: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  form: state.form,
  alerts: state.alert,
});

export default connect(mapStateToProps, { registerPost, getLoginPosts })(
  RegisterForm
);
