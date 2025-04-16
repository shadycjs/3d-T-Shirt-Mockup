import React from "react";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

const TShirtModel = ({ color, logoTexture }) => {
  const { scene } = useGLTF('src/assets/models/t_shirt.glb'); // Ruta del modelo
  scene.traverse((child) => {
    if (child.isMesh) {
      console.log("Nombre del objeto:", child.name);
      console.log("Posición:", child.position);
      console.log("Escala:", child.scale);
    }
  });

  // Aplica el color base
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(color);
      }
    });
  }, [color, scene]);

  // Genera la textura del logo (si existe)
  const texture = React.useMemo(() => {
    return logoTexture ? new THREE.TextureLoader().load(logoTexture) : null;
  }, [logoTexture]);

  return (
    <>
      {/* Renderiza la camiseta */}
      <primitive object={scene} position={[0, -4, 0]} scale={3} />

      {/* Renderiza el plano del logo, si hay textura */}
      {texture ? (
        <mesh position={[0, 0.8, -0.2]} rotation={[0, 0, 0]}>
          <planeGeometry args={[1, 0.5]} />
          <meshBasicMaterial map={texture} transparent />
        </mesh>
      ) : null}
    </>
  );
};
export default TShirtModel;