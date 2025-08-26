import { useState } from "react";
import "./App.css";

// RGB → HEX
const rgbToHex = (r, g, b) =>
  `#${[r, g, b]
    .map((x) => Number(x).toString(16).padStart(2, "0"))
    .join("")}`;

// RGB → HSL
const rgbToHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
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
  const stored = JSON.parse(localStorage.getItem("color") || "{}");
  const [pending, setPending] = useState(false);
  const [r, setR] = useState(stored.r ?? 120);
  const [g, setG] = useState(stored.g ?? 120);
  const [b, setB] = useState(stored.b ?? 120);

  const save = async () => {
    setPending(true);
    await new Promise((res) => setTimeout(res, 1200));
    localStorage.setItem("color", JSON.stringify({ r, g, b }));
    setPending(false);
  };

  const hex = rgbToHex(r, g, b);
  const { h, s, l } = rgbToHsl(r, g, b);

  return (
    <div className="app">
      <div className="color-card">
        {/* Preview Block */}
        <div className="preview" style={{ backgroundColor: `rgb(${r},${g},${b})` }} />

        {/* Color Codes */}
        <div className="codes">
          <span><b>RGB:</b> {r}, {g}, {b}</span>
          <span><b>HEX:</b> {hex}</span>
          <span><b>HSL:</b> {h}°, {s}%, {l}%</span>
        </div>

        {/* Sliders */}
        <div className="sliders">
          <label>Red</label>
          <input type="range" value={r} min={0} max={255} onChange={(e) => setR(+e.target.value)} className="red" />
          <label>Green</label>
          <input type="range" value={g} min={0} max={255} onChange={(e) => setG(+e.target.value)} className="green" />
          <label>Blue</label>
          <input type="range" value={b} min={0} max={255} onChange={(e) => setB(+e.target.value)} className="blue" />
        </div>

        <button disabled={pending} onClick={save}>
          {pending ? "Saving..." : "Save Color"}
        </button>
      </div>
    </div>
  );
}

export default App;
