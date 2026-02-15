"use client";

import React from "react";
import { Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

export default function NCSText() {
  return (
    <Center   position={[0, 0.5, 0]}
        cacheKey={JSON.stringify({ text: "NCS" })}>
      <Text3D
        font="/fonts/helvetiker_bold.typeface.json"
        size={3} // Slightly smaller to ensure it fits mobile screens
        height={0.5}
        curveSegments={32}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={10}
      >
        NCS
        {/* MATERIAL: Brushed Chrome / Liquid Metal */}
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.15} // Very shiny
          metalness={0.9} // Almost fully metallic
          envMapIntensity={1.5} // Boost reflections
        />
      </Text3D>
    </Center>
  );
}
