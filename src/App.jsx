import { useState } from "react";
import './App.css';

function App() {
  // Safe initialization of localStorage data
  const storedColor = JSON.parse(localStorage.getItem('color') || '{}');
  const [pending, setPending] = useState(false);
  const [r, setR] = useState(storedColor.r ?? 0);
  const [g, setG] = useState(storedColor.g ?? 0);
  const [b, setB] = useState(storedColor.b ?? 0);

  const save = async () => {
    setPending(true); // disable button
    await new Promise(res => setTimeout(res, 2000)); // wait 2 seconds
    localStorage.setItem('color', JSON.stringify({ r, g, b }));
    setPending(false); // re-enable button
  };

  return (
    <>
      <div style={{ backgroundColor: `rgb(${r},${g},${b})`, height: 170, width: 200 }}></div>
      <div>
        <label>Red</label>
        <input
          type="range"
          value={r}
          min={0}
          max={255}
          onChange={(event) => setR(event.target.value)}
        />
        <br /><br />
        <label>Green</label>
        <input
          type="range"
          value={g}
          min={0}
          max={255}
          onChange={(event) => setG(event.target.value)}
        />
        <br /><br />
        <label>Blue</label>
        <input
          type="range"
          value={b}
          min={0}
          max={255}
          onChange={(event) => setB(event.target.value)}
        />
        <br /><br />
        <button disabled={pending} onClick={save}>
          {pending ? "Saving..." : "Save Color"}
        </button>
      </div>
    </>
  );
}

export default App;
