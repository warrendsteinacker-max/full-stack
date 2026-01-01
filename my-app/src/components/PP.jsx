import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Plane, Sky } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
  const meshRef = useRef();
  const ballRef = useRef();
  
  // Using a Ref for keys to prevent React re-renders 60 times a second
  const keys = useRef({ ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false });

  useEffect(() => {
    const handleDown = (e) => { if(keys.current.hasOwnProperty(e.key)) keys.current[e.key] = true };
    const handleUp = (e) => { if(keys.current.hasOwnProperty(e.key)) keys.current[e.key] = false };
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => { window.removeEventListener('keydown', handleDown); window.removeEventListener('keyup', handleUp); };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // 1. Movement Logic (Same as before)
    const speed = 0.1;
    if (keys.current.ArrowUp) ballRef.current.position.z -= speed;
    if (keys.current.ArrowDown) ballRef.current.position.z += speed;
    if (keys.current.ArrowLeft) ballRef.current.position.x -= speed;
    if (keys.current.ArrowRight) ballRef.current.position.x += speed;
    ballRef.current.position.y = Math.sin(t * 2) * 0.2 + 0.5;

    // 2. Vertical & Horizontal Wave Logic
    const { geometry } = meshRef.current;
    const pos = geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Radial distance from ball
      const dist = Math.sqrt(Math.pow(x - ballRef.current.position.x, 2) + Math.pow(z - ballRef.current.position.z, 2));

      // Horizontal waves (moving along X)
      const waveX = Math.sin(x * 1.0 + t * 2.0) * 0.1;
      
      // Vertical waves (moving along Z)
      const waveZ = Math.sin(z * 1.0 + t * 2.0) * 0.1;

      // Ball Ripple (Interaction)
      const ripple = Math.sin(dist * 1.5 - t * 5) * 0.4 * Math.exp(-dist * 0.3);

      // Combine all three for the final vertical height (Y)
      pos.setY(i, waveX + waveZ + ripple);
    }
    pos.needsUpdate = true;
  });

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />

      <Sphere ref={ballRef} args={[0.5, 32, 32]}>
        <meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={0.5} />
      </Sphere>

      <Plane ref={meshRef} args={[25, 25, 50, 50]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Wireframe: true creates the "Line Pattern" look */}
        <meshStandardMaterial 
          color="#00ffff" 
          wireframe={true} 
          transparent 
          opacity={0.6} 
        />
      </Plane>
    </>
  )
}

export default function PP() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas shadows camera={{ position: [0, 8, 12], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  )
}