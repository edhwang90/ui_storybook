import React from 'react';

import './Sandbox.scss';

export default {
  title: 'Sandbox',
  parameters: {
    info: { source: false, inline: true, propTables: false }
  }
};

export const Sandbox = () => (
  <section>
    <h1>Sandbox</h1>
    <div className="container vhc-parent">
      <div className="vhc-div">
        <p>hello</p>
        </div>
    </div>
    <div className="container vc-parent">
      <div className="vc-div">
        <p>hello v 2</p>
        </div>
    </div>
    <div className="container">
      <div className="hc-div">
        <p>h div</p>
        </div>
    </div>
  </section>
)