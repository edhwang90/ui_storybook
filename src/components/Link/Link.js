import React from 'react';
import PropTypes from 'prop-types';

import './Link.scss';

export const  Link = (props) => {

  const { route, children, title, isNewTab } = props;

  const anchorProps = 
    isNewTab 
    ? {
        rel: 'noopener noreferrer',
        target: '_blank'
      }
    :
      {}
  ;


  return (
    <a className="link" href={route} title={title} {...anchorProps}>{children}</a>
  )
}

Link.propTypes = {
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}