import React from "react";
import ReactQuill from 'react-quill'; 

const Editor = ({input, setInput}) => {
  return (
    <div>
      <ReactQuill
        style={{ display: "grid", margin: "20px 0" }}
        value={input}
        onChange={setInput}
      ></ReactQuill>
    </div>
  );
};

export default Editor;
