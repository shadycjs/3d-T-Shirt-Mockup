import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TShirtModel from "./components/TShirtModel";

function App() {
  return (
    <Canvas camera={{ position: [0, 1.5, 3.5], fov: 45 }}>
      {/* Configuración de Luces */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Modelo de la remera */}
      <TShirtModel />

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
  );
}

export default App;