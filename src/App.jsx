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
    h = s = 0; // achromatic
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
  // Safe initialization of localStorage data
  const storedColor = JSON.parse(localStorage.getItem("color") || "{}");
  const [pending, setPending] = useState(false);
  const [r, setR] = useState(storedColor.r ?? 0);
  const [g, setG] = useState(storedColor.g ?? 0);
  const [b, setB] = useState(storedColor.b ?? 0);

  const save = async () => {
    setPending(true); // disable button
    await new Promise((res) => setTimeout(res, 2000)); // wait 2 seconds
    localStorage.setItem("color", JSON.stringify({ r, g, b }));
    setPending(false); // re-enable button
  };

  const hex = rgbToHex(Number(r), Number(g), Number(b));
  const { h, s, l } = rgbToHsl(Number(r), Number(g), Number(b));

  return (
    <>
      <div
        style={{
          backgroundColor: `rgb(${r},${g},${b})`,
          height: 170,
          width: 200,
          border: "2px solid #333",
          borderRadius: "10px",
          marginBottom: "1rem",
        }}
      ></div>

      {/* Color values */}
      <div style={{ marginBottom: "1rem" }}>
        <p>
          <b>RGB:</b> ({r}, {g}, {b})
        </p>
        <p>
          <b>HEX:</b> {hex}
        </p>
        <p>
          <b>HSL:</b> ({h}°, {s}%, {l}%)
        </p>
      </div>

      {/* Sliders */}
      <div>
        <label>Red</label>
        <input
          type="range"
          value={r}
          min={0}
          max={255}
          onChange={(event) => setR(Number(event.target.value))}
        />
        <br />
        <br />

        <label>Green</label>
        <input
          type="range"
          value={g}
          min={0}
          max={255}
          onChange={(event) => setG(Number(event.target.value))}
        />
        <br />
        <br />

        <label>Blue</label>
        <input
          type="range"
          value={b}
          min={0}
          max={255}
          onChange={(event) => setB(Number(event.target.value))}
        />
        <br />
        <br />

        <button disabled={pending} onClick={save}>
          {pending ? "Saving..." : "Save Color"}
        </button>
      </div>
    </>
  );
}

export default App;
