import React from 'react';
import { withInfo } from '@storybook/addon-info';


export default {
  title: 'Welcome',
  decorators: [withInfo],
  parameters: {
    info: { source: false, inline: true, propTables: false }
  }
};

export const Information = () => (
  <div>
    <p>This Storybook was built with React (create-react-app) and tested with Jest & Enzyme.</p>
    <p>Please note that this is an ongoing effort...</p>
    <p>
      <a href="https://github.com/edhwang90/ui_storybook" 
         target="_blank" 
         rel='noopener noreferrer' 
         className="link inline">Click here</a> for the GitHub repository.
    </p>
  </div>
)