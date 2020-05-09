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