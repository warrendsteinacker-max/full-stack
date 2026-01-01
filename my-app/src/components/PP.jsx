import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Plane, SoftShadows, Sky } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
  const meshRef = useRef();
  const ballRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // useFrame runs 60 times per second (The Animation Loop)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // 1. Move the Ball based on mouse
    if (ballRef.current) {
      ballRef.current.position.x = mousePos.x * 10;
      ballRef.current.position.z = mousePos.y * 10;
      // Make ball hover slightly
      ballRef.current.position.y = Math.sin(t * 2) * 0.2 + 0.5;
    }

    // 2. Animate the Waves (Vertex Displacement)
    const { geometry } = meshRef.current;
    const position = geometry.attributes.position;
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const z = position.getZ(i);
      
      // Distance from ball to current vertex
      const dist = Math.sqrt(
        Math.pow(x - ballRef.current.position.x, 2) + 
        Math.pow(z - ballRef.current.position.z, 2)
      );

      // Create a ripple effect centered on the ball
      const wave = Math.sin(dist * 1.5 - t * 5) * 0.2 * Math.exp(-dist * 0.3);
      position.setY(i, wave);
    }
    position.needsUpdate = true;
  });

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} castShadow />

      {/* The Ball */}
      <Sphere ref={ballRef} args={[0.5, 32, 32]} castShadow>
        <meshStandardMaterial color="orange" roughness={0} metalness={0.8} />
      </Sphere>

      {/* The Landscape (Water Plane) */}
      <Plane 
        ref={meshRef} 
        args={[20, 20, 64, 64]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
      >
        <meshStandardMaterial color="#0077be" wireframe={false} flatShading />
      </Plane>
    </>
  )
}

export default function PP() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}
         onMouseMove={(e) => {
           // Normalize mouse coordinates to -1 to +1
           const x = (e.clientX / window.innerWidth) * 2 - 1;
           const y = -(e.clientY / window.innerHeight) * 2 + 1;
           // We would pass this to the scene via a ref or state
         }}>
      <Canvas shadows camera={{ position: [0, 10, 15], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  )
}