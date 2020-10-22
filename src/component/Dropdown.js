import React, { useEffect, useState, useRef } from "react";
import { selectWebinar } from "../actions/form";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Dropdown = ({ selectWebinar, post: { posts }, selectedTitle }) => {
  const box = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleChange = (title, id) => {
    selectWebinar(title, id);
    setOpen(false);
  };

  const handleClick = (e) => {
    if (!box.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div ref={box} className="dropdown">
      <div className="dropToggle" onClick={(e) => setOpen(!open)}>
        {selectedTitle || posts[0]?.title}
      </div>

      {open && (
        <ul className="dropMenu">
          {posts
            .filter((opt) => opt.favourited === false)
            .map((opt) => (
              <li
                className="dropItem"
                key={opt.id}
                onClick={(e) => handleChange(opt.title, opt.id)}
              >
                {opt.title}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  selectWebinar: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { selectWebinar })(Dropdown);
