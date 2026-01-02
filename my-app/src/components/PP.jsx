import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Stars, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

// 1. Custom Class for Locations (Bus Depot, Diner, etc.)
function Location({ position, name, color = "#444" }) {
  return (
    <group position={position}>
      {/* Ruins/Buildings */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.5, 0.5, 1]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}

// 2. Custom Class for the Lava Cracks
function LavaRoad() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
      <torusGeometry args={[12, 0.5, 16, 100]} />
      <MeshWobbleMaterial 
        color="#ff4400" 
        emissive="#ff2200" 
        emissiveIntensity={2} 
        factor={0.2} 
        speed={1} 
      />
    </mesh>
  )
}

export default function TranzitMap() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050505' }}>
      <Canvas shadows camera={{ position: [20, 20, 20], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        {/* Environment */}
        <fog attach="fog" args={['#111', 10, 50]} />
        <Sky sunPosition={[0, -1, 0]} inclination={0} azimuth={0.25} /> {/* Dark Sky */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Lights */}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 5, 0]} color="#ff6600" intensity={2} />

        {/* The "Route B" Road Loop */}
        <LavaRoad />

        {/* Key Locations positioned around the loop */}
        <Location position={[12, 0, 0]} name="Bus Depot" color="#222" />
        <Location position={[8, 0, 8]} name="Diner" color="#333" />
        <Location position={[0, 0, 12]} name="Farm" color="#222" />
        <Location position={[-10, 0, 5]} name="Power Station" color="#111" />
        <Location position={[-5, 0, -10]} name="Town" color="#333" />

        {/* The Ground (Ash/Burnt Earth) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#111" roughness={1} />
        </mesh>

        <OrbitControls />
      </Canvas>
    </div>
  )
}