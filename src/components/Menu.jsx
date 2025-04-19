import React from "react";

const Menu = ({ position, setPosition, scale, setScale, resetSettings }) => {
  const handlePositionChange = (axis) => (event) => {
    const value = parseFloat(event.target.value);
    setPosition((prev) => ({ ...prev, [axis]: value }));
  };

  const handleScaleChange = (event) => {
    const value = parseFloat(event.target.value);
    setScale(value);
  };

  return (
    <div style={{ position: "absolute", top: 510, left: 10, background: "white", padding: "15px", borderRadius: "5px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)", zIndex: 10 }}>
      <h3>Logo Settings</h3>
      {/* Posición del logo */}
      X:
      <input
        type="range"
        min="-1"
        max="1"
        step="0.01"
        value={position.x}
        onChange={handlePositionChange("x")}
      />
      <br />
      Y:
      <input
        type="range"
        min="-1"
        max="1"
        step="0.01"
        value={position.y}
        onChange={handlePositionChange("y")}
      />
      <br />
      {/* Escala del logo */}
      Scale:
      <input
        type="range"
        min="3"
        max="6"
        step="0.01"
        value={scale}
        onChange={handleScaleChange}
      />
      <br />
      {/* Botón Reset */}
      <button style={{ marginTop: "15px" }} onClick={resetSettings}>
        Reset
      </button>
    </div>
  );
};

export default Menu;