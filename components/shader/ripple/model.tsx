"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useFBO, useTexture, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders";

interface ModelProps {
  images: string[];
}

export function Model({ images }: ModelProps) {
  const { size } = useThree();
  const brushTexture = useTexture("/images/brush.png") as THREE.Texture;
  
  // Load background textures individually for maximum safety and stability
  const texture1 = useTexture(images[0] || "/images/1.jpg") as THREE.Texture;
  const texture2 = useTexture(images[1] || "/images/2.jpg") as THREE.Texture;
  const texture3 = useTexture(images[2] || "/images/3.jpg") as THREE.Texture;
  
  const textures = useMemo(() => [texture1, texture2, texture3], [texture1, texture2, texture3]);
  
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const [meshes, setMeshes] = useState<React.ReactNode[]>([]);
  const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });
  const [currentWave, setCurrentWave] = useState(0);

  const displacementScene = useMemo(() => new THREE.Scene(), []);
  const max = 100;

  const uniforms = useRef({
    uDisplacement: { value: null as THREE.Texture | null },
    uTexture: { value: null as THREE.Texture | null },
    winResolution: { value: new THREE.Vector2(0, 0) },
  });

  const fboBase = useFBO(size.width || 1, size.height || 1);
  const fboTexture = useFBO(size.width || 1, size.height || 1);

  // Memoize the background images scene to prevent recreating it every frame/render
  const { scene: imageScene, camera: imageCamera } = useMemo(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      size.width / -2,
      size.width / 2,
      size.height / 2,
      size.height / -2,
      -1000,
      1000
    );
    camera.position.z = 2;
    scene.add(camera);

    const geometry = new THREE.PlaneGeometry(1, 1);
    const group = new THREE.Group();

    textures.forEach((texture, index) => {
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const imageMesh = new THREE.Mesh(geometry, material);
      
      // Distribute images horizontally:
      // index 0 -> left (-0.25 * width)
      // index 1 -> center (0)
      // index 2 -> right (0.25 * width)
      const xOffset = (index - (textures.length - 1) / 2) * 0.25 * size.width;
      imageMesh.position.set(xOffset, 0, 1);
      
      imageMesh.scale.set(size.width / 5, size.width / 4, 1);
      group.add(imageMesh);
    });

    scene.add(group);
    return { scene, camera };
  }, [size.width, size.height, textures]);

  // Clean up imperatively created geometries and materials to prevent WebGL context/memory leaks
  useEffect(() => {
    return () => {
      if (imageScene) {
        imageScene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) {
              object.geometry.dispose();
            }
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((mat) => mat.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
        imageScene.clear();
      }
      if (displacementScene) {
        displacementScene.clear();
      }
    };
  }, [imageScene, displacementScene]);

  useEffect(() => {
    const generatedMeshes = Array.from({ length: max }).map((_, i) => (
      <mesh
        key={i}
        position={[0, 0, 0]}
        ref={(el) => {
          meshRefs.current[i] = el;
        }}
        rotation={[0, 0, Math.random()]}
        visible={false}
      >
        <planeGeometry args={[60, 60, 1, 1]} />
        <meshBasicMaterial transparent={true} map={brushTexture} />
      </mesh>
    ));
    setMeshes(generatedMeshes);
  }, [brushTexture]);

  function setNewWave(x: number, y: number, index: number) {
    const mesh = meshRefs.current[index];
    if (mesh) {
      mesh.position.x = x;
      mesh.position.y = y;
      mesh.visible = true;
      
      const material = mesh.material as THREE.MeshBasicMaterial;
      if (material) {
        material.opacity = 1;
      }
      
      mesh.scale.x = 1.75;
      mesh.scale.y = 1.75;
    }
  }

  function trackMousePos(x: number, y: number) {
    if (Math.abs(x - prevMouse.x) > 0.1 || Math.abs(y - prevMouse.y) > 0.1) {
      const nextWave = (currentWave + 1) % max;
      setCurrentWave(nextWave);
      setNewWave(x, y, nextWave);
    }
    setPrevMouse({ x, y });
  }

  useFrame(({ gl, scene: finalScene, pointer, camera: frameCamera }) => {
    // Convert normalized pointer [-1, 1] to pixel coordinates relative to the canvas origin
    const x = pointer.x * (size.width / 2);
    const y = pointer.y * (size.height / 2);
    trackMousePos(x, y);

    meshRefs.current.forEach((mesh) => {
      if (mesh && mesh.visible) {
        mesh.rotation.z += 0.025;
        const material = mesh.material as THREE.MeshBasicMaterial;
        if (material) {
          material.opacity *= 0.95;
        }
        mesh.scale.x = 0.98 * mesh.scale.x + 0.155;
        mesh.scale.y = 0.98 * mesh.scale.y + 0.155;
      }
    });

    if (size.width > 0 && size.height > 0) {
      // Render displacement meshes to fboBase
      gl.setRenderTarget(fboBase);
      gl.clear();
      meshRefs.current.forEach((mesh) => {
        if (mesh && mesh.visible) {
          displacementScene.add(mesh);
        }
      });
      gl.render(displacementScene, frameCamera);
      meshRefs.current.forEach((mesh) => {
        if (mesh && mesh.visible) {
          displacementScene.remove(mesh);
        }
      });

      // Update uniforms and render the background images to fboTexture
      uniforms.current.uTexture.value = fboTexture.texture;

      gl.setRenderTarget(fboTexture);
      gl.render(imageScene, imageCamera);
      uniforms.current.uDisplacement.value = fboBase.texture;

      // Render the final displacement effect to screen
      gl.setRenderTarget(null);
      gl.render(finalScene, frameCamera);

      uniforms.current.winResolution.value.set(
        size.width * window.devicePixelRatio,
        size.height * window.devicePixelRatio
      );
    }
  }, 1);

  return (
    <group>
      <OrthographicCamera
        makeDefault
        args={[
          size.width / -2,
          size.width / 2,
          size.height / 2,
          size.height / -2,
          -1000,
          1000,
        ]}
        position={[0, 0, 2]}
      />
      {meshes}
      <mesh>
        <planeGeometry args={[size.width, size.height, 1, 1]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent={true}
          uniforms={uniforms.current}
        />
      </mesh>
    </group>
  );
}
