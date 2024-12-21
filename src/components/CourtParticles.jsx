import { useFrame } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';

export function CourtParticles({ color = '#4a9eff', count = 2000 }){

  const mesh = React.useRef();

  // crear partículas a lo largo del perímetro de la pista
  const [positions, velocities] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // determinar la posición en el perímetro
      const t = Math.random();
      let x, z;

      if (t < 0.24) {
        x = -5 + Math.random() * 10;
        z = -3;
      }else if (t < 0.5) {
        x = 5;
        z = -3 + Math.random() * 6;
      } else if (t < 0.75) {
        x = -5 + Math.random() * 10;
        z = 3;
      } else {
        x = -5;
        z = -3 + Math.random() * 6
      }

      // establecer posición inicial
      pos[i3] = x;
      pos[i3 + 1] = 0;
      pos[i3 + 2] = z

      // establecer velocidad
      vel[i3] = (Math.random() - 0.5) * 0.05;
      vel[i3 + 1] = 0.1 + Math.random() * 0.07;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.05;
    }

    return [pos, vel]
  },[count]);

  useFrame((state) => {
    const positions = mesh.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // actualizar posiciones
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // restablecer las partículas que van demasiado alto o demasiado lejos del perímetro
      if (positions[i3 + 1] > 15) {
        // restablecer el nivel de corte en una posición perimetral aleatoria
        const t = Math.random()
        if (t < 0.25) {
          positions[i3] = -5 + Math.random() * 10;
          positions[i3 + 2] = -3;
        } else if (t < 0.5) {
          positions[i3] = 5;
          positions[i3 + 2] = -3 + Math.random() * 6;
        } else if (t < 0.75) {
          positions[i3] = -5 + Math.random() * 10;
          positions[i3 + 2] = 3;
        } else {
          positions[i3] = -5;
          positions[i3 + 2] = -3 + Math.random() * 6;
        }
        positions[i3 + 1] = 0;
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;

  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.additiveBlending}
        depthWrite={false}
      >
        <color attach="color" args={[color]} />
      </pointsMaterial>
    </points>
  );

}
