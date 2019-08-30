import { ChevronDown24, ChevronRight24 } from "@carbon/icons-react";
import useToggle from "@rooks/use-toggle";
import React from "react";

export default function LotShowPanel({ title, children, isOpen = false }) {
  const [show, toggleShow] = useToggle(isOpen);

  return (
    <>
      <h2 className="eco--panel" onClick={toggleShow}>
        {show ? <ChevronDown24 /> : <ChevronRight24 />} {title}
      </h2>
      {show && children}
    </>
  );
}
