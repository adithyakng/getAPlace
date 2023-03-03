import React from "react";
import Trix from "trix";

document.addEventListener("trix-before-initialize", () => {
  // Change Trix.config if you need
});

const CustomEditor = ({ editorId, value, uniqueId, setValue }) => {
  return (
    <>
      <input
        id={editorId + uniqueId}
        name={editorId + uniqueId}
        type="hidden"
        value={value[editorId]}
      />
      <trix-editor input={editorId + uniqueId}>{value[editorId]}</trix-editor>
    </>
  );
};

export default CustomEditor;
