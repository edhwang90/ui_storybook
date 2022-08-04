
import React from "react";

import './Wizard.scss';

const WizardContext = React.createContext();

export const Wizard = ({ children, steps }) => {
  const [activePageIndex, setActivePageIndex] = React.useState(0);

  const goNextPage = () => {
    setActivePageIndex((index) => index + 1);
  };

  const goPrevPage = () => {
    setActivePageIndex((index) => index - 1);
  };

  const context = {
    activePageIndex,
    goNextPage,
    goPrevPage,
    steps
  };

  return (
    <WizardContext.Provider value={context}>
      <div className="wizard">{children}</div>
    </WizardContext.Provider>
  );
};

export const WizardPages = (props) => {
  const { activePageIndex, children } = React.useContext(WizardContext);
  const pages = React.Children.toArray(children);
  const currentPage = pages[activePageIndex];
  
  return <div {...props}>{currentPage}</div>;
};


export const WizardButtonPrev = (props) => {
  const { goPrevPage, activePageIndex } = React.useContext(WizardContext);
  
  return activePageIndex > 0 ? (
    <button type="button" 
            className="btn is-clear btn-previous"
            {...props} 
            onClick={goPrevPage}>
      Previous
    </button>
  ) : null;
};

export const WizardButtonNext = (props) => {
  const { goNextPage, activePageIndex, steps } = React.useContext(WizardContext);
  
  return activePageIndex < steps - 1 ? (
    <button type="button" 
            className="btn is-primary btn-next"
            {...props} 
            onClick={goNextPage}>
      Next
    </button>
  ) : null;
};


Wizard.ButtonNext = WizardButtonNext;
Wizard.ButtonPrev = WizardButtonPrev;
Wizard.Pages = WizardPages;

export default Wizard;