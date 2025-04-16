import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const RotatingCubo = () => {
  const ref = useRef();

  // Hook de animación: Se ejecuta en cada frame
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01; // Rotar en el eje X
      ref.current.rotation.y += 0.01; // Rotar en el eje Y
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} /> {/* Geometría del cubo */}
      <meshStandardMaterial color="blue" /> {/* Material del cubo */}
    </mesh>
  );
};

export default RotatingCubo;