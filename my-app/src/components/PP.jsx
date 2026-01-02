import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import { OrbitControls, Sky, Environment, Stars } from '@react-three/drei'

// A Physical Building
function Building({ position, size = [2, 4, 2], color = "#222" }) {
  return (
    <RigidBody type="fixed" position={position}>
      <mesh castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </RigidBody>
  )
}

function GameScene() {
  return (
    <Suspense fallback={null}>
      {/* 1. Low-level Rust Physics Wrapper */}
      <Physics gravity={[0, -9.81, 0]}>
        
        {/* The Player (or Ball) with Physics */}
        <RigidBody colliders="ball" restitution={0.5} position={[0, 5, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="orange" emissive="orange" />
          </mesh>
        </RigidBody>

        {/* Static Environment: Bus Depot Ruins */}
        <Building position={[10, 2, 0]} size={[4, 5, 4]} color="#1a1a1a" />
        <Building position={[-10, 1, 5]} size={[3, 2, 6]} color="#1a1a1a" />

        {/* The Ground (Static Physical Plane) */}
        <RigidBody type="fixed">
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#050505" />
          </mesh>
          {/* Invisible collider to make sure things don't fall through */}
          <CuboidCollider args={[50, 0.1, 50]} position={[0, -0.1, 0]} />
        </RigidBody>

      </Physics>

      {/* Lighting & Atmosphere */}
      <Stars depth={50} count={5000} factor={4} saturation={0} fade />
      <Sky sunPosition={[0, -1, 0]} />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 10, 0]} intensity={2} color="#ff4400" castShadow />
      <Environment preset="night" />
    </Suspense>
  )
}

export default function PP() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Canvas shadows camera={{ position: [15, 15, 15], fov: 45 }}>
        <GameScene />
        <OrbitControls />
      </Canvas>
    </div>
  )
}