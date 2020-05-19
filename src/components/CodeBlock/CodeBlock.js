import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';

import './CodeBlock.scss';

export const CodeBlock = memo((props) => {
  const { children, language } = props;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className={`language-${language}`}>
        { children.trim() }
      </code>
    </pre>
  )
})

CodeBlock.propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.string.isRequired
}
