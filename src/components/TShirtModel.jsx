import React, { useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const TShirtModel = ({ color, logoTexture, position, scale }) => {
  const { scene } = useGLTF("src/assets/models/public/oversized_t-shirt.glb"); // Cargar modelo (asegúrate de tener el archivo GLB)
  const logo = logoTexture ? new THREE.TextureLoader().load(logoTexture) : null; // Cargar el logo

  useEffect(() => {
    if (!scene) return;
  
    scene.traverse((child) => {
      if (child.isMesh) {
        // Crear el material dinámico
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color), // Usar el color base
          map: logoTexture || null, // Usar el logo si existe
          transparent: !!logoTexture, // Solo si el logo es válido
          side: THREE.DoubleSide,
        });

        // Si hay logo cargado y válido, configura el UV mapping
        if (logoTexture) {
          logoTexture.minFilter = THREE.LinearFilter; // Suavizar la textura
          logoTexture.magFilter = THREE.LinearFilter;
          logoTexture.wrapS = THREE.ClampToEdgeWrapping;
          logoTexture.wrapT = THREE.ClampToEdgeWrapping;
          logoTexture.needsUpdate = true;
          logoTexture.wrapS = THREE.ClampToEdgeWrapping; // Limitar bordes horizontales
          logoTexture.wrapT = THREE.ClampToEdgeWrapping; // Limitar bordes verticales
          
          logoTexture.repeat.set(scale, scale); // Escala del logo
          logoTexture.offset.set(position.x || 0, position.y || 0); // Posición del logo
          logoTexture.needsUpdate = true;
        }
  
        child.material = material;
        child.material.needsUpdate = true; // Fuerza actualización del material
      }
    });
  }, [scene, color, logoTexture, position, scale]);

  return <primitive object={scene} position={[0, -6.5, -0.5]} scale={5} />;
};

export default TShirtModel;