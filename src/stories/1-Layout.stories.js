import React from 'react';
import { withInfo } from '@storybook/addon-info';

import { CodeBlock } from '../components/CodeBlock';
import { Expandable } from '../components/Expandable';


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
  
{/* White space bug */}
<CodeBlock language="html">
{`
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
`}
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
    <div className="row">
      <div className="col">
        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
{/* White space bug */}
<CodeBlock language="html">
{`
<h4>Unordered list</h4>
<ul className="ul-list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
    ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit
    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
    occaecat cupidatat non proident, sunt in culpa qui officia
    deserunt mollit anim id est laborum.
  </li>
</ul>
`}
</CodeBlock>
          </Expandable>
        </div>
      </div>
    </div>
  </section>
)

export const ExpandAndCollapse = () => (
  <section className="sample-expand-collapse">
    <div className="row">
      <div className="col">
        <div className="form-group">
          <Expandable isExpanded={true}>
            <span className="label-container">
              <span className="expandable-icon"></span>
              <span>Expand Row 1</span>
            </span>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna
            </div>
          </Expandable>
          <Expandable maxHeight="300">
            <span className="label-container">
              <span className="expandable-icon"></span>
              <span>Expand Row 2</span>
            </span>
            <div>
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo
            </div>
          </Expandable>
          <Expandable>
            <span className="label-container">
              <span className="expandable-icon"></span>
              <span>Expand Row 3</span>
            </span>
            <div>
              Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </div>
          </Expandable>
        </div>
        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
{/* White space bug */}
<CodeBlock language="html">
{`
<Expandable isExpanded={true}>
  <span className="label-container">
    <span className="expandable-icon"></span>
    <span>Expand Row 1</span>
  </span>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna
  </div>
</Expandable>

<Expandable maxHeight="300">
  <span className="label-container">
    <span className="expandable-icon"></span>
    <span>Expand Row 2</span>
  </span>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna
  </div>
</Expandable>
`}
</CodeBlock>
          </Expandable>
        </div>
      </div>
    </div>
  </section>
)

export const Modals = () => (
  <section className="stories-modal">
    <h4>Simple Modal</h4>
    <div className="btn-group">
      <label className="btn is-primary" for="modal-1">Modal 1</label>
      <label className="btn is-alternate" for="modal-2">Modal 2</label>
    </div>

    <input className="modal-state" id="modal-1" type="checkbox" />
    <div className="modal">
    <label className="modal-bg" for="modal-1"></label>
      <div className="modal-inner">
        <p>
          Aliquam in sagittis nulla. Curabitur euismod diam eget risus venenatis, sed dictum lectus bibendum. Nunc nunc nisi, 
          hendrerit eget nisi id, rhoncus rutrum velit. Nunc vel mauris dolor. Class aptent taciti sociosqu ad litora torquent 
          per conubia nostra, per inceptos himenaeos. Aliquam fringilla quis nisi eget imperdiet.
        </p>
      </div>
    </div>

    <input className="modal-state" id="modal-2" type="checkbox" />
    <div className="modal">
    <label className="modal-bg" for="modal-2"></label>
      <div className="modal-inner">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
        </p>
       </div>
    </div>

    <h4>HREF based Modal</h4>
    <div className="btn-group">
      <a className="btn is-primary" href="#Modal1Open">HREF Modal 1</a>
      <a className="btn is-alternate" href="#Modal2Open">HREF Modal 2</a>
    </div>

    <div id="Modal1Open" className="modal">
      <div className="modal-inner">
        <p>
          Aliquam in sagittis nulla. Curabitur euismod diam eget risus venenatis, sed dictum lectus bibendum. Nunc nunc nisi, 
          hendrerit eget nisi id, rhoncus rutrum velit. Nunc vel mauris dolor. Class aptent taciti sociosqu ad litora torquent 
          per conubia nostra, per inceptos himenaeos. Aliquam fringilla quis nisi eget imperdiet.
        </p>

        <a href="#ModalClose" title="Close" className="btn is-primary modal-close">Close</a>
      </div>
    </div>

    <div id="Modal2Open" className="modal">
      <div className="modal-inner">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
        </p>

        <a href="#ModalClose" title="Close" className="btn is-primary modal-close">Close</a>
      </div>
    </div>

    
  </section>
)