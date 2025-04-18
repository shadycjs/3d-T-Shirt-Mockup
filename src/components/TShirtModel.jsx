import React, { useEffect, useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const TShirtModel = ({ color, logoTexture }) => {
  const { scene } = useGLTF('src/assets/models/oversized_t-shirt.glb'); // Modelo
  const [logoPosition, setLogoPosition] = useState(null); // Posición del logo
  const raycasterRef = useRef(new THREE.Raycaster());
  const cameraRef = new THREE.Vector3(0, 1.5, 3.5); // Posición de la cámara
  const texture = React.useMemo(() => {
    return logoTexture ? new THREE.TextureLoader().load(logoTexture) : null;
  }, [logoTexture]);

  useEffect(() => {
    let torsoPosition = new THREE.Vector3();

    // Recorrer mallas del modelo para encontrar el torso
    scene.traverse((child) => {
      if (child.isMesh) {
        console.log("Malla encontrada:", child.name, "Posición local:", child.position);

        if (child.name === "Torso") { // Reemplaza "Torso" con el nombre real
          child.getWorldPosition(torsoPosition); // Obtener posición global del torso
          console.log("Posición global del torso:", torsoPosition);
        }

        child.material.color.set(color); // Cambiar color
        child.visible = true; // Asegúrate de que sea visible
      }
    });

    if (texture) {
      const raycaster = raycasterRef.current;

      // Calcular dirección desde la cámara hacia el torso
      const direction = torsoPosition.clone().sub(cameraRef).normalize();
      console.log("Dirección calculada normalizada:", direction);

      raycaster.set(cameraRef, direction); // Configurar raycaster

      // Visualización de línea roja para depuración
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        cameraRef, // Inicio: posición de la cámara
        cameraRef.clone().add(direction.multiplyScalar(10)), // Extensión hacia la dirección calculada
      ]);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line); // Añadir línea roja a la escena

      // Obtener intersección del raycaster
      const meshes = [];
      scene.traverse((child) => {
        if (child.isMesh) {
          meshes.push(child);
        }
      });
      const intersects = raycaster.intersectObjects(meshes, true);
      console.log("Intersecciones detectadas:", intersects);

      if (intersects.length > 0) {
        const intersectPoint = intersects[0].point; // Posición de impacto
        console.log("Impacto detectado en:", intersectPoint);
        setLogoPosition(intersectPoint); // Actualizar posición del plano
      }
    }
  }, [color, texture, scene]);

  return (
    <>
      {/* Renderiza la camiseta */}
      <primitive object={scene} position={[0, -4.2, -0.5]} scale={3} />

      {/* Renderiza el plano del logo */}
      {logoPosition && texture && (
        <mesh position={logoPosition} rotation={[0, 0, 0]}>
          <planeGeometry args={[1, 0.5]} />
          <meshBasicMaterial map={texture} transparent />
        </mesh>
      )}
    </>
  );
};

export default TShirtModel;