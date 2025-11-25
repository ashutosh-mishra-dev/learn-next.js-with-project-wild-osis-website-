"use client";

import { useState } from "react";
import Logo from "./Logo";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <>
      <span>
        {displayText}{" "}
        <button
          className="text-primary-700 border-b border-primary-700 leading-3 pb-1 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Show less" : "Show more"}
        </button>
      </span>
      {/* yha Logo component as client instance work karega aur jo header me Logo component aa rha h wo server instance h  */}
      <Logo />
    </>
  );
}

export default TextExpander;
