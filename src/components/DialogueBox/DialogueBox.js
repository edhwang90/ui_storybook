import React from 'react';
import PropTypes from 'prop-types';

import './DialogueBox.scss';

export const DialogueBox = (props) => {
  const { title, message, isVisible, children } = props;

  return (
    <React.Fragment>
      {
        isVisible 
        ?
          (<div className="dialogue-container">
            <div className="dialogue-title">
              { title }
            </div>
           <div className="dialogue-message">
              { message }
            </div>
          <div className="dialogue-actions">
            {
              children
              ? children
              : (<React.Fragment>
                  <button className="btn">Confirm</button>
                </React.Fragment>)
            }
          </div>
        </div>)
        : ''
      }
      </React.Fragment>
  )
}

DialogueBox.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  isCancelConfirm: PropTypes.bool
}

DialogueBox.defaultProps = {
  isVisible: true,
  isCancelConfirm: false
}