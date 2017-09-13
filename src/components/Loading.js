import React from 'react';

export const Loading = ({ title }) => (<div><span className="loading-img"></span> <span className="loading-text">{title}</span></div>);

Loading.defaultProps = {
    title: "Loading..."
};