import React, { useEffect } from 'react';
import { useSphere } from 'use-cannon';
import { useFrame, useThree } from 'react-three-fiber';
import { PointerLockControls } from './PointerLockControls';
import { usePlayerControls } from './usePlayerControls';
import { Vector3 } from 'three';
import { useRef } from 'react';

const speed = 6;

export const Player = (props) => {
  {/*Ссылка на камеру текущую*/ }
  const { camera } = useThree();

  const {
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    jump
  } = usePlayerControls();

  {/*Вместо игрока физический элемент СФЕРА*/ }
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 10, 0],
    ...props,
  }));

  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (
      velocity.current = v
    ))
  })

  {/*Сдвиг камеры за физическим объектом при смене координат*/ }
  useFrame(() => {
    camera.position.copy(ref.current.position);
    const direction = new Vector3();

    const frontVector = new Vector3(0, 0,
      Number(moveBackward) - Number(moveForward));
    const sideVector = new Vector3(
      Number(moveLeft) - Number(moveRight), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed)
      .applyEuler(camera.rotation);

      {/*Расчет движения [1]- this Y vector */}
    api.velocity.set(direction.x, velocity.current[1], direction.z);

    {/*Возможность прыжка, проверка на землю */}
    if(jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 12, velocity.current[2])
    }
  })

  return (
    <>
      <PointerLockControls />
      <mesh ref={ref} />
    </>
  )
}