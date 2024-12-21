'use client';

import React from 'react';
import { Environment, Grid, Line, Sphere } from "@react-three/drei";
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function TournamentScene() {

  const courtRef = React.useRef();
  const holoRef = React.useRef();

  // crear las líneas de la cancha
  const fieldLines = React.useMemo(() => {
    return [
      // perímetro de la cancha
      [[5, 0, 3], [5, 0, -3], [-5, 0, -3], [-5, 0, 3], [5, 0, 3]],
      // línea central
      [[0, 0, 3], [0, 0, -3]],
      // área penal (izquierda)
      [[-5, 0, 1.5], [-4, 0, 1.5], [-4, 0, -1.5], [-5, 0, -1.5], [-5, 0, 1.5]],
      // área penal (derecha)
      [[5, 0, 1.5], [4, 0, 1.5], [4, 0, -1.5], [5, 0, -1.5], [5, 0, 1.5]],
    ]
  }, []);

  // crear puntos para el círculo central
  const centerCircle = React.useMemo(() => {
    const points = [];
    const radius = 2;
    const segments = 32;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push([Math.cos(theta) * radius, 0, Math.sin(theta) * radius])
    }

    return points;
  }, []);

  // animación del holograma
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (holoRef.current) {
      holoRef.current.position.y = Math.sin(time) * 0.1 + 2;
      holoRef.current.rotation.y += 0.01;
    }
  });
  return (
    <>
      <Environment preset="night" />

      {/* base de la cancha */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.001}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* líneas de la cancha */}
      <group ref={courtRef}>
        {fieldLines.map((line, idx) => (
          <Line
            key={idx}
            points={line}
            color="#4a9eff"
            lineWidth={2}
            transparent
            opacity={0.7}
          />
        ))}

        {/* círculo central*/}
        <Line
          points={centerCircle}
          color="#4a9eff"
          lineWidth={2}
          transparent
          opacity={0.7}
        />
        <Grid
          args={[10, 6]}
          position-y={0.01}
          cellSize={0.5}
          cellColor="#4a9eff"
          fadeStrength={1}
          fadeDistance={2}
        />
      </group>

      {/* holograma en el centro*/}
      <group ref={holoRef}>
        <Sphere args={[0.8, 32, 32]}>
          <meshPhysicalMaterial
            color="#4a9eff"
            transparent
            opacity={0.1}
            metalness={1}
            roughness={0}
            transmission={0.9}
          />
        </Sphere>

        {/* anillos del holograma*/}
        {[2.2, 2.4, 2.6].map((radius, idx) => (
          <Line
            key={idx}
            points={centerCircle.map(([x, y, z]) => [x * radius, y, z * radius])}
            color="#4a9eff"
            lineWidth={1}
            transparent
            opacity={0.3}
          />
        ))}

      </group>

      {/* iluminación */}
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />

      {/* luz ambiental adicional para mejor visibilidad */}
      <hemisphereLight
        args={['#4a9eff', '#000000', 0.3]}
      />
    </>
  )
}
