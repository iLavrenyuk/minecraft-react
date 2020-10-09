import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Sky } from 'drei';
import { Vector3 } from 'three';
import { Physics } from 'use-cannon';
import { Ground } from './Ground';
import { Camera } from './Camera'


function App() {
  return (
    <Canvas>
      // Отрисовка мира от лица персонажа, при помощи Камеры
      <Camera />
      <Sky sunPosition={new Vector3(100, 10, 100)} />
      <ambientLight intensity={0.3} />
      <pointLight
        castShadow
        intensity={0.8}
        position={[100, 100, 100]}
      />
      <Physics gravity={[0, -30, 0]}>
        <Ground />
      </Physics>
    </Canvas>
  )
}

export default App;
