import React from "react";
import { GreenCheckmark } from "../svgs/GreenCheckmark";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  td: string;
  td1: string;
  td2: string;
}

function GreenTableRow({ td, td1, td2 }: IProps) {
  return (
    <tr className="border-2">
      <td className="px-12 py-4 border-2">{td}</td>
      <td className="px-12 py-4 border-2">
        <GreenCheckmark
          className="w-10 h-10 mx-auto"
          scale={1.25}
        ></GreenCheckmark>
      </td>
      <td className="px-12 py-4 border-2">
        <GreenCheckmark
          className={`w-10 h-10 mx-auto ${td1 == "true" ? "block" : "hidden"}`}
          scale={1.25}
        ></GreenCheckmark>
      </td>
      <td className="px-12 py-4 border-2">
        <GreenCheckmark
          className={`w-10 h-10 mx-auto ${td2 == "true" ? "block" : "hidden"}`}
          scale={1.25}
        ></GreenCheckmark>
      </td>
    </tr>
  );
}

export default GreenTableRow;
