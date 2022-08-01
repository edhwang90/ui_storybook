import React, {  useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './DialogueBox.scss';

export const useDialogueBox = (props) => {
  const { isVisible } = props;

  const [alertVisible, setAlertVisible] = useState(isVisible);

  useEffect(() => {
    setAlertVisible(isVisible);
  }, [isVisible])

  const closeDialogue = () => {
    setAlertVisible(false);
  }

  return {
    closeDialogue,
    alertVisible
  }
}

export const DialogueBox = (props) => {
  const { title, message, children } = props;

  const { closeDialogue, alertVisible } = useDialogueBox(props);

  return (
    <React.Fragment>
      {
        alertVisible 
        ?
          (
            <div className="dialogue-overlay">
              <div className="dialogue-container">
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
                    : 
                      (
                        <React.Fragment>
                          <button className="btn"
                                  onClick={closeDialogue}>OK</button>
                        </React.Fragment>
                      )
                  }
                </div>
              </div>
            </div>
          )
        : ''
      }
      </React.Fragment>
  )
}

DialogueBox.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.node,
  isVisible: PropTypes.bool
  
}

DialogueBox.defaultProps = {
  isVisible: true
}