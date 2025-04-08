import React from 'react'
import PropTypes from 'prop-types'
import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const {item} = state;
  return (
    <>
      <button onClick={() => navigate(-1)}>Go back</button>
      {item.media_type.includes('video') ? (
        <video src={item.filename} controls />
      ) : (
        <img src={item.filename} alt={item.title} />
      )}
      <h3>Title: {item.title}</h3>
      <p>{item.description}</p>
    </>
  );
};

export default Single
