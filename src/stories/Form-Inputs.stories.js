import React from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { CodeBlock } from '../components/CodeBlock';

import './stories.scss';

export default {
  title: 'Inputs',
  decorators: [withInfo],
  parameters: {
    info: { source: false, inline: true, propTables: false } //propTables: [Checkbox]
  }
};

export const Inputs = () => (
  <div className="story-inputs">
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label className="form-label">Text</label>
          <input onChange={action('change')}
                 className="form-input"
                 type="text" 
                 placeholder="Username">
          </input>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input onChange={action('change')}
                  className="form-input" 
                  type="password" 
                  placeholder="Password">
          </input>
        </div>

        <div className="form-group">
          <label className="form-label">Disabled</label>
          <input onChange={action('change')}
                 disabled
                 className="form-input" 
                 placeholder="Disabled">
          </input>
        </div>
        
      </div>
      <div className="col">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input onChange={action('change')}
                  className="form-input" 
                  type="email" 
                  placeholder="Email">
          </input>
        </div>

        <div className="form-group">
          <label className="form-label">Textarea</label>
          <textarea onChange={action('change')}
                    className="form-input" 
                    placeholder="Bio...">
          </textarea>
        </div>
      </div>
    </div>
<CodeBlock language="html">
  {
  `
  <div className="form-group">
    <label className="form-label">Text</label>
    <input onChange={fn}
           className="form-input"
           type="text" 
           placeholder="Username">
    </input>
  </div>

  <div className="form-group">
    <label className="form-label">Password</label>
    <input onChange={fn}
           className="form-input" 
           type="password" 
           placeholder="Password">
    </input>
  </div>

  <div className="form-group">
    <label className="form-label">Disabled</label>
    <input onChange={fn}
           disabled
           className="form-input" 
           placeholder="Disabled">
    </input>
  </div>

  <div className="form-group">
    <label className="form-label">Email</label>
    <input onChange={fn}
           className="form-input" 
           type="email" 
           placeholder="Email">
    </input>
  </div>

  <div className="form-group">
    <label className="form-label">Textarea</label>
    <textarea onChange={fn}
              className="form-input" 
              placeholder="Bio...">
    </textarea>
  </div>
  `
  }
</CodeBlock>
  </div>
)

export const InputGroups = () => (
  <div>
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label className="form-label">Prepend Input</label>
          <div className="input-container">
            <span className="form-input-prepend">💯</span>
            <input onChange={action('change')}
                  className="form-input" 
                  type="text" 
                  placeholder="Twitter">
            </input>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Prepend Textarea</label>
          <div className="input-container">
            <span className="form-input-prepend">👍</span>
            <textarea onChange={action('change')} 
                      className="form-input" 
                      placeholder="Type here...">
            </textarea>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label className="form-label">Append</label>
          <div className="input-container">
            <input onChange={action('change')}
                  className="form-input" 
                  type="text" 
                  placeholder="Twitter">
            </input>
            <span className="form-input-append">😀</span>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Append Button</label>
          <div className="input-container">
            <input onChange={action('change')}
                  className="form-input" 
                  type="text" 
                  placeholder="Username">
            </input>
            <button onClick={action('click')} 
                    className="btn is-primary form-input-append"
                    type="button">
                    Click!
            </button>
          </div>
        </div>
      </div>
    </div>
<CodeBlock language="html">
  {
  `
  <div className="form-group">
    <label className="form-label">Prepend Input</label>
    <div className="input-container">
      <span className="form-input-prepend">💯</span>
      <input onChange={fn}
             className="form-input" 
             type="text" 
             placeholder="Twitter">
      </input>
    </div>
  </div>
  <div className="form-group">
    <label className="form-label">Prepend Textarea</label>
    <div className="input-container">
      <span className="form-input-prepend">👍</span>
      <textarea onChange={fn} 
                className="form-input" 
                placeholder="Type here...">
      </textarea>
    </div>
  </div>
  <div className="form-group">
    <label className="form-label">Append</label>
    <div className="input-container">
      <input onChange={fn}
             className="form-input" 
             type="text" 
             placeholder="Twitter">
      </input>
      <span className="form-input-append">😀</span>
    </div>
  </div>

  <div className="form-group">
    <label className="form-label">Append Button</label>
    <div className="input-container">
      <input onChange={fn}
             className="form-input" 
             type="text" 
             placeholder="Username">
      </input>
      <button onClick={fn} 
              className="btn is-primary form-input-append"
              type="button">
              Click!
      </button>
    </div>
  </div>
  `
  }
</CodeBlock>
  </div>
)