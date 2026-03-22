import React, { useState } from "react";
import Upload from "./components/upload";
import Search from "./components/search";
import Gallery from "./components/Gallery";
import { Media } from "./types/Media";

function App() {
  const [media, setMedia] = useState<Media[]>([]);

  return (
    <div className="container">
      <h1>🧠 Smart Gallery AI</h1>

      <Upload setMedia={setMedia} />
      <Search setMedia={setMedia} />
      <Gallery media={media} />
    </div>
  );
}

export default App;