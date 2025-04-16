import React from 'react'
import { useState } from "react";

const PaletaColores = ({color, handleColorChange}) => {

  return (
    <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "white",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
          >
          <label htmlFor="colorPicker">Selecciona un color:</label>
          <input
            id="colorPicker"
            type="color"
            value={color} // Color actual
            onChange={handleColorChange} // Cambiar el estado del color
            />
        </div>
  )
}

export default PaletaColores