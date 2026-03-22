import React, { useState } from "react";
import axios from "axios";
import { Media } from "../types/Media"; 

interface Props {
  setMedia: React.Dispatch<React.SetStateAction<Media[]>>;
}

export default function Upload({ setMedia }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);


    const res = await axios.post<Media>(
      "http://localhost:5000/api/media/upload",
      formData
    );

  
    setMedia((prev) => [res.data, ...prev]);
  };

  return (
    <div className="card">
      <h3>Upload Image</h3>

      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}