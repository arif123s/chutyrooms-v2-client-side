
import React, { useState } from 'react';

const ContentEditable = (props) => {
    const [content, setContent] = useState('<p>Start typing here...</p>');
  
    const handleContentChange = (event) => {
      setContent(event.target.innerHTML);
    };
  
    return (
      <div
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={handleContentChange}
        // style={{ padding: '5px', minHeight: '10px' }}
        className={props.className}
      />
    );
  };

export default ContentEditable;