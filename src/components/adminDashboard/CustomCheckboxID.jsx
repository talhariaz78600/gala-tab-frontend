import React from "react";

export default function CustomCheckboxID(props) {
  return (
    <div className="relative w-full">
      <input
        className="quick-filter-input size-4 min-w-4 accent-[#222222]"
        type="checkbox"
        name={props.name}
        id={props.id}
      />
      <label className="quick-filter-label" htmlFor={props.id}>
        <span>{props.content}</span>
      </label>
    </div>
  );
}
