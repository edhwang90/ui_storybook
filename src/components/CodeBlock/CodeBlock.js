import React, { useEffect, memo } from 'react';
import Prism from 'prismjs';

import './CodeBlock.scss';

export const CodeBlockUI = (props) => {
  const { children, language } = props;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className={`language-${language}`}>
        { children }
      </code>
    </pre>
  )
}

export const CodeBlock = memo(CodeBlockUI);