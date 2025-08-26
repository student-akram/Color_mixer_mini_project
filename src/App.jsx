import { useState } from "react";
import "./App.css";

// Helper function: convert RGB → HEX
const rgbToHex = (r, g, b) => {
  const toHex = (c) => c.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Helper function: convert RGB → HSL
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l;

  l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

function App() {
  const storedColor = JSON.parse(localStorage.getItem("color") || "{}");
  const [pending, setPending] = useState(false);
  const [r, setR] = useState(storedColor.r ?? 120);
  const [g, setG] = useState(storedColor.g ?? 120);
  const [b, setB] = useState(storedColor.b ?? 120);

  const save = async () => {
    setPending(true);
    await new Promise((res) => setTimeout(res, 2000));
    localStorage.setItem("color", JSON.stringify({ r, g, b }));
    setPending(false);
  };

  const hex = rgbToHex(Number(r), Number(g), Number(b));
  const { h, s, l } = rgbToHsl(Number(r), Number(g), Number(b));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f4f6f8",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Color Preview */}
        <div
          style={{
            backgroundColor: `rgb(${r},${g},${b})`,
            height: 150,
            borderRadius: "12px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
          }}
        ></div>

        {/* Values */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p><b>RGB:</b> ({r}, {g}, {b})</p>
          <p><b>HEX:</b> {hex}</p>
          <p><b>HSL:</b> ({h}°, {s}%, {l}%)</p>
        </div>

        {/* Sliders */}
        <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
          <label>Red</label>
          <input
            type="range"
            value={r}
            min={0}
            max={255}
            onChange={(e) => setR(Number(e.target.value))}
            style={{ width: "100%" }}
          />
          <br />
          <label>Green</label>
          <input
            type="range"
            value={g}
            min={0}
            max={255}
            onChange={(e) => setG(Number(e.target.value))}
            style={{ width: "100%" }}
          />
          <br />
          <label>Blue</label>
          <input
            type="range"
            value={b}
            min={0}
            max={255}
            onChange={(e) => setB(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        <button
          disabled={pending}
          onClick={save}
          style={{
            padding: "0.6rem 1.2rem",
            border: "none",
            borderRadius: "8px",
            background: pending ? "#aaa" : "#007BFF",
            color: "white",
            fontSize: "1rem",
            cursor: pending ? "not-allowed" : "pointer",
            transition: "background 0.3s",
          }}
        >
          {pending ? "Saving..." : "Save Color"}
        </button>
      </div>
    </div>
  );
}

export default App;
