'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import NCSScene from '../three/NCSScene';

export default function IdentitySection() {
  return (
    <section 
      className="
        relative w-full h-[40vh] min-h-[400px]
        flex flex-col items-center justify-center 
        bg-black
        z-10 /* Ensures it sits above any accidental overlaps */
        overflow-hidden
        border-t border-white/10
      "
    >
      {/* BACKGROUND: Subtle Grid to remove 'basic' empty feel */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* VIGNETTE: Focuses attention */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)] pointer-events-none" />

      {/* 3D SCENE */}
      <div className="relative z-20 w-full h-full">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 8], fov: 35 }}
        >
          <Suspense fallback={null}>
            <NCSScene />
          </Suspense>
        </Canvas>
      </div>
      
      {/* LABEL */}
      <div className="absolute bottom-6 left-0 right-0 text-center z-30 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
          Interactive Identity
        </span>
      </div>
    </section>
  );
}