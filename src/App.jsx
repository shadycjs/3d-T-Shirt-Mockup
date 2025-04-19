import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TShirtModel from "./components/TShirtModel";
import ColorPicker from "./components/ColorPicker";
import LogoUploader from "./components/LogoUploader";
import Menu from "./components/Menu";

export default function App() {
  const [color, setColor] = useState("#ffffff"); // Color de la camiseta
  const [logoTexture, setLogoTexture] = useState(null); // Imagen del usuario

  // Estado para la posición y escala del logo
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Posición UV
  const [scale, setScale] = useState(1.0); // Escala UV

  // Función para restaurar los valores predeterminados
  const resetSettings = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1.0);
  };

  return (
    <>
      {/* Controles de usuario */}
      <div style={{ position: "absolute",
           top: 10,
           left: 10,
           background: "white",
           padding: "10px",
           borderRadius: "5px",
           boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
           pointerEvents: "auto", 
           zIndex: "10"// Habilitar interacción en el formulario
        }}>
        <ColorPicker color={color} setColor={setColor} />
        <LogoUploader setLogoTexture={setLogoTexture} />
      </div>

      {/* Menú interactivo */}
      <Menu
              position={position}
              setPosition={setPosition}
              scale={scale}
              setScale={setScale}
              resetSettings={resetSettings}
      />

      {/* Canvas 3D */}
      <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }}
      //</>style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <TShirtModel color={color} 
                     logoTexture={logoTexture}
                     position={position}
                     scale={scale} />
        <OrbitControls 
          enableDamping={true}
          dampingFactor={0.1}
          minDistance={3}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </>
  );
}