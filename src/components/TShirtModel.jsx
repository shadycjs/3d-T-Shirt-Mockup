import React from "react";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

const TShirtModel = ({ color }) => {
  const { scene } = useGLTF('src/assets/models/t_shirt.glb'); // Ruta del modelo

  useEffect(() => {
    // Recorre las partes del modelo y actualiza el color del material
    scene.traverse((child) => {
      if (child.isMesh) { // Verifica si es un objeto Mesh
        child.material.color.set(color); // Cambia dinámicamente el color
      }
    });
  }, [color, scene]); // Se actualiza cada vez que cambies el color

  return <primitive object={scene}
                    position={[0, -4, 0]}
                    scale={3} />;
};

export default TShirtModel;