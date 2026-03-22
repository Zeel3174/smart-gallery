import React, { useState } from "react";
import axios from "axios";
import { Media } from "../types/Media";

type Props = {
  setMedia: React.Dispatch<React.SetStateAction<Media[]>>;
};

export default function Search({ setMedia }: Props) {
  const [query, setQuery] = useState("");

  const search = async () => {
    const res = await axios.get<Media[]>(
      `http://localhost:5000/api/media/search?q=${query}`
    );
    setMedia(res.data);
  };

  return (
    <div className="card">
      <h3>Search</h3>
      <input
        placeholder="Search (e.g. person, receipt, text...)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={search}>Search</button>
    </div>
  );
}