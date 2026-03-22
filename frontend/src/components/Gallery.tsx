import React from "react";
import { Media } from "../types/Media";

interface Props {
  media: Media[];
}

export default function Gallery({ media }: Props) {
  return (
    <div className="gallery">
      {media.map((item, index) => (
        <div key={index} className="card">
          <img
            src={`http://localhost:5000/${item.path}`}
            alt=""
            width="200"
          />

          <p><strong>Tags:</strong> {item.tags?.join(", ")}</p>
          <p><strong>Text:</strong> {item.text}</p>
          <p><strong>Faces:</strong> {item.faces?.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}