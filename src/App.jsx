import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Dashboard from './components/Dashboard';

// cargar dinámica de TournamentScene sin SSR
// const TournamentScene = React.lazy(() => import('./components/TournamentScene'));

function App() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Canvas
        camera={{
          position: [10, 10, 10],
          fov: 45
        }}
        shadows
      >
        <React.Suspense fallback={null}>
          {/*}<TournamentScene />*/}
          <OrbitControls
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </React.Suspense>
      </Canvas>
      <Dashboard />
    </div>
  );
}

export default App
