import React from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { CodeBlock } from '../components/CodeBlock';


export default {
  title: 'Layout',
  decorators: [withInfo],
  parameters: {
    info: { source: false, inline: true, propTables: false }
  }
};

export const Grid = () => (
  <section className="sample-grid">
    <div className="row">
      <div className="col">1</div>
      <div className="col">2</div>
    </div>
    <div className="row">
      <div className="col">1</div>
      <div className="col">2</div>
      <div className="col">3</div>
    </div>
    <div className="row">
      <div className="col">1</div>
      <div className="col">2</div>
      <div className="col">3</div>
      <div className="col">4</div>
    </div>
    <div className="row">
      <div className="col">1</div>
      <div className="col">2</div>
      <div className="col">3</div>
      <div className="col">4</div>
      <div className="col">5</div>
    </div>
    <div className="row">
      <div className="col col-min">min</div>
      <div className="col">2</div>
      <div className="col">3</div>
    </div>

<CodeBlock language="html">
  {
  `
  <div className="row">
    <div className="col">1</div>
    <div className="col">2</div>
  </div>
  <div className="row">
    <div className="col">1</div>
    <div className="col">2</div>
    <div className="col">3</div>
  </div>
  <div className="row">
    <div className="col">1</div>
    <div className="col">2</div>
    <div className="col">3</div>
    <div className="col">4</div>
  </div>
  <div className="row">
    <div className="col">1</div>
    <div className="col">2</div>
    <div className="col">3</div>
    <div className="col">4</div>
    <div className="col">5</div>
  </div>
  <div className="row">
    <div className="col col-min">initial</div>
    <div className="col">2</div>
    <div className="col">3</div>
  </div>
  `
  }
</CodeBlock>
  </section>
)

export const Lists = () => (
  <section className="sample-lists">
    <div className="row">
      <div className="col">
        <h4>Unordered list</h4>
        <ul className="ul-list">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>
            Item 3
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </li>
        </ul>
      </div>
    </div>
  </section>
)