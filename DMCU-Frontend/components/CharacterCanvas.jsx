"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { 
  useGLTF, 
  useTexture, 
  Float, 
  Environment, 
  ContactShadows, 
  PresentationControls, 
  Html, 
  Center,
  Bounds
} from "@react-three/drei";
import { Suspense, useRef, useState, useMemo } from "react";
import * as THREE from "three";

function GLBModel({ url }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  return (
    <PresentationControls 
      global={false} 
      cursor={true} 
      snap={true} 
      speed={1} 
      zoom={1.2} 
      rotation={[0, 0, 0]} 
      polar={[-Math.PI / 4, Math.PI / 4]} 
      azimuth={[-Math.PI / 2, Math.PI / 2]}
    >
      <Bounds fit clip observe>
        <Center top>
          <Float floatIntensity={1.5} speed={2} rotationIntensity={0.3}>
            <primitive 
              ref={ref} 
              object={scene} 
              scale={1.6} 
              position={[0, 0, 0]} 
            />
          </Float>
        </Center>
      </Bounds>
    </PresentationControls>
  );
}

function ImagePlane({ url }) {
  const texture = useTexture(url);
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  useFrame((state) => {
    const targetRotationX = hovered ? -0.15 : 0;
    const targetRotationY = hovered ? 0.15 : 0;
    
    if (ref.current) {
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotationX, 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotationY, 0.1);
    }
  });

  return (
    <PresentationControls 
      global={false} 
      cursor={true} 
      snap={true} 
      speed={1.5} 
      zoom={1.05} 
      rotation={[0, 0, 0]} 
      polar={[-0.2, 0.2]} 
      azimuth={[-0.3, 0.3]}
    >
      <Center>
        <Float floatIntensity={1} rotationIntensity={0.2} speed={2}>
          <mesh 
            ref={ref} 
            onPointerOver={() => setHover(true)} 
            onPointerOut={() => setHover(false)}
            castShadow
          >
            <planeGeometry args={[4.5, 3]} />
            <meshStandardMaterial 
              map={texture} 
              transparent
              roughness={0.2}
              metalness={0.4}
              side={THREE.DoubleSide}
              emissive={new THREE.Color("#2266cc")}
              emissiveIntensity={hovered ? 0.3 : 0.05}
            />
          </mesh>
        </Float>
      </Center>
    </PresentationControls>
  );
}

export default function CharacterCanvas({ imageUrl, modelUrl }) {
  return (
    <div className="h-full w-full flex items-center justify-center relative z-0 overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
        className="w-full h-full"
      >
        {/* Cinematic Lighting Setup */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={1} color="#4287f5" />
        <pointLight position={[-3, 2, 3]} intensity={3} color="#ff3366" distance={15} />
        <pointLight position={[3, -2, 2]} intensity={3} color="#33ccff" distance={15} />

        <Suspense fallback={
          <Html center>
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              <div className="text-primary/60 text-[10px] uppercase tracking-[0.5em] animate-pulse whitespace-nowrap">
                Syncing Nexus Model
              </div>
            </div>
          </Html>
        }>
          {modelUrl ? <GLBModel url={modelUrl} /> : imageUrl ? <ImagePlane url={imageUrl} /> : null}
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={15} 
            blur={2.5} 
            far={4.5} 
            color="#000000"
          />
        </Suspense>
      </Canvas>
      {/* Subtle overlay gradient to blend with card */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
    </div>
  );
}
