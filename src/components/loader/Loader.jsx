import React from "react";

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  );
};

export default Loader;
