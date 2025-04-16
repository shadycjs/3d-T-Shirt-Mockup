import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TShirtModel from "./components/TShirtModel";
import { useState } from "react";
import PaletaColores from "./components/PaletaColores";

function App() {

  const [color, setColor] = useState("#ffffff"); // Color inicial: blanco
  const [logoTexture, setLogoTexture] = useState(null); // Logotipo cargado por el usuario

  const handleColorChange = (event) => {
    setColor(event.target.value); // Actualiza el estado del color
  };

  // Manejar la carga de logotipo
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const textureURL = URL.createObjectURL(file); // Convierte la imagen a URL
      setLogoTexture(textureURL); // Almacenar la URL de la textura
    }
  };

  return (
    <>
    <Canvas camera={{ position: [0, 1.5, 3.5], fov: 45 }}>
      {/* Configuración de Luces */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Modelo de la remera */}
      <TShirtModel color={color} logoTexture={logoTexture}/>

      {/* Controles interactivos */}
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.1}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 3}
        maxDistance={4}
        minDistance={3}
        target={[0, -0.3 , -0.5]}
        />
    </Canvas>

        <div style={{ position: "absolute",
                      top: 10,
                      left: 250,
                      background: "white",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "5px"}}>
                  <label htmlFor="fileUpload">Cargar Logo:</label>
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
        </div>
        
    <PaletaColores color={color}
                   handleColorChange={handleColorChange} />
                   
        </>
  );
}

export default App;