import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState(null);

  // ✅ Upload Image
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/media/upload", formData);
      alert("Uploaded Successfully!");
      setPreview(null);
      setFile(null);
      handleSearch(); // refresh gallery
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // ✅ Load / Search Images
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/media/search?q=${query}`
      );
      setImages(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load images");
    }
  };

  // ✅ Delete Image
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/media/delete/${id}`);
      handleSearch(); // refresh
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📸 Smart Gallery</h1>

      {/* 🔍 Search */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button style={styles.searchBtn} onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* 📤 Upload */}
      <div style={styles.card}>
        <input
          type="file"
          onChange={(e) => {
            const selected = e.target.files[0];
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
          }}
          style={styles.input}
        />

        <button style={styles.uploadBtn} onClick={handleUpload}>
          Upload Image
        </button>

        <button style={styles.loadBtn} onClick={handleSearch}>
          Load Gallery
        </button>

        {/* 👀 Preview */}
        {preview && (
          <div>
            <p>Preview:</p>
            <img src={preview} style={styles.preview} />
          </div>
        )}
      </div>

      {/* 🖼️ Gallery */}
      <div style={styles.gallery}>
        {images.length === 0 ? (
          <p>No images found</p>
        ) : (
          images.map((img) => (
            <div key={img._id} style={styles.cardImg}>
              <img
                src={`http://localhost:5000/uploads/${img.filename}`}
                style={styles.image}
                onMouseOver={(e) =>
                  (e.target.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.target.style.transform = "scale(1)")
                }
              />
              <button
                onClick={() => handleDelete(img._id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    minHeight: "100vh",
    padding: "20px",
    color: "#f1f5f9",
    textAlign: "center",
    fontFamily: "Segoe UI",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    display: "inline-block",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
  },
  input: {
    marginBottom: "15px",
    color: "#fff",
  },
  uploadBtn: {
    backgroundColor: "#22c55e",
    color: "white",
    padding: "10px 20px",
    margin: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  loadBtn: {
    backgroundColor: "#6366f1",
    color: "white",
    padding: "10px 20px",
    margin: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  searchBtn: {
    backgroundColor: "#38bdf8",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  searchInput: {
    padding: "10px",
    borderRadius: "8px",
    width: "250px",
    marginRight: "10px",
    border: "none",
  },
  gallery: {
    marginTop: "30px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  image: {
    width: "200px",
    margin: "10px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
    transition: "0.3s",
    cursor: "pointer",
  },
  preview: {
    width: "200px",
    marginTop: "10px",
    borderRadius: "10px",
  },
  cardImg: {
    margin: "15px",
    textAlign: "center",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "5px",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);