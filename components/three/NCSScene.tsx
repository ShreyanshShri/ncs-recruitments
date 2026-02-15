'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import NCSText from './NCSText';

export default function NCSScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Smoother, heavier tilt for a premium feel
    const targetX = -state.pointer.y * 0.3; 
    const targetY = state.pointer.x * 0.4;
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
  });

  return (
    <>
      {/* LIGHTING: "Neon Noir" Setup */}
      <ambientLight intensity={0.5} color="#000" /> {/* Dark base */}
      
      {/* Main Key Light (Cool White) */}
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="white" castShadow />
      
      {/* Rim Light Left (Teal) */}
      <pointLight position={[-10, 0, -5]} intensity={5} color="#2dd4bf" distance={20} />
      
      {/* Rim Light Right (Pink/Purple) */}
      <pointLight position={[10, -5, -5]} intensity={5} color="#c084fc" distance={20} />

      {/* REFLECTIONS: City preset gives the best metallic contrast */}
      <Environment preset="city" />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef}>
          <NCSText />
        </group>
      </Float>
      
      {/* SHADOWS: Grounds the text so it doesn't look like it's floating in void */}
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
    </>
  );
}