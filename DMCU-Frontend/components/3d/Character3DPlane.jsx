"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Character3DPlane({ imageUrl, characterName }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const texture = useTexture(imageUrl);
  const { camera } = useThree();
  const rotationRef = useRef({ x: 0, y: 0, targetY: 0 });
  const floatRef = useRef(0);

  useEffect(() => {
    if (texture) {
      texture.encoding = THREE.sRGBColorSpace;
      texture.colorSpace = "srgb";
    }
  }, [texture]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Floating animation
    floatRef.current += 0.01;
    groupRef.current.position.y = Math.sin(floatRef.current) * 0.3;

    // Smooth rotation toward target
    rotationRef.current.y += (rotationRef.current.targetY - rotationRef.current.y) * 0.1;
    groupRef.current.rotation.y = rotationRef.current.y;
    groupRef.current.rotation.x = rotationRef.current.x * 0.5;

    // Slight tilt based on mouse position (optional premium feel)
    rotationRef.current.x = (state.mouse.y * Math.PI) / 8;
  });

  // Handle mouse move for hover rotation
  const handlePointerMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotationRef.current.targetY = (x - 0.5) * Math.PI * 0.4;
  };

  const handlePointerLeave = () => {
    rotationRef.current.targetY = 0;
    rotationRef.current.x = 0;
  };

  return (
    <group
      ref={groupRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      position={[0, 0, 0]}
    >
      {/* Main textured plane */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[2.4, 3.2]} />
        <meshStandardMaterial
          map={texture}
          emissive={new THREE.Color("#D4AF37")}
          emissiveIntensity={0.15}
          toneMapped={false}
        />
      </mesh>

      {/* Glow plane (slightly in front) */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2.5, 3.3]} />
        <meshStandardMaterial
          emissive={new THREE.Color("#D4AF37")}
          emissiveIntensity={0.08}
          transparent
          opacity={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Edge glow for cinematic effect */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.6, 3.4]} />
        <meshStandardMaterial
          emissive={new THREE.Color("#1E90FF")}
          emissiveIntensity={0.05}
          transparent
          opacity={0.15}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
