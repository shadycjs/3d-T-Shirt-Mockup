import React from "react";
import { useGLTF } from "@react-three/drei";

const TShirtModel = () => {
  const { scene } = useGLTF('src/assets/models/t_shirt.glb'); // Ruta del modelo

  return <primitive object={scene}
                    position={[0, -4, 0]}
                    scale={3} />;
};

export default TShirtModel;