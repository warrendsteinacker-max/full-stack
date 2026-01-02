import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// The House Component
export function CustomHouse({ position = [0, 0, 0], color = "hotpink" }) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 2.7, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.8, 1.5, 4]} />
        <meshStandardMaterial color="#332211" />
      </mesh>
      <mesh position={[0, 0.6, 1.01]}>
        <planeGeometry args={[0.6, 1.2]} />
        <meshStandardMaterial color="#221100" />
      </mesh>
      <mesh position={[0.6, 1.2, 1.01]}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// The Fullscreen Page Component
export default function FullscreenHouseScene() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      background: '#111' 
    }}>
      <Canvas 
        shadows 
        camera={{ position: [5, 5, 10], fov: 50 }}
        // This ensures the drawing buffer supports the screenshot feature you wanted
        gl={{ preserveDrawingBuffer: true }} 
      >
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
        
        <CustomHouse position={[0, 0, 0]} color="royalblue" />
        
        {/* Adds a floor shadow for realism */}
        <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}