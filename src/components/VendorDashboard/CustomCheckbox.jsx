import React from "react";

export default function CustomCheckbox(props) {
  return (
    <div className="relative w-full">
      <input
        className="quick-filter-input size-4 min-w-4 accent-[#222222]"
        type="checkbox"
        name={props.name}
        id={props.name}
      />
      <label className="quick-filter-label" htmlFor={props.name}>
        <span>{props.name}</span>
      </label>
    </div>
  );
}
